/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var css = {
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  hint: {
    position: 'absolute',
    top: '0',
    left: '0',
    borderColor: 'white',
    boxShadow: 'none'
  },
  input: {
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'white'
  },
  inputWithNoHint: {
    position: 'relative',
    verticalAlign: 'top'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '100',
    display: 'none'
  },
  suggestions: {
    display: 'block',
	 backgroundColor: 'black',
	 color: 'white'
  },
  suggestion: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
	 backgroundColor: 'black',
	 color: 'white'
  },
  suggestionChild: {
    whiteSpace: 'normal',
	 backgroundColor: 'black',
	 color: 'white'
  },
  ltr: {
    left: '0',
    right: 'auto'
	
  },
  rtl: {
    left: 'auto',
    right:' 0'
  }
};
