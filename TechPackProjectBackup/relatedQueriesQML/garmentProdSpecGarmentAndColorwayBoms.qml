<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE qml SYSTEM "/wt/query/qml/qml.dtd">
<qml bypassAccessControl="false">
  <parameter name="objectId" type="java.lang.Object"/>
  <statement>
    <query>
      <select distinct="false" group="false">
        <column alias="com.lcs.wc.product.LCSProduct"
            heading="Name" isExternal="false"
            propertyName="name" selectOnly="false" type="java.lang.String">
          master&gt;name
        </column>
        <function heading="bPartMaster_bLinkBranchId"
            name="CONCAT" type="java.lang.String">
          <column alias="com.lcs.wc.flexbom.FlexBOMPart"
              heading="Master Reference.Object Id.Id"
              isExternal="false"
              propertyName="masterReference.objectId.id"
              selectOnly="false" type="long">
            masterReference.key.id
          </column>
          <column alias="com.lcs.wc.flexbom.FlexBOMLink"
              heading="com.lcs.wc.flexbom.FlexBOMLink Branch Id"
              isExternal="false" propertyName="branchId"
              selectOnly="false" type="int">
            branchId
          </column>
        </function>
        <column alias="com.lcs.wc.product.LCSSKU"
            heading="cWayName" isExternal="false"
            propertyName="name" selectOnly="false" type="java.lang.String">
          master&gt;name
        </column>
        <column alias="com.lcs.wc.product.LCSSKU"
            heading="Color Code" isExternal="false"
            propertyName="att3" selectOnly="false" type="java.lang.String">
          att3
        </column>
        <column
            alias="com.lcs.wc.specification.FlexSpecification"
            heading="Spec Name" isExternal="false"
            propertyName="name" selectOnly="false" type="java.lang.String">
          master&gt;name
        </column>
        <object alias="com.lcs.wc.material.LCSMaterialColor"
            heading="Material" propertyName="materialMaster.name">
          <property name="materialMaster">
            <property name="name"/>
          </property>
        </object>
        <column alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="bomLinkBranch Id" isExternal="false"
            propertyName="branchId" selectOnly="false" type="int">
          branchId
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Dimension Id" isExternal="false"
            propertyName="dimensionId" selectOnly="false" type="java.lang.String">
          dimensionId
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Dimension Name" isExternal="false"
            propertyName="dimensionName" selectOnly="false" type="java.lang.String">
          dimensionName
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Garment Use ID" isExternal="false"
            propertyName="num6" selectOnly="false" type="double">
          num6
        </column>
        <column alias="com.lcs.wc.color.LCSColor" heading="Att1"
            isExternal="false" propertyName="att1"
            selectOnly="false" type="java.lang.String">
          att1
        </column>
        <object alias="com.lcs.wc.color.LCSColor"
            heading="colorType" propertyName="flexType.typeName">
          <property name="flexType">
            <property name="typeName"/>
          </property>
        </object>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="cDimObjId" propertyName="colorDimension.persistInfo.objectIdentifier.id">
          <property name="colorDimension">
            <property name="persistInfo">
              <property name="objectIdentifier">
                <property name="id"/>
              </property>
            </property>
          </property>
        </object>
        <column alias="com.lcs.wc.color.LCSColor" heading="hex"
            isExternal="false"
            propertyName="colorHexidecimalValue"
            selectOnly="false" type="java.lang.String">
          colorHexidecimalValue
        </column>
        <column alias="com.lcs.wc.color.LCSColor"
            heading="Thumbnail" isExternal="false"
            propertyName="thumbnail" selectOnly="false" type="java.lang.String">
          thumbnail
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMPart"
            heading="bPartBranch" isExternal="false"
            propertyName="branchIdentifier" selectOnly="false" type="long">
          iterationInfo.branchId
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMPart"
            heading="bPartObjectId" isExternal="false"
            propertyName="persistInfo.objectIdentifier.id"
            selectOnly="false" type="long">
          thePersistInfo.theObjectIdentifier.id
        </column>
        <column alias="com.lcs.wc.flexbom.FlexBOMPart"
            heading="bomName" isExternal="false"
            propertyName="name" selectOnly="false" type="java.lang.String">
          master&gt;name
        </column>
        <column alias="com.lcs.wc.material.LCSMaterialColor"
            heading="elastic" isExternal="false"
            propertyName="num1" selectOnly="false" type="double">
          num1
        </column>
        <column alias="com.lcs.wc.material.LCSMaterialColor"
            heading="dyeCode" isExternal="false"
            propertyName="num8" selectOnly="false" type="double">
          num8
        </column>
        <column alias="com.lcs.wc.material.LCSMaterialColor"
            heading="matColor" isExternal="false"
            propertyName="persistInfo.objectIdentifier.id"
            selectOnly="false" type="long">
          thePersistInfo.theObjectIdentifier.id
        </column>
        <function heading="com.lcs.wc.material.LCSMaterial Att1"
            name="CONCAT" type="java.lang.String">
          <column alias="Dye Code Material"
              heading="Dye Code Material Att1 1"
              propertyName="att1" type="java.lang.String">att1</column>
          <column alias="Elastic Material"
              heading="Elastic Material Att1 1"
              propertyName="att1" type="java.lang.String">att1</column>
        </function>
        <object alias="Dye Code Material"
            heading="Dye Code Material" propertyName=""/>
        <column alias="Dye Code Material"
            heading="Dye Code Material Att1" propertyName="att1" type="java.lang.String">att1</column>
        <object alias="Elastic Material"
            heading="Elastic Material" propertyName=""/>
        <column alias="Elastic Material"
            heading="Elastic Material Att1" propertyName="att1" type="java.lang.String">att1</column>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Color Dimension.Persist Info.Object Identifier.Id" propertyName="colorDimension.persistInfo.objectIdentifier.id">
          <property name="colorDimension">
            <property name="persistInfo">
              <property name="objectIdentifier">
                <property name="id"/>
              </property>
            </property>
          </property>
        </object>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Color.Att1" propertyName="color.att1">
          <property name="color">
            <property name="att1"/>
          </property>
        </object>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Color.Name" propertyName="color.name">
          <property name="color">
            <property name="name"/>
          </property>
        </object>
        <column alias="com.lcs.wc.product.LCSSKU"
            heading="master>thePersistInfo.theObjectIdentifier.id" type="long">master&gt;thePersistInfo.theObjectIdentifier.id</column>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Material Color.Num1" propertyName="materialColor.num1">
          <property name="materialColor">
            <property name="num1"/>
          </property>
        </object>
        <object alias="com.lcs.wc.flexbom.FlexBOMLink"
            heading="Material Color.Num8" propertyName="materialColor.num8">
          <property name="materialColor">
            <property name="num8"/>
          </property>
        </object>
        <column alias="com.lcs.wc.product.LCSSKU"
            heading="Sku ARev Id" propertyName="skuARevId" type="double">skuARevId</column>
      </select>
      <from>
        <table alias="com.lcs.wc.product.LCSProduct" isExternal="false">
          com.lcs.wc.product.LCSProduct
        </table>
        <table alias="com.lcs.wc.product.LCSSKU" isExternal="false">
          com.lcs.wc.product.LCSSKU
        </table>
        <table alias="com.lcs.wc.flexbom.FlexBOMLink" isExternal="false">
          com.lcs.wc.flexbom.FlexBOMLink
        </table>
        <table alias="com.lcs.wc.flexbom.FlexBOMPart" isExternal="false">
          com.lcs.wc.flexbom.FlexBOMPart
        </table>
        <table alias="com.lcs.wc.material.LCSMaterialColor" isExternal="false">
          com.lcs.wc.material.LCSMaterialColor
        </table>
        <table
            alias="com.lcs.wc.specification.FlexSpecToComponentLink" isExternal="false">
          com.lcs.wc.specification.FlexSpecToComponentLink
        </table>
        <table
            alias="com.lcs.wc.specification.FlexSpecification" isExternal="false">
          com.lcs.wc.specification.FlexSpecification
        </table>
        <table alias="com.lcs.wc.color.LCSColor" isExternal="false">
          com.lcs.wc.color.LCSColor
        </table>
        <table alias="Elastic Material" outerJoinAlias="com.lcs.wc.material.LCSMaterialColor">com.lcs.wc.material.LCSMaterial</table>
        <table alias="Dye Code Material" outerJoinAlias="com.lcs.wc.material.LCSMaterialColor">com.lcs.wc.material.LCSMaterial</table>
      </from>
      <where>
        <compositeCondition type="and">
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.product.LCSProduct"
                  heading="Latest Iteration"
                  isExternal="false"
                  propertyName="latestIteration"
                  selectOnly="false" type="boolean">
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
              <column
                  alias="com.lcs.wc.product.LCSProduct"
                  heading="Flex Type Id Path"
                  isExternal="false"
                  propertyName="flexTypeIdPath"
                  selectOnly="false" type="java.lang.String">
                flexTypeIdPath
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <constant heading="\20081\1984481"
                  isMacro="false" type="java.lang.String">
                \20081\1984481
              </constant>
            </operand>
          </condition>
          <condition>
            <operand>
              <column alias="com.lcs.wc.product.LCSSKU"
                  heading="Latest Iteration"
                  isExternal="false"
                  propertyName="latestIteration"
                  selectOnly="false" type="boolean">
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
              <column
                  alias="com.lcs.wc.product.LCSProduct"
                  heading="master>thePersistInfo.theObjectIdentifier.id"
                  isExternal="false" selectOnly="false" type="long">
                master&gt;thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMPart"
                  heading="Owner Master Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="ownerMasterReference.objectId.id"
                  selectOnly="false" type="long">
                ownerMasterReference.key.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMLink"
                  heading="Parent Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="parentReference.objectId.id"
                  selectOnly="false" type="long">
                parentReference.key.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMPart"
                  heading="master>thePersistInfo.theObjectIdentifier.id"
                  isExternal="false" selectOnly="false" type="long">
                master&gt;thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMPart"
                  heading="Latest Iteration"
                  isExternal="false"
                  propertyName="latestIteration"
                  selectOnly="false" type="boolean">
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
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMLink"
                  heading="Out Date" isExternal="false"
                  propertyName="outDate"
                  selectOnly="false" type="java.sql.Timestamp">
                outDate
              </column>
            </operand>
            <nullOperator type="isNull"/>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMLink"
                  heading="Dropped" isExternal="false"
                  propertyName="dropped"
                  selectOnly="false" type="boolean">
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
              <column
                  alias="com.lcs.wc.specification.FlexSpecToComponentLink"
                  heading="Component Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="componentReference.objectId.id"
                  selectOnly="false" type="long">
                componentReference.key.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMPart"
                  heading="master>thePersistInfo.theObjectIdentifier.id"
                  isExternal="false" selectOnly="false" type="long">
                master&gt;thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.specification.FlexSpecToComponentLink"
                  heading="Specification Master Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="specificationMasterReference.objectId.id"
                  selectOnly="false" type="long">
                specificationMasterReference.key.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.specification.FlexSpecification"
                  heading="master>thePersistInfo.theObjectIdentifier.id"
                  isExternal="false" selectOnly="false" type="long">
                master&gt;thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.specification.FlexSpecification"
                  heading="Latest Iteration"
                  isExternal="false"
                  propertyName="latestIteration"
                  selectOnly="false" type="boolean">
                iterationInfo.latest
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <constant heading="1" isMacro="false" type="java.lang.String">
                1
              </constant>
            </operand>
          </condition>
          <condition>
            <operand>
              <column alias="com.lcs.wc.color.LCSColor"
                  heading="Persist Info.Object Identifier.Id"
                  isExternal="false"
                  propertyName="persistInfo.objectIdentifier.id"
                  selectOnly="false" type="long">
                thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.material.LCSMaterialColor"
                  heading="Color Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="colorReference.objectId.id"
                  selectOnly="false" type="long">
                colorReference.key.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.product.LCSProduct"
                  heading="Persist Info.Object Identifier.Id"
                  isExternal="false"
                  propertyName="persistInfo.objectIdentifier.id"
                  selectOnly="false" type="long">
                thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <parameterTarget name="objectId"/>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.material.LCSMaterialColor"
                  heading="Num8" propertyName="num8" type="double">num8</column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column alias="Dye Code Material"
                  heading="Branch Identifier"
                  propertyName="branchIdentifier" type="long">iterationInfo.branchId</column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.material.LCSMaterialColor"
                  heading="Num1" propertyName="num1" type="double">num1</column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column alias="Elastic Material"
                  heading="Branch Identifier"
                  propertyName="branchIdentifier" type="long">iterationInfo.branchId</column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMLink"
                  heading="Material Color Reference.Object Id.Id"
                  isExternal="false"
                  propertyName="materialColorReference.objectId.id"
                  selectOnly="false" type="long">
                materialColorReference.key.id
              </column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column
                  alias="com.lcs.wc.material.LCSMaterialColor"
                  heading="Persist Info.Object Identifier.Id"
                  isExternal="false"
                  propertyName="persistInfo.objectIdentifier.id"
                  selectOnly="false" type="long">
                thePersistInfo.theObjectIdentifier.id
              </column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column
                  alias="com.lcs.wc.flexbom.FlexBOMLink"
                  heading="Color Dimension Reference.Object Id.Id"
                  propertyName="colorDimensionReference.objectId.id" type="long">colorDimensionReference.key.id</column>
            </operand>
            <operator type="equal"/>
            <operand>
              <column alias="com.lcs.wc.product.LCSSKU"
                  heading="master>thePersistInfo.theObjectIdentifier.id" type="long">master&gt;thePersistInfo.theObjectIdentifier.id</column>
            </operand>
          </condition>
          <condition>
            <operand>
              <column alias="com.lcs.wc.product.LCSSKU"
                  heading="Sku ARev Id"
                  propertyName="skuARevId" type="double">skuARevId</column>
            </operand>
            <operator type="equal"/>
            <operand>
              <constant heading="0" isMacro="false"
                  type="java.lang.Object" xml:space="preserve">0</constant>
            </operand>
          </condition>
        </compositeCondition>
      </where>
      <orderBy>
        <orderByItem type="asc">
          <columnTarget heading="bPartMaster_bLinkBranchId"/>
        </orderByItem>
      </orderBy>
    </query>
  </statement>
</qml>
