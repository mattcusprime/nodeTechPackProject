#! /usr/bin/env python
# encoding: utf-8
# WARNING! Do not edit! http://waf.googlecode.com/git/docs/wafbook/single.html#_obtaining_the_waf_file

import sys
if sys.hexversion < 0x020400f0: from sets import Set as set
import re
import os
import shutil
STRINGLIKE=set([str])
UNICODELIKE=set()
BYTESLIKE=set()
try:
	STRINGLIKE.add(bytes)
	BYTESLIKE.add(bytes)
except NameError:
	pass
try:
	UNICODELIKE.add(unicode)
	STRINGLIKE.add(unicode)
	BYTESLIKE.add(str)
except NameError:
	BYTESLIKE.add(bytes)
	UNICODELIKE.add(str)
DEFAULTSYSTEMENCODING='utf8'
DEFAULTTEXTENCODING='utf8'
OSSEPARATORS=set(['\\','/',os.sep])
import waflib.Context
import waflib.Configure
import waflib.Scripting
def _grow_Node(self):
	if not self._WakNode:
		self._WakNode=NodeHost(self)
	return self._WakNode
def patch_context():
	waflib.Context.Context._WakNode=None
	waflib.Context.Context.Node=property(_grow_Node)
def patch_configure():
	waflib.Configure.autoconfig=True
def patch_scripting():
	waflib.Scripting.default_cmd='default'
def patch_all():
	patch_context()
	patch_configure()
	patch_scripting()
class LoopDetector(object):
	def __init__(self,max_uses):
		self.usedvalues={}
		self.max_uses=max_uses
	def used(self,value):
		try:
			used_times=self.usedvalues[value]
			if used_times>=self.max_uses:
				raise Exception("Detected an infinite loop in value lookups")
			self.usedvalues[value]=used_times+1
		except KeyError:
			self.usedvalues[value]=1
def expandvars(path,env):
	'''
    Translates Ant-style macro Node.path strings like "${TOP}/mydir" into 
    "/folder/mydir" using vars from ENV dictionary.
    If value for a key is not found, "" (empty string) is placed there instead.
    
    This is a lot like os.path.expandvars() but allows custom ENV and nested macros.
    
    @param path: string with path

    @param env: dictionary with expansion key-value pairs.

    @return: cleaned up path value        
    '''
	if path.find('${')==-1:
		return path
	else:
		VAR_PATTERN=re.compile('\$\{.+?\}')
		loop_detector=LoopDetector(3)
		def _spinning_closure(text,env):
			results=[]
			last=0
			for i in VAR_PATTERN.finditer(text):
				matched_text=i.group()[2:-1]
				loop_detector.used(matched_text)
				results.append(text[last:i.start()])
				if matched_text in env:
					value=env[matched_text]
				else:
					raise KeyError("Environment variable named '%s' is not found in the provided environment."%matched_text)
				results.append(_spinning_closure(value,env))
				last=i.end()
			results.append(text[last:])
			return''.join(results)
		return _spinning_closure(path,env)
def normalize(path):
	'''Does loosely the same thing os.path.normpath() would on Node.path, 
    but adds the following:
    - if we started with a Node.isdir == True, we add os.sep to the end of the path
      (os.path.normpath() strips the trailing slashes)

    Normalize is aware of ENV expansion macros. If these are present in the
    path, they will be preserved and backrefs will be applied only on non-macro
    path elements. This safe handling guards agains following issue:

        './folder/${macro}/../file'  ( where env['macro'] = 'subfolderone/subfoldertwo')
        will be incorrectly normalized to './folder/file' by os.path.normalize, while
        the proper meaning of the path should be './folder/subfolderone/file'
    
    The paths are normalized until the first macro which is threatened to be
    eliminated by a backref. Consecutive (if counting from the end) backrefs
    are not folded:
        ${top}/folderA/../${macro}/folderB/./folderC/../../../folder/file
        # becomes:
        ${top}/folderA/../${macro}/../folder/file

    @return: A new instance of Node object with normalized Node.path value.
    '''
	_isdir=path[-1:]in OSSEPARATORS
	_directorize=lambda __p,__wasdir:__wasdir and __p[-1:]not in OSSEPARATORS and(__p+os.sep)or __p
	if path.find('..')==-1 or path.find('${')==-1:
		return _directorize(os.path.normpath(path),_isdir)
	else:
		chopper=ReversePathChopper(path)
		chopper.chopperfn=lambda __p,__e:os.path.split(__p)
		skip_count=0
		skip_these=set(['','.'])
		path_chunks=[]
		for name in chopper:
			if name in skip_these:
				pass
			elif name=='..':
				skip_count+=1
			elif skip_count>0:
				if name.find("${")==-1:
					skip_count-=1
				else:
					path_chunks.append(os.sep.join(['..']*skip_count))
					path_chunks.append(name)
					skip_count=0
			else:
				path_chunks.append(name)
		del chopper
		last_chunk=path_chunks[-1]
		stripped_last_chunk=last_chunk.rstrip('/\\'+os.sep)
		diff=len(last_chunk)-len(stripped_last_chunk)
		if diff:
			path_chunks[-1]=stripped_last_chunk+os.sep*(diff-int(bool(len(path_chunks)-1)))
		return _directorize(os.sep.join(reversed(path_chunks)),_isdir)
def splitexpanded(path,env):
	'''Derives names of parent folder and child in context of ${name} like
    macros in the path.
    
    This is a lot like os.path.split() but expands the Env var macros selectively
    and minimally enough to derive the true node's name.
    '''
	parent,name=os.path.split(path)
	if name.find("${")>-1:
		parent,name=os.path.split(os.path.join(parent,normalize(expandvars(name,env))))
	return parent,name
