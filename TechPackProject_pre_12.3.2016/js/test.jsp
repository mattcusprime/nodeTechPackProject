<%-- 	Copyright (c) 2015 HanesBrandsInc All Rights Reserved --%>

<%-- /////////////////////////////////////////////////////////////////////////////////////--%>
<%-- //////////////////////////////// PAGE DOCUMENTATION//////////////////////////////////--%>
<%-- /////////////////////////////////////////////////////////////////////////////////////--%>
<%--
	HBICreatePlaceholder.jsp - page
	This file contain function which is invoking from AJAX call to start the validation and initialization of Placeholder with the given Season object, Placeholder count and Product Type
	@Author: Abdul.Patel@Hanes.com
	@Created on: 19-FEB-2016
--%>
<%-- /////////////////////////////////////////////////////////////////////////////////////--%>
<%-- //////////////////////////////// JSP HEADERS ////////////////////////////////////////--%>
<%-- /////////////////////////////////////////////////////////////////////////////////////--%>
<%@page language="java"
        import="com.hbi.wc.season.HBIPlaceholderGenerator,
				com.hbi.wc.utility.HBIImagePageURLConstructionUtility,
				com.lcs.wc.util.LCSProperties,
				com.lcs.wc.util.FormatHelper,
				com.lcs.wc.util.LCSLog,
				wt.util.WTException,
				wt.util.WTPropertyVetoException"
%>

<%-- /////////////////////////////////////////////////////////////////////////////////////--%>
<%-- /////////////////////////////////////// JAVA CODE ///////////////////////////////////--%>
<%-- /////////////////////////////////////////////////////////////////////////////////////--%>

<%
string str = HBIImagePageURLConstructionUtility.formatAndReturnDocumentImageURL("16624307", "B252.2252.7764ft.bk-Cell1.png");
out.print(str);


%>