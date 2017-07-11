define( [], function () {
	'use strict';
	// *****************************************************************************
	// Dimensions & Measures
	// *****************************************************************************
	var dimensions = {
		uses: "dimensions",
		min: 0,
		max: 1
	};
	var measures = {
		uses: "measures",
		min: 0,
		max: 3
	};



	var useTitles = {
		type: "boolean",
		component: "switch",
		label: "Use Titles on Cardback",
		ref: "props.useTitles",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: true
	}

	var isLocked = {
			type:"boolean",
			ref:"props.isLocked",
			label: "Flip is locked",
			options: [{
				value: true,
				label: "Locked"
			}, {
				value: false,
				label: "Unlocked"
			}],
			defaultValue: false
	};

	var isReversed = {
			type:"boolean",
			ref:"props.isReversed",
			label: "Reversed",
			options: [{
				value: true,
				label: "Is Reversed"
			}, {
				value: false,
				label: "Not Reversed"
			}],
			defaultValue : false
	};

  var colorBackside = {
    		ref: "props.colorBackside",
    		label: "Color on Backside",
    		type: "string",
				defaultValue : "333333"
	};
	var colorFrontside = {
    		ref: "props.colorFrontside",
    		label: "Color on Frontside",
    		type: "string",
	};
	var colorMeasure1 = {
    		ref: "props.colorMeasure1",
    		label: "Color of Measure 1",
    		type: "string",
				defaultValue : "ffffff"
	};
	var colorMeasure2 = {
    		ref: "props.colorMeasure2",
    		label: "Color of Measure 2",
    		type: "string",
				defaultValue : "ffffff"
	};

	var colorMeasure3 = {
    		ref: "props.colorMeasure3",
    		label: "Color of Measure 3",
    		type: "string",
				defaultValue : "ffffff"
	};

	var fontsizeMeasure1 = {
    		ref: "props.fontsizeMeasure1",
    		label: "Textsize of Measure 1",
    		type: "string",
				defaultValue : ""
	};

	var fontsizeMeasure2 = {
    		ref: "props.fontsizeMeasure2",
    		label: "Textsize of Measure 2",
    		type: "string",
				defaultValue : ""
	};
	var fontsizeMeasure3 = {
				ref: "props.fontsizeMeasure3",
				label: "Textsize of Measure 3",
				type: "string",
				defaultValue : ""
	};

	var showFlipButtons = {
		type: "boolean",
		component: "switch",
		label: "Show Flip Buttons",
		ref: "props.showFlipButtons",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: true
	};

	var flipOrientation = {
		type: "string",
		component: "buttongroup",
		label: "Flip Orientation",
		ref: "props.flipOrientation",
		options: [{
			value: "v",
			label: "Vertical"
		}, {
			value: "h",
			label: "Horizontal"
		}],
		defaultValue: "h"
	};

	var flipSpeed = {
		type: "number",
		label: "Flip Speed (Fast -- Slow)",
		component: "slider",
		ref: "props.flipSpeed",
		min: 0,
		max: 5,
		step: 0.2,
		defaultValue: 0.6
	};

	var imageSize = {
		type: "number",
		component: "slider",
		label: "Images per row",
		ref: "props.imageSize",
		defaultValue: 4,
		min: 1,
		max: 10,
		step: 1.0,
	};

	var title = {
		type : "string",
		ref : "props.title",
		label:"Title"
	}

	var cropType = {
		type : "string",
		ref : "props.cropType",
		label : "Image Cropping",
		component : "dropdown",
		options: [{
			value: "cover",
			label: "Cover"
		}, {
			value: "contain",
			label: "Contain"
		}, {
			value: "stretch",
			label: "Stretch"
		}],
		defaultValue : "contain"
	};


	var textPlacement_vertically = {
		type: "string",
		component: "buttongroup",
		label: "Text Placement Vertically",
		ref: "props.textPlacement_vertically",
		options: [{
			value: "top",
			label: "Top"
		}, {
			value: "center",
			label: "Center"
		}, {
			value: "bottom",
			label: "Bottom"
		}],
		defaultValue: "top"
	};

	var textAlignment = {
		type: "string",
		component: "buttongroup",
		label: "Text Alignment",
		ref: "props.textAlignment",
		options: [{
			value: "L",
			label: "Left"
		}, {
			value: "C",
			label: "Center"
		}, {
			value: "R",
			label: "Right"
		}],
		defaultValue: "L"
	};

	var showCornerCircle = {
		type: "boolean",
		component: "switch",
		label: "Show Score in Corner",
		ref: "props.showCornerCircle",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: true
	}

	var useBoxShadow = {
		type: "boolean",
		component: "switch",
		label: "Circle Casts Shadow",
		ref: "props.useBoxShadow",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: true
	};

	var showImageOnBack = {
		type: "number",
		label: "Backside Image Opacity",
		component: "slider",
		ref: "props.backsideOpacity",
		min: 0,
		max: 1,
		step: 0.05,
		defaultValue: 0.25
	};

	var cornerCircleColor = {
		ref: "props.cornerCircleColor",
		label: "Color of Corner Circle",
		type: "string",
		defaultValue : "ffffff"
	};



	// *****************************************************************************
	// Appearance section
	// *****************************************************************************
	var appearanceSection = {
		uses: "settings",
    items: {
			title : title,
			imageCardColors: {
        type: "items",
        label: "Color Settings",
        items: {
          colorFrontside : colorFrontside,
					colorBackside : colorBackside,
					colorMeasure1 : colorMeasure1,
					colorMeasure2 : colorMeasure2,
					colorMeasure3 : colorMeasure3
        }
      }, imageCardText: {
        type: "items",
        label: "Text Settings",
        items: {
					useTitles : useTitles,
					textPlacement_vertically : textPlacement_vertically,
					textAlignment : textAlignment,
					fontsizeMeasure1 : fontsizeMeasure1,
					fontsizeMeasure2 : fontsizeMeasure2,
					fontsizeMeasure3 : fontsizeMeasure3
        }
			}, ImageFlip : {
				type:"items",
				label: "Image Customizaiton",
				items : {
					showFlipButtons : showFlipButtons,
					isReversed : isReversed,
					isLocked : isLocked,
					flipOrientation : flipOrientation,
					flipSpeed : flipSpeed,
					imageSize : imageSize,
					cropType : cropType,
					showImageOnBack : showImageOnBack,
					cornerCircleColor : cornerCircleColor,
					showCornerCircle : showCornerCircle,
					useBoxShadow : useBoxShadow
				}
      }
		}
	};


	// *****************************************************************************
	// Main properties panel definition
	// Only what is defined here is returned from properties.js
	// *****************************************************************************
	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures,
			appearance: appearanceSection,
			sorting : { uses : "sorting" }
		}
	};
});
