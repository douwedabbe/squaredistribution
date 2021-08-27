/*
<action jsname="action_GemDistCircular" description="Treasure Circ. Dist.">
	<property name="iRadius" type="int" default="1000"  />
	<property name="mCentrNode" type="scenenode" />
	<property name="fLibrary" type="scenenode" />
	<property name="fTreasure" type="scenenode" />
	<property name="sMannaData" type="string" default="GDLG" />
	<property name="iMannaHeight" type="int" default="15"  />
</action>
*/


action_GemDistCircular = function() {
//	version name: v1 GemDistCircular.
//	origin		: Douwe Dabbe.
//	task		: distibute gems circular over a terrain from mCentrNode at max iRadius.
//	performance	: 
//	issues		: may slow down the windows test app.
//	inputs:
//	iRadius			= max goody distance from center.
//	mCentrNode		= center of circular distribution.
//	fLibrary		= goody Billboard types grouped in folderNode that will be Clone-ed for use.
//	fTreasure		= created bGemNodes Parented to this Folder for use.
//	sMannaData		= string of arbitrary length, out of Capital Letters coding for goody type.
//	iMannaHeight	= height lift billboard off ground.
//	outputs:
	"use strict";
};

//	more substantial test data:	
//	var sMannaData ="DLLGGLGLLGGLLLLLGGLDLGDDLDLLLGLLLLLLDDLDLLLGGGGGLDGLDLGGDLLDLGGGGGLDGGLLLLLLLGDGDGGGGGG";

action_GemDistCircular.prototype.execute = function(currentNode) {

	// transfer inputs to local vars for performance sake	
	var iRadius = this.iRadius;
	var fLibrary = this.fLibrary;
	var fTreasure = this.fTreasure;
	var vCentrPos = ccbGetSceneNodeProperty(this.mCentrNode, "Position"); 
	var iGemTypeCount = ccbGetSceneNodeChildCount(this.fLibrary);	
	var iMannaHeight = this.iMannaHeight;
	var sMannaStg = this.sMannaData;
	
	let rRingAngle = 0;
	let rRingRad = 0;
	var bChildNode, bGemNode, bGunNode, bDollarNode, bLiqNode;
	var vGemPos = new vector3d(0,0,0);

	for (let i = 0; i < iGemTypeCount; ++i) {
		bChildNode = ccbGetChildSceneNode(fLibrary, i);
		if (ccbGetSceneNodeProperty(bChildNode, "Name") === "Gun-0") bGunNode = ccbCloneSceneNode(bChildNode);
		if (ccbGetSceneNodeProperty(bChildNode, "Name") === "Dollar-0") bDollarNode = ccbCloneSceneNode(bChildNode);
		if (ccbGetSceneNodeProperty(bChildNode, "Name") === "Liquor-0") bLiqNode = ccbCloneSceneNode(bChildNode);
	}

	//	distribute MannaData
	vGemPos.y = iMannaHeight;	
	for (let m = 0; m < sMannaStg.length; ++m) {	
		rRingAngle = 360 * Math.random();
		rRingRad = Math.random() * iRadius;
		vGemPos.x = vCentrPos.x + rRingRad*Math.cos(rRingAngle);
		vGemPos.z = vCentrPos.z + rRingRad*Math.sin(rRingAngle);
		if ( sMannaStg[m] === "G" ) bGemNode = ccbCloneSceneNode(bGunNode);
		if ( sMannaStg[m] === "D" ) bGemNode = ccbCloneSceneNode(bDollarNode);
		if ( sMannaStg[m] === "L" ) bGemNode = ccbCloneSceneNode(bLiqNode);
		ccbSetSceneNodeProperty(bGemNode, "Visible", true);
		ccbSetSceneNodeProperty(bGemNode, "Position", vGemPos);
		ccbSetSceneNodeParent(bGemNode, fTreasure)
	}
}
//	end