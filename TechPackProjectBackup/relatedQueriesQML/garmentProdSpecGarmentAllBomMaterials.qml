<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE qml SYSTEM "/wt/query/qml/qml.dtd">
<qml bypassAccessControl="false">
	<parameter name="specId" type="java.lang.Object"/>
	<statement>
		<query>
			<select distinct="false" group="false">
				<object alias="Garment Product Child Material" heading="Garment Product Child Material" propertyName=""/>
				<column alias="Garment Product BOM Link" heading="garmentUseId" isExternal="false" propertyName="num37" selectOnly="false" type="double">
					num37
				</column>
				<object alias="Garment Product BOM Link" heading="Material" propertyName="child.name">
					<property name="child">
						<property name="name"/>
					</property>
				</object>
				<column alias="Garment Product Child Material" heading="Description" isExternal="false" propertyName="att29" selectOnly="false" type="java.lang.String">
					att29
				</column>
				<column alias="Garment Product BOM Part" heading="Garment Product BOM Name" isExternal="false" propertyName="name" selectOnly="false" type="java.lang.String">
					master&gt;name
				</column>
				<object alias="Garment product" heading="Season Master.Persist Info.Object Identifier.Id" propertyName="seasonMaster.persistInfo.objectIdentifier.id">
					<property name="seasonMaster">
						<property name="persistInfo">
							<property name="objectIdentifier">
								<property name="id"/>
							</property>
						</property>
					</property>
				</object>
				<column alias="Garment product" heading="Season Rev Id" isExternal="false" propertyName="seasonRevId" selectOnly="false" type="double">
					seasonRevId
				</column>
				<column alias="Garment product" heading="Product ARev Id" isExternal="false" propertyName="productARevId" selectOnly="false" type="double">
					productARevId
				</column>
				<object alias="Garment Product BOM Link" heading="Material Color" propertyName="materialColor">
					<property name="materialColor"/>
				</object>
				<column alias="Garment Product BOM Link" heading="Branch Id" isExternal="false" propertyName="branchId" selectOnly="false" type="int">
					branchId
				</column>
				<object alias="Garment Product BOM Link" heading="Source Dimension" propertyName="sourceDimension">
					<property name="sourceDimension"/>
				</object>
				<column alias="Garment Product BOM Link" heading="Dimension Id" isExternal="false" propertyName="dimensionId" selectOnly="false" type="java.lang.String">
					dimensionId
				</column>
				<column alias="Garment Product BOM Link" heading="Dimension Name" isExternal="false" propertyName="dimensionName" selectOnly="false" type="java.lang.String">
					dimensionName
				</column>
				<object alias="Garment Product BOM Link" heading="Destination Dimension" propertyName="destinationDimension">
					<property name="destinationDimension"/>
				</object>
				<object alias="Garment Product BOM Link" heading="Color Dimension" propertyName="colorDimension">
					<property name="colorDimension"/>
				</object>
				<object alias="Garment Product BOM Link" heading="altName" propertyName="destinationDimension.att1">
					<property name="destinationDimension">
						<property name="att1"/>
					</property>
				</object>
				<object alias="Garment Product BOM Link" heading="altNumber" propertyName="destinationDimension.att2">
					<property name="destinationDimension">
						<property name="att2"/>
					</property>
				</object>
				<object alias="Garment Product BOM Link" heading="altPrimary" propertyName="destinationDimension.att3">
					<property name="destinationDimension">
						<property name="att3"/>
					</property>
				</object>
				<object alias="Garment Product BOM Link" heading="altManfStyle" propertyName="destinationDimension.att4">
					<property name="destinationDimension">
						<property name="att4"/>
					</property>
				</object>
				<object alias="Garment Product BOM Link" heading="altShade" propertyName="destinationDimension.att5">
					<property name="destinationDimension">
						<property name="att5"/>
					</property>
				</object>
			</select>
			<from>
				<table alias="Garment product" isExternal="false">
					com.lcs.wc.product.LCSProduct
				</table>
				<table alias="Garment Product BOM Link" isExternal="false">
					com.lcs.wc.flexbom.FlexBOMLink
				</table>
				<table alias="Garment Product BOM Part" isExternal="false">
					com.lcs.wc.flexbom.FlexBOMPart
				</table>
				<table alias="Garment Product Child Material" isExternal="false">
					com.lcs.wc.material.LCSMaterial
				</table>
				<table alias="Garment Product Spec" isExternal="false">
					com.lcs.wc.specification.FlexSpecification
				</table>
				<table alias="Garment Flex Spec to Component Link" isExternal="false">
					com.lcs.wc.specification.FlexSpecToComponentLink
				</table>
			</from>
			<where>
				<compositeCondition type="and">
					<condition>
						<operand>
							<column alias="Garment product" heading="Latest Iteration" isExternal="false" propertyName="latestIteration" selectOnly="false" type="boolean">
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
					<condition>
						<operand>
							<column alias="Garment Product BOM Link" heading="Parent Reference.Object Id.Id" isExternal="false" propertyName="parentReference.objectId.id" selectOnly="false" type="long">
								parentReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Garment Product BOM Part" heading="Master Reference.Object Id.Id" isExternal="false" propertyName="masterReference.objectId.id" selectOnly="false" type="long">
								masterReference.key.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Product BOM Part" heading="Latest Iteration" isExternal="false" propertyName="latestIteration" selectOnly="false" type="boolean">
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
					<condition>
						<operand>
							<column alias="Garment Product Child Material" heading="Master Reference.Object Id.Id" isExternal="false" propertyName="masterReference.objectId.id" selectOnly="false" type="long">
								masterReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Garment Product BOM Link" heading="Child Reference.Object Id.Id" isExternal="false" propertyName="childReference.objectId.id" selectOnly="false" type="long">
								childReference.key.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Product Child Material" heading="Latest Iteration" isExternal="false" propertyName="latestIteration" selectOnly="false" type="boolean">
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
					<condition>
						<operand>
							<column alias="Garment Product BOM Link" heading="Out Date" isExternal="false" propertyName="outDate" selectOnly="false" type="java.sql.Timestamp">
								outDate
							</column>
						</operand>
						<nullOperator type="isNull"/>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Product BOM Link" heading="Dropped" isExternal="false" propertyName="dropped" selectOnly="false" type="boolean">
								dropped
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<constant heading="0" isMacro="false" type="java.lang.Object">
								0
							</constant>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Product Spec" heading="Latest Iteration" isExternal="false" propertyName="latestIteration" selectOnly="false" type="boolean">
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
					<condition>
						<operand>
							<column alias="Garment Product Spec" heading="Persist Info.Object Identifier.Id" isExternal="false" propertyName="persistInfo.objectIdentifier.id" selectOnly="false" type="long">
								thePersistInfo.theObjectIdentifier.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<parameterTarget name="specId"/>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Product Spec" heading="Master Reference.Object Id.Id" isExternal="false" propertyName="masterReference.objectId.id" selectOnly="false" type="long">
								masterReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Garment Flex Spec to Component Link" heading="Specification Master Reference.Object Id.Id" isExternal="false" propertyName="specificationMasterReference.objectId.id" selectOnly="false" type="long">
								specificationMasterReference.key.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment Flex Spec to Component Link" heading="Component Reference.Object Id.Id" isExternal="false" propertyName="componentReference.objectId.id" selectOnly="false" type="long">
								componentReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Garment Product BOM Part" heading="Master Reference.Object Id.Id" isExternal="false" propertyName="masterReference.objectId.id" selectOnly="false" type="long">
								masterReference.key.id
							</column>
						</operand>
					</condition>
					<condition>
						<operand>
							<column alias="Garment product" heading="Master Reference.Object Id.Id" isExternal="false" propertyName="masterReference.objectId.id" selectOnly="false" type="long">
								masterReference.key.id
							</column>
						</operand>
						<operator type="equal"/>
						<operand>
							<column alias="Garment Product Spec" heading="Spec Owner Reference.Object Id.Id" isExternal="false" propertyName="specOwnerReference.objectId.id" selectOnly="false" type="long">
								specOwnerReference.key.id
							</column>
						</operand>
					</condition>
				</compositeCondition>
			</where>
		</query>
	</statement>
</qml>
