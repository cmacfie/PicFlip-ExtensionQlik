define( [], function(layout) {
	'use strict';


  var isReversed = false;
  var isLocked = false;
  var currentCss;
  var path ="/extensions/PicFlip";

  function setTextCss(layout) {
    var numMeasures =  layout.qHyperCube.qMeasureInfo.length;
    var font_h3 = Math.round((0.65 + 1/numMeasures)*layout.props.imageSize/10*0.5);
    var font_h2 = Math.round((0.65 + 1/numMeasures)*layout.props.imageSize/10);
    if(layout.props.fontsizeMeasure1 != ""){
      $('.measure1 h3').css("font-size", layout.props.fontsizeMeasure1*0.5);
      $(".measure1 h2").css("font-size", layout.props.fontsizeMeasure1*1);
    } else {
      $('.measure1 h3').css({"font-size": font_h3});
      $(".measure1 h2").css({"font-size": font_h2});
    }
    if(layout.props.fontsizeMeasure2 != ""){
      $(".measure2 h3").css("font-size", layout.props.fontsizeMeasure2*0.5);
      $(".measure2 h2").css("font-size", layout.props.fontsizeMeasure2*1);
    } else {
      $(".measure2 h3").css("font-size", font_h3);
      $(".measure2 h2").css("font-size", font_h2);
    }
    if(layout.props.fontsizeMeasure3 != ""){
      $(".measure3 h3").css("font-size", layout.props.fontsizeMeasure3*0.5);
      $(".measure3 h2").css("font-size", layout.props.fontsizeMeasure3*1);
    } else {
      $(".measure3 h3").css("font-size", font_h3);
      $(".measure3 h2").css("font-size", font_h2);
    }
    if(layout.props.colorMeasure1.length != 0){
      $(".measure1 h2").css("color", "#"+layout.props.colorMeasure1);
      $(".measure1 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure1, 0.15)));
    }
    if(layout.props.colorMeasure2 != 0){
      $(".measure2 h2").css("color", "#" + layout.props.colorMeasure2);
      $(".measure2 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure2, 0.15)));
    }
    if(layout.props.colorMeasure3 != 0){
      $(".measure3 h2").css("color", "#" + layout.props.colorMeasure3);
      $(".measure3 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure3, 0.15)));
    }
  }

  function setUpCss(layout){
    removeCss();
    setTextCss(layout);
    setOtherCssWithProperties(layout);
    alignImages(layout);
    setFlipOrientation(layout);
    if(!isLocked){
      $(".qv-extension-picflip-flipButton").css({"background-color": "#BADA55"});
      addFlip(layout);
    }
  }

  function setFlipButton(layout){
    if(!isLocked){
      isReversed = !isReversed;
      setUpCss(layout);
    }
  }

  function setLockButton(layout){
    isLocked = !isLocked;
    if(isLocked){
      $(".qv-extension-picflip-lockButton").css("background-color", "#da5555");
      $(".qv-extension-picflip-flipButton").css({"background-color": "#ccc"});
      removeFlip();
    } else {
      $(".qv-extension-picflip-lockButton").css("background-color", "");
      $(".qv-extension-picflip-flipButton").css({"background-color": "#BADA55"});
      addFlip(layout);
    }
  }

  function calculateLighterVersion(color, percent){
    if(color.length == 3){
      var i = 1;
      while(color.length < 7){
        color += color[i];
        i++;
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
  function addFlip(layout){
    removeFlip();
    if(layout.props.flipOrientation == "h" && !isReversed){
      $('<link rel="stylesheet" id="flipFunction_horizontal" type="text/css" href="' + path + '/css/flipFunction_horizontal.css">').appendTo("head");
    } else if(layout.props.flipOrientation == 'v' && !isReversed){
      $('<link rel="stylesheet" id="flipFunction_vertical" type="text/css" href="' + path + '/css/flipFunction_vertical.css">').appendTo("head");
    } else if(layout.props.flipOrientation =='v' && isReversed){
      $('<link rel="stylesheet" id="flipFunction_reversed_vertical" type="text/css" href="' + path + '/css/flipFunction_reversed_vertical.css">').appendTo("head");
    } else {
      $('<link rel="stylesheet" id="flipFunction_reversed_horizontal" type="text/css" href="' + path + '/css/flipFunction_reversed_horizontal.css">').appendTo("head");
    }
  }
  function removeCss(){
    $('#verticalCss').remove();
    $('#horizontalCss').remove();
    $('#verticalCss_reversed').remove();
    $('#horizontalCss_reversed').remove();
    $('.qv-extension-picflip-back-title').removeClass('align-top');
    $('.qv-extension-picflip-back-title').removeClass('align-center');
    $('.qv-extension-picflip-back-title').removeClass('align-bottom');
  }

  function alignImages(layout) {
    var verticalAlign = layout.props.textPlacement_vertically;
    $('.qv-extension-picflip-back-title h2, h3').css("padding", "0");
    if(verticalAlign == "top"){
      $('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "0%",
        "transform": "translate(-50%, 0%)"
      });
    } else if (verticalAlign == "center"){
      $('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "50%",
        "transform": "translate(-50%, -50%)"
      });
    } else if (verticalAlign == "bottom"){
      $('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "100%",
        "transform": "translate(-50%, -100%)"
      });
    }
    var textAlignment = layout.props.textAlignment;
    if(textAlignment == "L"){
      $('.qv-extension-picflip-back-title').css({"text-align":"left"});
      $('.qv-extension-picflip-back-title h2, h3').css("padding-left", "5px");
    } else if(textAlignment == "C"){
      $('.qv-extension-picflip-back-title').css({"text-align":"center"});
    } else {
      $('.qv-extension-picflip-back-title').css({"text-align":"right"});
      $('.qv-extension-picflip-back-title h2, h3').css("padding-right", "5px");
    }
  }

  function setFlipOrientation(layout){
    if(layout.props.flipOrientation == "h"){
      if(isReversed){
        currentCss = "fh_r";
        $('<link rel="stylesheet" id="horizontalCss_reversed" type="text/css" href="' + path + '/css/flipHorizontal_reversed.css">').appendTo("head");
      } else {
        currentCss = "fh";
        $('<link rel="stylesheet" id="horizontalCss" type="text/css" href="' + path + '/css/flipHorizontal.css">').appendTo("head");
      }
    } else {
      if(isReversed){
        currentCss = "fv_r";
        $('<link rel="stylesheet" id="verticalCss_reversed" type="text/css" href="' + path + '/css/flipVertical_reversed.css">').appendTo("head");
      } else {
        currentCss = "fv";
        $('<link rel="stylesheet" id="verticalCss" type="text/css" href="' + path + '/css/flipVertical.css">').appendTo("head");
      }
    }
  }

function setOtherCssWithProperties(layout){
  $('.qv-extension-picflip-titleHolder').css("width", $('.container').width() - $('.qv-extension-picflip-buttonHolder').width());
  $('.qv-extension-picflip-flipper').css("transition", layout.props.flipSpeed + "s");
  $('.qv-extension-picflip-front').css({"transition": layout.props.flipSpeed + "s", "width": layout.props.imageSize, "height": layout.props.imageSize});
  $('.qv-extension-picflip-back').css({"transition": layout.props.flipSpeed + "s", "width": layout.props.imageSize, "height": layout.props.imageSize});
  $('.qv-extension-picflip-li').css({"width": layout.props.imageSize, "height": layout.props.imageSize});
  $('.qv-extension-picflip-flip-container').css({"width": layout.props.imageSize, "height": layout.props.imageSize});
  $('.qv-extension-picflip-back-display').css({"opacity": layout.props.backsideOpacity});

  /** Corner circle*/
  $('.qv-extension-picflip-corner-circle').css({"color": layout.props.cornerCircleColor, "display": "block", "border": "3px dotted " + layout.props.cornerCircleColor});
  if(!layout.props.showCornerCircle){
    $('.qv-extension-picflip-corner-circle').css({"display": "none"});
  }
  if(layout.props.useBoxShadow){
    $('.qv-extension-picflip-corner-circle').css({"box-shadow": "3px 3px 3px rgba(0,0,0,0.3)"});
  } else {
    $('.qv-extension-picflip-corner-circle').css({"box-shadow": ""});
  }

  /**Cropping */
  if(layout.props.cropType == 'cover'){
    $('.qv-extension-picflip-image-display').css({"object-fit": "cover"});
  } else if(layout.props.cropType == 'contain') {
    $('.qv-extension-picflip-image-display').css({"object-fit": "contain"});
  } else {
      $('.qv-extension-picflip-image-display').css({"object-fit": "fill"});
  }

  /** Flipbuttons and Title */
  if(!layout.props.showFlipButtons) {
    $('.qv-extension-picflip-buttonRow').css("display", "none");
  } else {
    $('.container').css("height", "100%");
    $('.container').css("height", $('.container').height()-60);
    $('.qv-extension-picflip-buttonRow').css("display", "block");
  }
}

  return {
    setUpCss : setUpCss,
    setFlipButton : setFlipButton,
    setLockButton : setLockButton

  }

});