class ReversePathChopper(object):
	'''Allows one to query for chunk by chunk of path from the back of the path 
    in the way that, on-demand, expands env var macros (${asdf}).
    '''
	def __init__(self,path,env={}):
		self.path=path
		self.env=env
		self.served_chunks=[]
		self.chopperfn=splitexpanded
	def __iter__(self):
		return self
	def __next__(self):
		if not self.path:
			raise StopIteration()
		else:
			parent,name=self.chopperfn(self.path,self.env)
			if not name and parent==self.path:
				self.path=''
				name=parent
			else:
				self.path=parent
			self.served_chunks.append(name)
			return name
	def next(self):
		return self.__next__()
def chopoffcwd(path):
	if os.path.isabs(path):
		cwd=os.getcwd()
		if not cwd.endswith(os.sep):
			cwd=cwd+os.sep
		if path.startswith(cwd):
			path=path[len(cwd):]
	return path
def _replacement_relpath(path,start=os.curdir):
	sfolders=start
	pfolders=path
	if os.name in['nt','cli']:
		sprefix,sfolders=os.path.splitunc(sfolders)
		pprefix,pfolders=os.path.splitunc(pfolders)
		if not sprefix and not pprefix:
			sprefix,sfolders=os.path.splitdrive(sfolders)
			pprefix,pfolders=os.path.splitdrive(pfolders)
		if sprefix!=pprefix:
			raise ValueError("Beginnings of paths %s and %s do not allow for relative path between them."%(pprefix,sprefix))
	slist=[x for x in sfolders.split(os.sep)if x]
	plist=[x for x in pfolders.split(os.sep)if x]
	i=len(os.path.commonprefix([slist,plist]))
	rel_list=[os.pardir]*(len(slist)-i)+plist[i:]
	if not rel_list:
		return os.curdir
	return os.path.join(*rel_list)
_relpath=getattr(os.path,"relpath",_replacement_relpath)
class NodeHost(object):
	'''Namespace-like class that is attached to Context class instance on-demand
    and provides way to generate and manage Wak-style Nodes.
    '''
	def __init__(self,context):
		self.context=context
	def __call__(self,pathlike,contextpath="${"+waflib.Context.TOP+"}",env={}):
		'''This is a shortcut for creating new instances of Node class.
        
        Normally a new Node class instance needs to know the contextpath and
        ENV dictionary, but this .derive() method just clones the values from self
        if new values for contextpath and env are not passed in.

        This method allows passthrough of Node instances as pathlike value.
        In that case, contextpath and env values are ignored.
        '''
		if type(pathlike)in STRINGLIKE:
			return Node(pathlike,contextpath,env or self.context.env)
		else:
			return pathlike
