<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE qml SYSTEM "/wt/query/qml/qml.dtd">
<qml bypassAccessControl="true">
	<parameter name="gSpecId" type="java.lang.Object"/>
	<statement>
		<query>
			<select distinct="true" group="false">
				<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Component Type" isExternal="false" propertyName="componentType" selectOnly="false" type="java.lang.String">
					componentType
				</column>
				<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Component Parent Id" isExternal="false" propertyName="componentParentId" selectOnly="false" type="java.lang.String">
					componentParentId
				</column>
				<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Spec Version" isExternal="false" propertyName="specVersion" selectOnly="false" type="java.lang.String">
					specVersion
				</column>
				<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Component Reference.Object Id.Id" isExternal="false" propertyName="componentReference.objectId.id" selectOnly="false" type="long">
					componentReference.key.id
				</column>
				<object alias="com.lcs.wc.document.LCSDocument" heading="com.lcs.wc.document.LCSDocument" propertyName=""/>
				<object alias="Document Master" heading="Document Master" propertyName=""/>
				<column alias="Document Master" heading="Document Master Persist Info.Object Identifier.Id" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
					thePersistInfo.theObjectIdentifier.id
				</column>
				<column alias="Document Master" heading="Document Master Name" isExternal="false" propertyName="name" selectOnly="false" type="java.lang.String">
					name
				</column>
				<column alias="Document Master" heading="Document Master Number" isExternal="false" propertyName="number" selectOnly="false" type="java.lang.String">
					number
				</column>
				<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="specToCompMasterSpecId" isExternal="false" propertyName="specificationMasterReference.objectId.id" selectOnly="false" type="long">
					specificationMasterReference.key.id
				</column>
				<column alias="Garment Spec" heading="gSpecMasterSpecId" isExternal="false" selectOnly="false" type="long">
					master&gt;thePersistInfo.theObjectIdentifier.id
				</column>
				<column alias="Holder To Content" heading="roleAObjectRef.key.id" isExternal="false" selectOnly="false" type="long">
					roleAObjectRef.key.id
				</column>
				<column alias="Holder To Content" heading="roleBObjectRef.key.id" isExternal="false" selectOnly="false" type="long">
					roleBObjectRef.key.id
				</column>
				<column alias="Application Data" heading="fileName" isExternal="false" propertyName="fileName" selectOnly="false" type="java.lang.String">
					fileName
				</column>
				<column alias="Application Data" heading="Role" isExternal="false" propertyName="role" selectOnly="false" type="wt.content.ContentRoleType">
					role
				</column>
				<column alias="Application Data" heading="File Size" isExternal="false" propertyName="fileSize" selectOnly="false" type="long">
					fileSize
				</column>
				<column alias="Application Data" heading="File Version" isExternal="false" propertyName="fileVersion" selectOnly="false" type="java.lang.String">
					fileVersion
				</column>
				<object alias="Application Data" heading="Format Name" propertyName="formatName">
					<property name="formatName"/>
				</object>
				<object alias="Application Data" heading="Application Data" propertyName=""/>
				<column alias="Application Data" heading="Description" isExternal="false" propertyName="description" selectOnly="false" type="java.lang.String">
					description
				</column>
				<column alias="Garment Spec" heading="garmentSpecId" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
					thePersistInfo.theObjectIdentifier.id
				</column>
				<column alias="Garment Spec" heading="gSpecName" isExternal="false" propertyName="name" selectOnly="false" type="java.lang.String">
					master&gt;name
				</column>
				<column alias="PatternSpec" heading="patternSpecId" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
					thePersistInfo.theObjectIdentifier.id
				</column>
				<column alias="PatternSpec" heading="pSpec Name" isExternal="false" propertyName="name" selectOnly="false" type="java.lang.String">
					master&gt;name
				</column>
			</select>
			<from>
				<table alias="Garment Spec" isExternal="false">
					com.lcs.wc.specification.FlexSpecification
				</table>
				<table alias="com.lcs.wc.specification.FlexSpecToComponentLink" isExternal="false">
					com.lcs.wc.specification.FlexSpecToComponentLink
				</table>
				<table alias="Document Master" isExternal="false">
					wt.doc.WTDocumentMaster
				</table>
				<table alias="com.lcs.wc.document.LCSDocument" isExternal="false">
					com.lcs.wc.document.LCSDocument
				</table>
				<table alias="Holder To Content" isExternal="false">
					wt.content.HolderToContent
				</table>
				<table alias="Application Data" isExternal="false">
					wt.content.ApplicationData
				</table>
				<table alias="PatternSpec" isExternal="false">
					com.lcs.wc.specification.FlexSpecification
				</table>
				<table alias="SpecToSpecLink" isExternal="false">
					com.lcs.wc.specification.SpecToSpecLink
				</table>
			</from>
			<where>
				<compositeCondition type="and">
					<condition>
						<operand>
							<column alias="Garment Spec" heading="Latest Iteration" isExternal="false" propertyName="latestIteration" selectOnly="false" type="boolean">
								iterationInfo.latest
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<constant heading="1" isMacro="false" type="java.lang.Object">
								1
							</constant>
						</operand>
					</condition>
					<compositeCondition type="or">
						<condition>
							<operand>
								<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Specification Master Reference.Object Id.Id" isExternal="false" propertyName="specificationMasterReference.objectId.id" selectOnly="false" type="long">
									specificationMasterReference.key.id
								</column>
							</operand>
							<operator type="equal"/>
							<operand>
								<column alias="Garment Spec" heading="master&gt;thePersistInfo.theObjectIdentifier.id" isExternal="false" selectOnly="false" type="long">
									master&gt;thePersistInfo.theObjectIdentifier.id
								</column>
							</operand>
						</condition>
						<condition>
							<operand>
								<column alias="PatternSpec" heading="master&gt;thePersistInfo.theObjectIdentifier.id" isExternal="false" selectOnly="false" type="long">
									master&gt;thePersistInfo.theObjectIdentifier.id
								</column>
							</operand>
							<operator type="equal"/>
							<operand>
								<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Specification Master Reference.Object Id.Id" isExternal="false" propertyName="specificationMasterReference.objectId.id" selectOnly="false" type="long">
									specificationMasterReference.key.id
								</column>
							</operand>
						</condition>
					</compositeCondition>
					<condition>
						<operand>
							<column alias="com.lcs.wc.specification.FlexSpecToComponentLink" heading="Component Reference.Object Id.Id" isExternal="false" propertyName="componentReference.objectId.id" selectOnly="false" type="long">
								componentReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Document Master" heading="Persist Info.Object Identifier.Id" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
								thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Spec" heading="Persist Info.Object Identifier.Id" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
								thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<parameterTarget name="gSpecId"/>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="com.lcs.wc.document.LCSDocument" heading="master&gt;thePersistInfo.theObjectIdentifier.id" isExternal="false" selectOnly="false" type="long">
								master&gt;thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Document Master" heading="Persist Info.Object Identifier.Id" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
								thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="com.lcs.wc.document.LCSDocument" heading="iterationInfo.identifier.iterationId" isExternal="false" selectOnly="false" type="java.lang.String">
								iterationInfo.identifier.iterationId
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<constant heading="1" isMacro="false" type="java.lang.Object">
								1
							</constant>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Application Data" heading="File Name" isExternal="false" propertyName="fileName" selectOnly="false" type="java.lang.String">
								fileName
							</column>
						</operand>
						<operator type="like"/>
						<operand>
							<constant heading="%.png%" isMacro="false" type="java.lang.Object">
								%.png%
							</constant>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Spec" heading="master&gt;thePersistInfo.theObjectIdentifier.id" isExternal="false" selectOnly="false" type="long">
								master&gt;thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="SpecToSpecLink" heading="roleAObjectRef.key.id" isExternal="false" selectOnly="false" type="long">
								roleAObjectRef.key.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="SpecToSpecLink" heading="roleBObjectRef.key.id" isExternal="false" selectOnly="false" type="long">
								roleBObjectRef.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="PatternSpec" heading="master&gt;thePersistInfo.theObjectIdentifier.id" isExternal="false" selectOnly="false" type="long">
								master&gt;thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
					</condition>
				</compositeCondition>
			</where>
			<referenceJoin>
				<join name="roleAObjectRef">
					<aliasTarget alias="Holder To Content"/>
					<aliasTarget alias="com.lcs.wc.document.LCSDocument"/>
				</join>
				<join name="roleBObjectRef">
					<aliasTarget alias="Holder To Content"/>
					<aliasTarget alias="Application Data"/>
				</join>
			</referenceJoin>
		</query>
	</statement>
</qml>
