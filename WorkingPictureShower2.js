define( [
  "qlik",
  "jquery",
  "css!./style.css",
  "text!./layout.html",
  './properties'
], function (qlik, $, cssContent,  template, props) {
  'use strict'
  var isReversed = false;
  var isLocked = false;
  var currentCss;
  var path ="/extensions/WorkingPictureShower2/";

	return {
    template: template,
		definition : props,
		support : {
			export: true,
			exportData : true
		},
    initialProperties : {
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 10,
					qHeight : 50
				}]
			}
		},
    paint: function ($element, layout) {
      this.$scope.qlik=qlik;
      if ( !this.$scope.table ) {
        this.$scope.table = qlik.table( this );
      }
      var numMeasures =  this.$scope.layout.qHyperCube.qMeasureInfo.length;
      $( document ).ready(function() {
        var font_h3 = (0.65 + 1/numMeasures)*layout.props.imageSize/10*0.5;
        var font_h2 = (0.65 + 1/numMeasures)*layout.props.imageSize/10;
        console.log("h2 :", font_h2);
        console.log("h3 :", font_h3);
        if(layout.props.fontsizeMeasure1 != 0){
          $(".measure1_title").css("font-size", layout.props.fontsizeMeasure1*0.5);
          $(".measure1").css("font-size", layout.props.fontsizeMeasure1*1);
        } else {
          $(".measure1_title").css("font-size", font_h3);
          $(".measure1").css("font-size", font_h2);
        }
        if(layout.props.fontsizeMeasure2 != 0){
          $(".measure2_title").css("font-size", layout.props.fontsizeMeasure2*0.5);
          $(".measure2").css("font-size", layout.props.fontsizeMeasure2*1);
        } else {
          $(".measure2_title").css("font-size", font_h3);
          $(".measure2").css("font-size", font_h2);
        }
        if(layout.props.fontsizeMeasure3 != 0){
          $(".measure3_title").css("font-size", layout.props.fontsizeMeasure3*0.5);
          $(".measure3").css("font-size", layout.props.fontsizeMeasure3*1);
        } else {
          $(".measure3_title").css("font-size", font_h3);
          $(".measure3").css("font-size", font_h2);
        }
        if(layout.props.colorMeasure1.length != 0){
          $(".measure1").css("color", layout.props.colorMeasure1);
          $(".measure1_title").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure1, 0.15)));
        }
        if(layout.props.colorMeasure2 != 0){
          $(".measure2").css("color", layout.props.colorMeasure2);
          $(".measure2_title").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure2, 0.15)));
        }
        if(layout.props.colorMeasure3 != 0){
          $(".measure3").css("color", layout.props.colorMeasure3);
          $(".measure3_title").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure3, 0.15)));
        }
        setUpCss();
      });


      function calculateLighterVersion(color, percent){
          if(color.length == 3){
            var i = 1;
            while(color.length < 7){
              color += color[i];
              i++;
                console.log(color);
            }
          } else if(color.length == 7){
            var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
            return ((0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1));
          } else {
            return color;
          }
      }
      function removeFlip() {
        $('#flipFunction_horizontal').remove();
        $('#flipFunction_vertical').remove();
        $('#flipFunction_reversed_vertical').remove();
        $('#flipFunction_reversed_horizontal').remove();
      }
      function addFlip(){
        removeFlip();
        if(layout.props.flipOrientation == "h" && !isReversed){
          $('<link rel="stylesheet" id="flipFunction_horizontal" type="text/css" href="' + path + 'flipFunction_horizontal.css">').appendTo("head");
        } else if(layout.props.flipOrientation == 'v' && !isReversed){
          $('<link rel="stylesheet" id="flipFunction_vertical" type="text/css" href="' + path + 'flipFunction_vertical.css">').appendTo("head");
        } else if(layout.props.flipOrientation =='v' && isReversed){
          $('<link rel="stylesheet" id="flipFunction_reversed_vertical" type="text/css" href="' + path + 'flipFunction_reversed_vertical.css">').appendTo("head");
        } else {
          $('<link rel="stylesheet" id="flipFunction_reversed_horizontal" type="text/css" href="' + path + 'flipFunction_reversed_horizontal.css">').appendTo("head");
        }
      }
      function removeCss(){
        $('#verticalCss').remove();
        $('#horizontalCss').remove();
        $('#verticalCss_reversed').remove();
        $('#horizontalCss_reversed').remove();
      }
      function setUpCss(){
        removeCss();
        $('.titleHolder').css("width", $('.container').width() - $('.buttonHolder').width());
        $('.flipper').css("transition", layout.props.flipSpeed + "s");
        $('.front').css({"transition": layout.props.flipSpeed + "s", "width": layout.props.imageSize, "height": layout.props.imageSize});
        $('.back').css({"transition": layout.props.flipSpeed + "s", "width": layout.props.imageSize, "height": layout.props.imageSize});
        $('.li-extension').css({"width": layout.props.imageSize, "height": layout.props.imageSize});
        $('.flip-container').css({"width": layout.props.imageSize, "height": layout.props.imageSize});
        if(layout.props.cropType == 'cover'){
          $('.image-display').css({"object-fit": "cover"});
        } else if(layout.props.cropType == 'contain') {
          $('.image-display').css({"object-fit": "contain"});
        } else {
            $('.image-display').css({"object-fit": "fill"});
        }

        if(!layout.props.showFlipButtons) {
          $('.buttonRow').css("display", "none");
        } else {
          $('.container').css("height", "100%");
          $('.container').css("height", $('.container').height()-60);
          $('.buttonRow').css("display", "block"); }
        if(layout.props.flipOrientation == "h"){
          if(isReversed){
            currentCss = "fh_r";
            $('<link rel="stylesheet" id="horizontalCss_reversed" type="text/css" href="' + path + 'flipHorizontal_reversed.css">').appendTo("head");
          } else {
            currentCss = "fh";
            $('<link rel="stylesheet" id="horizontalCss" type="text/css" href="' + path + 'flipHorizontal.css">').appendTo("head");
          }
        } else {
          if(isReversed){
            currentCss = "fv_r";
            $('<link rel="stylesheet" id="verticalCss_reversed" type="text/css" href="' + path + 'flipVertical_reversed.css">').appendTo("head");
          } else {
            currentCss = "fv";
            $('<link rel="stylesheet" id="verticalCss" type="text/css" href="' + path + 'flipVertical.css">').appendTo("head");
          }
        }
        if(!isLocked){
          addFlip();
        }
      }
      $('#flipButton').unbind().click( function () {
        if(!isLocked){
          isReversed = !isReversed;
          setUpCss();
        }
      });
      $('#lockButton').unbind().click( function () {
        isLocked = !isLocked;
        if(isLocked){
          $("#lockButton_img").attr("src", path + "lock_white.png");
          console.log("Now: isLocked = true");
          $("#lockButton").css("background-color", "#da5555");
          $("#flipButton").css({"background-color": "#ccc"});
          removeFlip();
        } else {
          $("#lockButton_img").attr("src", path + "lock_red.png");
          console.log("Now: isLocked = false");
          $("#lockButton").css("background-color", "");
          $("#flipButton").css({"background-color": "#BADA55"});
          addFlip();
        }
      });

      return qlik.Promise.resolve();
    },
  };
} );