class Node(object):
	'''Namespace-like class that is exposed as Context.Node method
    
    It allows for a catalog of actions one can do in connection with a
    path.
    
    Nodes are virtual objects. Underlying files are not created when 
    Node is declared. They are created either explicitly, using
    persist() method, or when someone writes / copies or moves to
    the path behind the Node.
    
    Relative and absolute paths are supported. When Node is initiated with
    a relative path, it's evaluated only explicitly (absolutepath()) or at the time
    of use of the path. Relative paths are always against the current dir. 
    
    Part of Wakparts API.
    '''
	def __init__(self,path,contextpath=None,env=None):
		'''
        @param path: string-like that somehow describes the path.
        
        The path may be relative or absolute and may include evnironment
        var expansion macros like "${MYPATH}/someitem"
        
        @param context: Pointer to a Context class instance that holds the
        environment variables against which paths are to be evaluated.
        
        No context object just means that macros will not be expanded.
        
        Part of Wakparts API.
        '''
		self.env=env
		self.path=path
		self.contextpath=contextpath
	def _get_path(self):
		return self._path
	def _set_path(self,path):
		pathtype=type(path)
		if pathtype not in STRINGLIKE:
			raise Exception("path argument value is of incompatible type %s. It must be string-like or an instance of Node class."%type(path))
		elif path=='':
			_p=path
		else:
			if os.name=='nt'and pathtype not in UNICODELIKE:
				_p=normalize(path.decode(DEFAULTSYSTEMENCODING))
			else:
				_p=normalize(path)
		_pe=_p[-3:].replace('/',os.sep)
		if _pe=='.'or _pe=='..'or _pe==os.sep+'..'or _pe.endswith(os.sep+'.'):
			self._path=_p+os.sep
		else:
			self._path=_p
	def _del_path(self):
		del self._path
	path=property(_get_path,_set_path,_del_path,'''(Getter and Setter)
    Node.path is the property storing the string of path with which the Node
    was instantiated.
    
    This string can be ralative and absolute, be expressed in many formats and
    conventions, may contain Apache Ant-style variable expansion macros and
    refer to nonexistent paths. You can freely mix and match folder separators
    from any platform within same path string and pad the path with loops of
    redundant relative references.
    
    You can use Windows-style and Unix style path separators intermingled, 
    without regard to which OS the script will be ran against.
    
    All "path"s are taken and simplified before storage. If the path contains
    signs of relative loops ("../") AND Env expansion macros ("${}") the macros
    will be expanded before the path will be normalized. The path may be further
    simplified upon use (Node.fullpath, Node.absolutepath etc), where appropriate.
    
    BIG IMORTANT NOTE:
    There is one rule for values of path:
    If it ends with a path separator ("/", "\\" or os.sep), it's a path referring
    to a "folder." Otherwise, it's a path referring to a "file".
    We completely ignore what the file system says about the path.
    If it's actually a folder, but value of path does not end with a path separator,
    we treat is as a file. All operations on the Node instance for incorrectly-typed
    path will eventually yield Exception's and OS Errors or to behavior you
    don't expect. Please, make it a rule, if you intend to say "folder" put a 
    slash of some sort ('/' or '\\') at the end of the path value. 

    Examples of acceptable path values (you can use \\ anywhere you see /) :
    
    'asd*%:;woip' # nonesense. Will be accepted but draw Exceptions on use.
    
    '' # empty string. Will resolve to something like "." where appropriate.
    
    'asdf' # file, relative to directory in of Node.context.
    
    '/asdf' # file, absolute path. 
    
    '../folder/../folder/../folder/asdf' # file, relative path with some redundancy.
    
    'asdf/' # folder, relative to directory in of Node.context.
    
    '/asdf/' # folder, absolute path.
    
    '../asdf/' # folder, relative to directory in of Node.context.
    
    "./${MYVAR}/extrafolder/file" # Apache Ant-style ENV value substitution macro.
    
    Part of Wakparts API.
    ''')
	def _get_contextpath(self):
		return self._contextpath
	def _set_contextpath(self,path):
		pathtype=type(path)
		if pathtype in STRINGLIKE:
			sep=set(['/','\\',os.sep])
			if os.name=='nt'and pathtype not in UNICODELIKE:
				self._contextpath=normalize(path.decode(DEFAULTSYSTEMENCODING)+(path[-1:]not in sep and os.sep or''))
			else:
				self._contextpath=normalize(path+(path[-1:]not in sep and os.sep or''))
		else:
			raise Exception("contextpath argument value is of incompatible type %s. It must be string-like."%type(path))
	def _del_contextpath(self):
		del self._contextpath
	contextpath=property(_get_contextpath,_set_contextpath,_del_contextpath,'''(Getter and Setter)
    Node.contextpath is a supporting property holding the string-like value containing
    the path against which the value in Node.path is to be evaluated, when it's relative.
    Node.contextpath can also be relative path, in which case, it, in-turn is evaluated
    against the Current Working Directory (os.getcwd()).
    
    The contextpath is ALWAYS assumed to be a reference to a folder. While you have to be
    very specific setting Node.path (where "path/" = folder and "path" = file) with contextpath
    you can set it to either "path/" or "path\\" or "path" and it will always convert it to
    path + os.sep ('/' on unix-like, '\\' on windows) In other words, the code behind Node.contextpath
    always transforms the value passed to it into "folder" path appropriate to the OS on which we run
    and ensures that there is always an appropriate directory separator to the end of the string. 
    
    Node.contextpath is set automatically when the node is created as part of the Wak's context workflow.
    By default, it's '${top}/' which is evaluated at the time the path is consumed (by Node.absolutepath, 
    Node.fullpath) against the context.env that holds OS ENV variables and our custom-defined wars.
    
    Part of Wakparts API.
    ''')
	def _get_fullpath(self):
		_pt=os.path.expanduser(expandvars(self.path,self.env))
		if os.path.isabs(_pt)or self.contextpath in['./','.\\']:
			return self.path
		else:
			return normalize(os.path.join(self.contextpath,self.path))
	def _set_fullpath(self,val):
		raise ValueError("Node.fullpath is read-only property. Use Node.path and Node.context to define components of the Node.fullpath.")
	fullpath=property(_get_fullpath,_set_fullpath,lambda self:None,'''(Read-only) This is the middle point between Node.path and Node.absolutepath.
        fullpath is basically os.path.join(Node.contextpath, Node.path), but with
        same limited ENV macro eval and path normalization. 
        
        Node.path may be relative to Node.contextpath (which may be relative as well).
        Node.absolutepath unfolds all relative paths all the way to the end, starting with
        Node.path, applying it on top of Node.contextpath, and, if it's still relative,
        applying that on top of current working dir.
        
        Like Node.absolutepath, Node.fullpath joins and simplifies contextpath + path, but
        it does not go further. If the combined path is still relative we return it as
        is. For a Node instance where Node.contextpath is equivalent of '.',
        Node.path ~= Node.fullpath
        
        Env vars are expanded very conservatively. The goal is to preserve all env vars 
        unless preserving one may introduce path join errors. 
        What this means in practice is that Node.path value's Env vars are ALWAYS expanded
        because in a os.path.join(context, path) if path is absolute, it comptetely
        overrides contextpath value. The contextpath value is not expanded for Env vars.
        Use Node.absolutepath instead if you want paths with all Env vars expanded:
            expanded = Node(oldnode.fullpath, '.', oldnode.env).fullpath
        
        After the paths are joined, in most cases, it's "normalized" (simplified):
            "folder/../file" becomes "file"
        In cases where normalization may produce erroneous results, it is not done:
            "${top}/../file" if normalized would become "file" which is wrong if
            top = 'c:\\folder\\subfolder, where normalized path should be
            "c:\\folder\\file" instead

        @return: A new Node object with Node.path = oldnode.contextpath + oldnode.path
        
        Part of Wakparts API.
        ''')
	def _get_expandedpath(self):
		return normalize(expandvars(self.fullpath,self.env))
	def _set_expandedpath(self,val):
		raise ValueError("Node.fullpath is read-only property. Use Node.path and Node.context to define components of the Node.fullpath.")
	expandedpath=property(_get_expandedpath,_set_expandedpath,lambda self:None,'''(Read-only) This is the middle point between Node.fullpath and Node.absolutepath.
        expandedpath is basically fullpath with all the macros expanded, and path normalized. 
        
        @return: A string with expanded full path of the node.
        ''')
	name=property(lambda self:os.path.basename(self.absolutepath.rstrip(os.sep)),lambda self:None,lambda self:None,'''Node.name property (read only) gives you the name of the file or folder
        to which the Node instance is pointing. 
        
        When Node instance is pointing to a root of file system ("/", "c:\") the 
        Node.name value is ""
        This makes it easy to check if you are a the start of the file system tree.
        Node.name will be truthy for all path except the root.
        ''')
	def __str__(self):
		return self.fullpath
	def __unicode__(self):
		return self.fullpath
	def __abs__(self):
		'''Evaluates, simplifies the Node.path value and returns absolute path.
        
        This is similar to os.path.abspath(), but, with extra twists. 
        - all macros are evaluated and substituted. 
        - all relative paths are evaluated in the following way:
            - if Node.path is absolute already return (normalized) Node.path
            - else If Node.contextpath is absolute return os.path.join(context, path)
            - else return os.path.join(os.getcwd(), context, path)

        Normally contextpath is absolute and points to the TOP of the project folder
        by default. This whole thing comes in place when you start customizing context.
        
        Becasue absolutepath is evaluated every time you ask for it, it is useful for
        reusing the same exact Node paths by manipulating the contextpath value, or keeping
        it same, relative and manipulate the Current Working Dir value by chdir()
        
        @return: A string with the absolute file system path to the node.
        
        Example usage:
            abs(node_instance)
            
        Part of Wakparts API.
        '''
		if self.fullpath in('',os.sep):
			return os.path.abspath(os.sep)
		else:
			return normalize(os.path.join(os.getcwd(),expandvars(os.path.expanduser(self.contextpath),self.env),expandvars(os.path.expanduser(self.path),self.env)))
	absolutepath=property(__abs__)
	'''Evaluates, simplifies the Node.path value and returns absolute path.
    
    This is similar to os.path.abspath(), but, with extra twists. 
    - all macros are evaluated and substituted. 
    - all relative paths are evaluated in the following way:
        - if Node.path is absolute already return (normalized) Node.path
        - else If Node.contextpath is absolute return os.path.join(context, path)
        - else return os.path.join(os.getcwd(), context, path)

    Normally contextpath is absolute and points to the TOP of the project folder
    by default. This whole thing comes in place when you start customizing context.
    
    Becasue absolutepath is evaluated every time you ask for it, it is useful for
    reusing the same exact paths by manipulating the contextpath value, or keeping
    it same, relative and manipulate the Current Working Dir value by chdir()
    
    @return: A string with the absolute file system path to the node.
    
    Example usage:
        node_instance.absolutepath
        
    Part of Wakparts API.
    '''
	exists=property(lambda self:os.path.exists(self.absolutepath))
	'''Allows you to check for existence of a file system object corresponding
    to this node.
    
    This Node object property is a wrapper on top of bool(Node_instance) and 
    is here only for those who only understand properties of an object and
    simply refuse to understanding how bool(node_instance) can be False. 
    For others, instead, recommend checking for Truthiness on Node 
    instance itself.
    
    @return: value of os.path.exists( Node.absolutepath )
    
    Example usage:
        if node_instance.exists:
          print("We actually exist on file system")
    this is same as:
        if node_instance:
          print("We actually exist on file system")
    
    Part of Wakparts API.
    '''
	@property
	def parent(self):
		'''Provides a Node object pointing to the parent folder for the given Node.
        
        Env vars in the path are preserved whenever possible.
        
        This is a loose equivalent to chopping the last element from Node.fullpath,
        but with some intelligent additional Env var expansions (when needed) and 
        handling of root of file system paths.
        
        Note, a parent of a Node pointing to a root path is same node. You can do this:
            while newnode == oldnode:
                newnode = oldnode.parent
        Or test for filesystem root like so:
            Node.isfilesystemroot
        which does bool(self == self.parent) behind the scenes.
        '''
		if self.isfilesystemroot:
			return self
		p=self.path
		if self.isdir:
			p=os.path.dirname(p)
		parent,name=splitexpanded(p,self.env)
		if not parent:
			parent='.'+os.sep
		elif not parent.endswith(os.sep):
			parent+=os.sep
		if name=='.':
			parent+='..'+os.sep
		elif name=='..':
			parent+=('..'+os.sep)*2
		return self.derive(parent)
	isfilesystemroot=property(lambda self:self.name=='',lambda self,val:None,lambda self:None,r'''A (read-only) property returning True if the Node.absolutepath is referring to the root of
        the file system like '/', "c:\", "\\server\UNCShare"''')
	isdir=property(lambda self:self.path==''or self.path[-1:]in['\\','/',os.sep])
	'''Tells you if, based on the label string, the Node refers to a
    folder.
    
    Folders are only those Node instances instantiated with a path string 
    ending with any of the common path separators like "/", "\\" (Windows OS
    path separator that needs to be escaped with another backslash in Python files
    because single backslash is a special character) or os.sep value appropriate
    for the platform.
    
    Examples:
    >>> Node("../asdf/").isdir
    True
    >>> Node("..\\asdf\\").isdir
    True
    >>> Node("../asdf").isdir
    False
    >>> Node("..\\asdf").isdir
    False

    Note, this property rides on a getter which looks only on the string you
    declared as the path at the instantiation of the Node. We do NOT look
    at the file system at all and do not care if the file / folder exist.
    
    Part of Wakparts API.
    '''
	isfolder=isdir
	isfile=property(lambda _o:not _o.isdir)
	'''Tells you if, based on the path string, the Node refers to a
    file (as opposed to a folder).
    
    Folders are only those Node instances instantiated with a path string 
    ending with any of the common path separators like "/", "\\" (Windows OS
    path separator that needs to be escaped with another backslash in Python files
    because single backslash is a special character) or os.sep value appropriate
    for the platform.
    
    All other paths are "files"
    
    Examples:
    >>> Node("../asdf/").isfile
    False
    >>> Node("..\\asdf\\").isfile
    False
    >>> Node("../asdf").isfile
    True
    >>> Node("..\\asdf").isfile
    True

    Note, this property rides on a getter which looks only on the string you
    declared as the path at the instantiation of the Node. We do NOT look
    at the file system at all and do not care if the file / folder exist.
    
    Part of Wakparts API.
    '''
	def derive(self,pathlike,contextpath=None,env=None):
		'''This is a shortcut for creating new instances of Node class.
        
        Normally a new Node class instance needs to know the contextpath and
        ENV dictionary, but this .derive() method just clones the values from self
        if new values for contextpath and env are not passed in.

        This method allows passthrough of Node instances as pathlike value.
        In that case, contextpath and env values are ignored.
        '''
		if contextpath==None:
			contextpath=self.contextpath
		if env==None:
			env=self.env
		if type(pathlike)in STRINGLIKE:
			return Node(pathlike,contextpath,env)
		else:
			return pathlike
	def __add__(self,obj):
		'''This method allows "concatenation" of Strings (or Nodes) to a given
        Node by using the "+" operator. 
        
        Primary mode of operation is concatenation of a given string to Node.path
        value. This is done differently depending on whether starting node is
        a reference to a folder or to a file.
        
        The combined path is normalized (os.path.normpath()) and second path is
        ran through expandvars() where all ENV marco references are expanded.
        This is important for os.path.join() as it behaves differently depending
        on whether the added path is relative or absolute. 

        If starting Node is a folder, the given string is, joined with
        the Node.path using os.path.join() which adds folder separator, when needed
        between the two joined strings. This is usefull for creating file Nodes
        based on top of a given folder Node.
        
        If starting Node is a file, the given string is, literally, concatenated
        to the Node.path. This is usefull for adding suffixes to file names.
        
        When added obj is a Node, the outcome is very similar to above, with one
        specific note: Only the Node.path value from the added Node is used. The 
        contextpath value is completely ignored and is not used:
            NodeA + NodeB == NodeA + NodeB.path
        If you want the addition to include the context of added Node, say so
        explicitely:
            NodeC = NodeA + NodeB.fullpath

        Adding a file Node to a file Node is treated exactly as adding a string
        to a file Node, where added Node.path is literally concatenated to 
        Node.path of the starting node.

        Note: Adding absolute path to a Node is useless. It will always result in
        a new node with that absolute path as NodeC.path. You might as well just:
            NodeA.derive(NodeB.absolutepath)
            # or
            context.Node(NodeB.absolutepath)

        In all cases, returned Node's contextpath is always equal to first
        argument's context path.
            C = A + B
            C.contextpath == A.contextpath
        
        @param obj: A string or a Node insance to be added to this node.
        
        @return: A Node instance with new path set.
        '''
		ospathjoinlike=lambda a,b,ae,be,isdir:os.path.normpath(os.path.join(expandvars(a,ae),os.path.expanduser(expandvars(b,be))))+(isdir and os.sep or'')
		if type(obj)in STRINGLIKE:
			bp=obj
			bd=obj.endswith("/")or obj.endswith("\\")
			be=self.env
		else:
			try:
				bp=obj.path
				bd=obj.isdir
				be=obj.env
			except:
				raise TypeError("Cannot concatenate 'Node' and '%s' objects"%type(obj))
		if self.isdir:
			return self.derive(ospathjoinlike(self.path,bp,self.env,be,bd))
		else:
			return self.derive(self.path+bp)
	def __concat__(self,obj):
		return self.__add__(obj)
	def __sub__(self,remove):
		'''This method allows removing path fragments from the ends of a path
        using the "-" operator.
        Another way of describing the substraction is "if A.fullpath ends in 
        B remove that part from path A and return result."
        
            C = A - B (where B can be String or Node)

        When Node is substracted from Node, it is loosely equivalent to
            C = A - B.path 
        where contextpaths are same, and
            C = A.fullpath - B.fullpath
        where resulting path is still a child of path A.contextpath   

        The path variables / macros are NOT expanded.
        
        If the string being substracted is NOT found at the end of the starting string,
        the starting node is returned unchanged. Actual Node A is returned, not a clone.
        You can, thus, check if substraction actually happened by 
            C = A - B
            if C == A:
                # subsctraction never happened.
                # as the path B was not found at the end of path A.

        @param obj: A string or a Node insance which will be removed from 
            starting Node.
        
        @return: A Node instance with the derived path.
        '''
		if type(remove)in STRINGLIKE:
			remove=self.derive(remove)
		else:
			try:
				_trash=remove.contextpath
			except:
				raise TypeError("Cannot substract '%s' objects from 'Node'"%type(remove))
		if self.contextpath==remove.contextpath:
			if remove.path!=''and self.path.endswith(remove.path):
				return self.derive(self.path[:-len(remove.path)],self.contextpath,self.env)
		elif remove.fullpath!=''and self.fullpath.endswith(remove.fullpath):
			tmp=self.fullpath[:-len(remove.fullpath)]
			if tmp.startswith(self.contextpath):
				return self.derive(tmp[len(self.contextpath):],self.contextpath,self.env)
		return self
	def __div__(self,start):
		'''This method allows finding the difference (relative path from start
        path to Node's path) between two Nodes or one Node and a path defined as
        a string using the "-" operator. 
        
            C = A / B
        
        Another way of describing the substraction is "derive path to Node A
        based from the point of view of node B"

        When strings are substracted from nodes, it is an equivalent of
            B = Node(string, '.', A.env)
            C = A / B
        In other words, the contextpath of the path given as a string is always
        considered to be current working directory at the time of subsctraction.
        When dealing with strings, resulting C.contextpath will likely be absolute
        except when A.contextpath == '.'
        If this is not desired behavior, define Node B and substract that from A.

        Absolute path of resulting Node C will always be equal to absolute path
        of A. However, path and contextpath of C will be altered to be from the 
        perspective of B:
            C.absolutepath == A.absolutepath
            C.path != A.path # ALMOST always true. Not true only when A & B are
                in the same folder.
            C.contextpath == path to folder or parent folder (when path is
                file) of B
            C.path == some form of '../../../folder/folder/name' (file name is 
                followed by '/' if C.isdir)
            C.env == B.env

        The paths are expanded very conservatively. If two Node
        objects are operated on, and context is the same, we only compare 
        (and derive a relative path for) the Node.path values.
        
        Paths are expanded to absolute only if one of them is absolute.
        ENV variable macros in all Node.path values are expanded.
        
        Even than, if the resulting context path of C starts with path to
        current working dir, the current working dir path is chopped off and
        replaced os-specific equivalent of './'

        @param obj: A string or a Node insance against which the relative path
            is to be calculated to this Node's path.
        
        @return: A Node instance with the derived path.
        '''
		if type(start)in STRINGLIKE:
			start=self.derive(start,'.',self.env)
		else:
			try:
				_trash=start.contextpath
			except:
				raise TypeError("Cannot concatenate 'Node' and '%s' objects"%type(start))
		Ccontextpath=start.isdir and start.fullpath or start.parent.fullpath
		Ccontextpath=chopoffcwd(Ccontextpath)
		return self.derive(_relpath(self.isdir and self.absolutepath or self.parent.absolutepath,start.isdir and start.absolutepath or start.parent.absolutepath)+os.sep+(self.isfile and self.name or''),Ccontextpath,start.env)
	__truediv__=__div__
	def _read(self):
		'''
        Private Method. Do not use directly.
        
        Reads contents of the file, if exists, into a string.
        
        This is a very simple, common-denominator helper method that 
        hides "if exists" and returns "" if does not exist. 
        We assume non-binary (textual) contents. For full control over
        reading files use python's *open* built-in command.
        
        @param mode: a string denoting the "binary" or "regular"
            reading from the file. The difference is important
            only on some platforms where bytes objecs are returned
            by open(file,'rb').read()
        
        @return: String containing the contents of the file.
        
        Part of Wakparts API. 
        '''
		ap=self.absolutepath
		if os.path.exists(ap):
			return open(ap,'rb').read()
		else:
			return''
	def _write(self,contents):
		'''
        Private Method. Do not use directly.
        
        Writes contents to a file. If file does not exist, creates and appends.

        If you want the contents of the file to be overwriten, do the following:
        >>> NodeInstance.data = contents
        # or
        >>> NodeInstance.delete().append(contents)
        or use the python's standard open(filename, 'w').write(contents)
        
        @param contents: string to be added to the end of the file.
        
        @param mode: a string denoting the "binary" or "regular"
            reading from the file. The difference is important
            only on some platforms where bytes objecs are returned
            by open(file,'rb').read()
        
        @return: this very same instance of Node object. Use for chaining of 
            actions on a given instance of Node.
            
        Part of Wakparts API.
        '''
		if type(contents)not in BYTESLIKE:
			raise Exception("Only pre-encoded Byte string-like objects can be written directly to files. Please, encode the contents to a Byte string-like stream or use Node.text property that does that for you.")
		if not self.isfile:
			raise Exception("The Node represents a file system object that is not a file. Only writing to file objects is supported.")
		ap=self.absolutepath
		parent=os.path.dirname(ap)
		if not os.path.isdir(parent):
			os.makedirs(parent)
		f=open(ap,'wb')
		f.write(contents)
		f.close()
	def _donothing(self,*args,**kw):
		pass
	data=property(_read,_write,_donothing,'''Node.data property allows access to the byte-level contents of the file.
        
        You can *get* the contents of the file by assigning from Node.data and you
        can *set* the contents of the file by assigning to Node.data.

          data = Node.data # read from file
          Node.data = data + "PS: I love you!" # write to file

        This is an easy, but, depending on manner of use, potentially inefficient way
        to interact with contents of the underlying file, as we open and close the 
        file on every access.

        You can assign only "Byte arrays" to the Node.data. The setter behind it will
        NOT encode any Unicode strings into byte arrays by default. If you want
        authomatic text encoding to happen, use Node.text property.
        
        Note on terminology:
        Python 2.4 - 2.x:
          "Unicode" type is explicitely a separate type - unicode - and different 
          from *str*. *str* types here are pretty much "Byte arrays" that are "encoded"
          per particular code page and require .decode() to bring it into pure "unicode"
          Here, we consider:
            bytes, bytearray, str = "Byte array" type 
            unicode = "Unicode" type

        Python 3.x (at least, true per 3.2.x):
          "Unicode" type IS *str* type. *Str* types are (probably stored similarly to 
          UTF16 internally) naturally decoded, internal-to-python Unicode strings.
          All the methods and properties you would expect to be on a "classic" 2.x *str*
          are still there on 3.x, but they are missing on the "Byte array" types, 
          which is a departure of sort. In order to do old-style string manipulation, 
          it's probably better to .decode() all "byte arrays" into "unicode" and 
           them back when done.
          The type of *unicode* does not exist in 3.x. 
          Here, we consider:
            bytes, bytearray = "Byte array" type 
            str = "Unicode" type''')
	text=property(lambda self:self._read().decode(DEFAULTTEXTENCODING),lambda self,contents:self._write(type(contents)in BYTESLIKE and contents or contents.encode(DEFAULTTEXTENCODING)),_donothing,'''Node.text property allows access to textual representation of the
        byte-level contents of the file. In other words, you are very likely to
        get a "Unicode" object back, and you can assign a "Unicode" into Node.text.
        Conversion to byte array will happen automatically.
        
        You can *get* the contents of the file by assigning from Node.text and you
        can *set* the contents of the file by assigning to Node.text.

          text = Node.text # read from file
          Node.text = text + "PS: I love you!" # write to file

        This is an easy, but, depending on manner of use, potentially inefficient way
        to interact with contents of the underlying file.

        On assignment to Node.text, the following happens:
        - underlying file is opened.
        - contents artument value is converted to byte array with auto-guessed encoding.
        - underlying file is writen to, with all of the contents of the file replaced.
        - underlying file is closed.
        
        On assignment from Node.text the following happens:
        - underlying file is opened.
        - contents are read
        - underlying file is closed
        - contents are .decoded() from byte array into some Unicode-capable string
        
        This property is similar to Node.data, but tries to do more guessing and
        magic with the contents before it's written to the file. When you deal with
        "text" and are ok with on-the-fly auto-picked character encoding, and, possible,
        substitution of Unix / Windows / Max line endings, use Node.text.
        If you care about byte-to-byte parity between contents of the passed argument
        and the data written to the file, use Node.data. 
        
        Note on terminology:
        Python 2.4 - 2.x:
          "Unicode" type is explicitely a separate type - unicode - and different 
          from *str*. *str* types here are pretty much "Byte arrays" that are "encoded"
          per particular code page and require .decode() to bring it into pure "unicode"
          Here, we consider:
            bytes, bytearray, str = "Byte array" type 
            unicode = "Unicode" type

        Python 3.x (at least, true per 3.2.x):
          "Unicode" type IS *str* type. *Str* types are (probably stored similarly to 
          UTF16 internally) naturally decoded, internal-to-python Unicode strings.
          All the methods and properties you would expect to be on a "classic" 2.x *str*
          are still there on 3.x, but they are missing on the "Byte array" types, 
          which is a departure of sort. In order to do old-style string manipulation, 
          it's probably better to .decode() all "byte arrays" into "unicode" and 
           them back when done.
          The type of *unicode* does not exist in 3.x. 
          Here, we consider:
            bytes, bytearray = "Byte array" type 
            str = "Unicode" type
            
        TODO: The world of text encoding and storage is a nightmare. We will shoot for
        some simple scenarios where we pass along the data and don't ask questions or 
        correct / adjust the encoding. Think how this can me made more sane.
        ''')
	def delete(self):
		'''
        Removes the file location specified in the Node instance.
        
        This action does not destroy or change the Node instance.
        
        @return:  this very same instance of Node object. Use for chaining of 
            actions on a given instance of Node.
            
        Part of Wakparts API. 
        '''
		ap=self.absolutepath
		if os.path.exists(ap):
			if self.isfile:
				os.remove(ap)
			else:
				shutil.rmtree(ap,ignore_errors=True)
		return self
	def move(self,destination,**options):
		'''
        Moves files or folders to new location.

        You can move:
        - folder to new folder ( Node('./oldname/').move('../newname/') )
        - file to new file ( Node('./oldname').move('../somefolder/newname') )
        - file inside new or existing folder ( Node('./filename').move('../') )

        Note, the definition of the "folder" is not the same one applicable
        to your specific file system. The definition is simple:
        If path string ends in a slash (back of forward) it's a folder,
        regardless of what the path points to in reality. If reality does not
        match inferred path type, Exception is drawn.

        After you move the actual file contents to a new location, 
        this Node instance is still unchanged, pointing to the same old
        location. self.exists should now return False. However, this method
        returns new instance of Node pointing to the new location. So, you
        can do:
            node = node.move('new location')

        @param destination: A string describing path (may contain ENV
            macros and relative refs) or a Node instance to the path
            where the source node is to be copied.
            Destination (combined Node.contextpath + Node.path in case of Node
            instance) can be a relative path. However, when it is relative, 
            it's INTERPRETED RELATIVE TO SOURCE'S PARENT FOLDER, not relative to
            project's top folder, CWD or anything else. If there is a chance
            that destination node is relative, and you intend the destination
            to be "hard", convert destination into absolutepath before passing it here.

        @param options: A dictionary of options altering the behavior of the method.

        @return: A new Node instance representing the new location of the object.
        
        Part of Wakparts API.
        '''
		srcpath=self.absolutepath
		if not os.path.exists(srcpath):
			raise Exception("Unable to move nonexistent file system node %s"%srcpath)
		if type(destination)in STRINGLIKE:
			parent=self.parent
			destobj=Node(os.path.join(parent.path,destination),parent.contextpath,self.env)
		else:
			destobj=destination
		destpath=destobj.absolutepath
		destisdir=destobj.isdir
		srcisdir=self.isdir
		if srcisdir and not destisdir:
			raise Exception("Unable to move content to %s. Cannot move folder into a file"%destpath)
		elif not srcisdir and destisdir:
			destparentpath=destpath
			destpath=os.path.join(destpath,os.path.basename(srcpath))
			destobj.path=destpath
		else:
			destparentpath=os.path.dirname(destpath.rstrip("/\\"+os.sep))+os.sep
		if os.path.exists(destpath):
			raise Exception("Unable to move content to %s. Location already exists"%destpath)
		if not os.path.exists(destparentpath):
			try:
				os.makedirs(destparentpath)
			except:
				raise Exception("Unable to move content to %s. Cannot create path leading to that location."%destpath)
		shutil.move(srcpath,destpath)
		return destobj
	def copy(self,destination,**options):
		'''
        Copies files or folders to new location, preserving permission bits,
        last access time, last modification time, and flags.

        BIG FAT WARNING:
        Destination is always evaluated against the source if 
        dest.fullpath is relative. If you want the Node to be copied to a 
        specific path, pass absolute path as argument.

        You can copy:
        - folder to new folder ( Node('./oldname/').copy('../newname/') )
        - file to new file ( Node('./oldname').copy('../somefolder/newname') )
        - file inside new or existing folder ( Node('./filename').copy('../') )

        Note, the definition of the "folder" is not the same one applicable
        to your specific file system. The definition is simple:
        If path string ends in a slash (back of forward) it's a folder,
        regardless of what the path points to in reality. If reality does not
        match inferred path type, Exception is drawn.

        After you copy the actual file contents to a new location, 
        this Node instance is still unchanged, pointing to the same old
        location. self.exists should now return False. However, this method
        returns new instance of Node pointing to the new location. So, you
        can do:
            node = node.copy('new location')

        If you do NOT want the permission bits, timestamps etc to be preserved,
        there is NO way for you to influence this behavior of this method. 
        Instead, change it after copy like so:
            node.copy(dest).chmod(desired value)

        @param destination: A string describing path (may contain ENV
            macros and relative refs) or a Node instance to the path
            where the source node is to be copied.
            Destination (Node.fullpath in case of Node
            instance) can be a relative path. However, when it is relative, 
            it's INTERPRETED RELATIVE TO SOURCE'S PARENT FOLDER, not relative to
            project's top folder, CWD or anything else. If there is a chance
            that destination node is relative, and you intend the destination
            to be "hard", convert destination into absolutepath before passing it here.

        @param options: A dictionary of options altering the behavior of the method.

        @return: A new Node instance representing the new location of the object.
        
        Part of Wakparts API.
        '''
		srcpath=self.absolutepath
		if not os.path.exists(srcpath):
			raise Exception("Unable to copy nonexistent file system node %s"%srcpath)
		if type(destination)in STRINGLIKE:
			parent=self.parent
			destobj=Node(os.path.join(parent.path,destination),parent.contextpath,self.env)
		else:
			destobj=destination
		destpath=destobj.absolutepath
		destisdir=destobj.isdir
		selfisdir=self.isdir
		if selfisdir and not destisdir:
			raise Exception("Cannot copy folder %s into a file %s"%(srcpath,destpath))
		elif not selfisdir and destisdir:
			destparentpath=destpath
			destpath=os.path.join(destpath,os.path.basename(srcpath))
			destobj.path=destpath
		else:
			destparentpath=os.path.dirname(destpath.rstrip("/\\"+os.sep))+os.sep
		if os.path.exists(destpath):
			try:
				srcstat=os.stat(srcpath)
				deststat=os.stat(destpath)
			except OSError:
				pass
			else:
				if not destisdir and not selfisdir and srcstat.st_size==deststat.st_size and deststat.st_mtime>=srcstat.st_mtime:
					return destobj
				else:
					raise Exception("Unable to copy content to %s. Location already exists"%destpath)
		if not os.path.exists(destparentpath):
			try:
				os.makedirs(destparentpath)
			except:
				raise Exception("Unable to copy content to %s. Cannot create path leading to that location."%destpath)
		if selfisdir and destisdir:
			shutil.copytree(srcpath,destpath,symlinks=True)
		else:
			shutil.copy2(srcpath,destpath)
		return destobj
	def chmod(self,mode=420,**options):
		'''Change mode on a node. 
        
        By default, this is a recursive action if the Node instance refers to a folder.
        
        @param mode: (420 ('0644') by default) An int with decimal base, representing 
            the mode. Note that the notation for octals have changed between Python 2.x
            and 3.x from 0### to 0o### making it hard to specify the modes as octals in
            a compatible way. A workaround is to use int() with base 8 and specify the
            mode as string, without any formatting. See example below.  
        
        @param recursive: (True by default) Specifies that the change is done
            recursively if the node refers to a folder.
            
        @return: Self.
        
        Examples:
            node.chmod( int("755", 8), recursive = False )
        
        Part of Wakparts API.
        '''
		baseopts={'recursive':True}
		baseopts.update(options)
		if self.isdir and baseopts['recursive']:
			raise Exception("Node.chmod() recursive flag code not implemented.")
		else:
			os.chmod(self.absolutepath,mode)
		return self
	def persist(self):
		'''If does not exist yet, creates the file or folder referenced by Node.absolutepath.
        
        This is very similar to *nix's "touch"
        
        Part of Wakparts API.
        '''
		ap=self.absolutepath
		if not os.path.exists(ap):
			if self.isdir:
				try:
					os.makedirs(ap)
				except:
					raise Exception("Cannot persist the Node %s. Cannot create folders leading to it."%ap)
			else:
				parent=os.path.dirname(ap)
				if not os.path.isdir(parent):
					try:
						os.makedirs(parent)
					except:
						raise Exception("Cannot persist the Node %s. Cannot create folders leading to it."%ap)
				open(ap,'w').close()
		return self
class Action(object):
	'''Namespase-like class that is exposed as Context.Action method 
    
    It allows for a catalog of actions one can use directly or pass to 
    Task to be ran with delay.
    
    This is a collection of functions that simplifies the manipulation
    with files and other thematic sub-namespaces with nested actions.
    
    Picks the best-of-breed code to accomplish a specific generic task.
    
    Part of Wakparts API.
    '''
if __name__=='__main__':
	usage='''wakparts.py
    This module can be imported and used standalone and as an extension for Waf.
    '''
