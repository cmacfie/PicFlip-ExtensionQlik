define( ["jquery"], function($) {
	'use strict';

  var path ="/extensions/PicFlip";

  function setTextCss($element, layout) {
    var numMeasures =  layout.qHyperCube.qMeasureInfo.length;
		var imageSize = $element.find('.qv-extension-picflip-li').css("width");
    var font_h3 = Math.round((0.65 + 1/numMeasures)*imageSize.slice(0, imageSize.length-2)/10*0.5);
    var font_h2 = Math.round((0.65 + 1/numMeasures)*imageSize.slice(0, imageSize.length-2)/10);
		console.log("h2", font_h2);
    if(layout.props.fontsizeMeasure1 != ""){
      $element.find('.measure1 h3').css("font-size", layout.props.fontsizeMeasure1*0.5);
      $element.find(".measure1 h2").css("font-size", layout.props.fontsizeMeasure1*1);
    } else {
      $element.find('.measure1 h3').css({"font-size": font_h3});
      $element.find(".measure1 h2").css({"font-size": font_h2});
    }
    if(layout.props.fontsizeMeasure2 != ""){
      $element.find(".measure2 h3").css("font-size", layout.props.fontsizeMeasure2*0.5);
      $element.find(".measure2 h2").css("font-size", layout.props.fontsizeMeasure2*1);
    } else {
      $element.find(".measure2 h3").css("font-size", font_h3);
      $element.find(".measure2 h2").css("font-size", font_h2);
    }
    if(layout.props.fontsizeMeasure3 != ""){
      $element.find(".measure3 h3").css("font-size", layout.props.fontsizeMeasure3*0.5);
      $element.find(".measure3 h2").css("font-size", layout.props.fontsizeMeasure3*1);
    } else {
      $element.find(".measure3 h3").css("font-size", font_h3);
      $element.find(".measure3 h2").css("font-size", font_h2);
    }
    if(layout.props.colorMeasure1.length != 0){
      $element.find(".measure1 h2").css("color", "#"+layout.props.colorMeasure1);
      $element.find(".measure1 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure1, 0.15)));
    }
    if(layout.props.colorMeasure2 != 0){
      $element.find(".measure2 h2").css("color", "#" + layout.props.colorMeasure2);
      $element.find(".measure2 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure2, 0.15)));
    }
    if(layout.props.colorMeasure3 != 0){
      $element.find(".measure3 h2").css("color", "#" + layout.props.colorMeasure3);
      $element.find(".measure3 h3").css("color", ("#"+calculateLighterVersion(layout.props.colorMeasure3, 0.15)));
    }
  }



	function flipElement(eventType, element, layout){
		if(!layout.props.isLocked){
				var orientation = (layout.props.flipOrientation == "h" ? 'X' : 'Y');
				var newFrontRotation;
				var newBackRotation;
				if(layout.props.isReversed ^ orientation == 'h'){
					//Reverse Horizontal (STANDARD : FUNCTION)
						newFrontRotation = (eventType == 'mouseleave' ? 180 : 360);
						newBackRotation = (eventType == 'mouseleave' ? 0 : 180);
				} else{
						newFrontRotation = (eventType == 'mouseleave' ? 0 : 180);
						newBackRotation = (eventType == 'mouseleave' ? -180 : 0);
				}
				 $(element).find('.qv-extension-picflip-front').css("transform", "rotate" + orientation + "(" + newFrontRotation + "deg)");
				 $(element).find('.qv-extension-picflip-back').css("transform", "rotate" + orientation + "(" + newBackRotation + "deg)");
				}
		}

  function setUpCss($element, layout){
		console.log(layout);
		console.log($element);
    removeCss($element, layout);
    setOtherCssWithProperties($element, layout);
		setTextCss($element, layout);
    alignImages($element, layout);
		flipElement('mouseleave', $element.find('.qv-extension-picflip-flip-container'), layout);
  }

  function setFlipButton($element, layout){
    if(!layout.props.isLocked){
      layout.props.isReversed = !(layout.props.isReversed);
      setUpCss($element, layout);
    }
  }

  function setLockButton($element, layout){
    layout.props.isLocked = !(layout.props.isLocked);
    if(layout.props.isLocked){
			$element.find('.qv-extension-picflip-lockButton').css("background-color", "#da5555");
      $element.find('.qv-extension-picflip-flipButton').css({"background-color": "#ccc"});
    } else {
      $element.find('.qv-extension-picflip-lockButton').css("background-color", "");
      $element.find('.qv-extension-picflip-flipButton').css({"background-color": "#BADA55"});

    }
		setUpCss($element, layout);
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
  function removeCss($element, layout){
    $('.qv-extension-picflip-back-title').removeClass('align-top');
    $('.qv-extension-picflip-back-title').removeClass('align-center');
    $('.qv-extension-picflip-back-title').removeClass('align-bottom');
  }

  function alignImages($element, layout) {
    var verticalAlign = layout.props.textPlacement_vertically;
    $element.find('.qv-extension-picflip-back-title h2, h3').css("padding", "0");
    if(verticalAlign == "top"){
      $element.find('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "0%",
        "transform": "translate(-50%, 0%)"
      });
    } else if (verticalAlign == "center"){
      $element.find('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "50%",
        "transform": "translate(-50%, -50%)"
      });
    } else if (verticalAlign == "bottom"){
      $element.find('.qv-extension-picflip-back-title').css({
        "position": "absolute",
        "left": "50%", "top": "100%",
        "transform": "translate(-50%, -100%)"
      });
    }
    var textAlignment = layout.props.textAlignment;
    if(textAlignment == "L"){
      $element.find('.qv-extension-picflip-back-title').css({"text-align":"left"});
      $element.find('.qv-extension-picflip-back-title h2, h3').css("padding-left", "5px");
    } else if(textAlignment == "C"){
      $element.find('.qv-extension-picflip-back-title').css({"text-align":"center"});
    } else {
      $element.find('.qv-extension-picflip-back-title').css({"text-align":"right"});
      $element.find('.qv-extension-picflip-back-title h2, h3').css("padding-right", "5px");
    }
  }

function setOtherCssWithProperties($element, layout){
	var containerWidth = $element.find('.qv-extension-picflip-flip-mainContainer').width();
	var padding  = $('.qv-extension-picflip-li').css("padding-top").slice(0,1)*2+1;
	var size = (containerWidth/(layout.props.imageSize)) - padding;
  $element.find('.qv-extension-picflip-titleHolder').css("width", $element.find('.qv-extension-picflip-flip-mainContainer').width() - $element.find('.qv-extension-picflip-buttonHolder').width());
  $element.find('.qv-extension-picflip-front').css({"transition": 0 + "s", "width": size, "height": size});
  $element.find('.qv-extension-picflip-back').css({"transition": 0 + "s", "width": size, "height": size});
	$element.find('.qv-extension-picflip-li').css({"width":size, "height": size});
	$element.find('.qv-extension-picflip-flip-container').css({"width": size, "height":size});
	setTimeout(function(){ //Resize 0 sec, then set flip speed
		 $element.find('.qv-extension-picflip-front').css({"transition": layout.props.flipSpeed + "s"});
     $element.find('.qv-extension-picflip-back').css({"transition": layout.props.flipSpeed + "s"});
  }, 5);
  $element.find('.qv-extension-picflip-back-display').css({"opacity": layout.props.backsideOpacity});


  /** Corner circle*/
	if(layout.props.showCornerCircle){
		var temp = $element.find('.qv-extension-picflip-li').css("width");
		var size = temp.slice(0, temp.length-2);
		console.log("size", size);
		$element.find('.qv-extension-picflip-corner-circle').css({
			"color": layout.props.cornerCircleColor,
			"display": "block",
			"border": "3px dotted " + layout.props.cornerCircleColor,
			"width": size * 0.15,
			"height": size * 0.15,
			"border-radius": size * 0.15 + 10,
			"font-size" : size*0.15 - 10,
			"border" : Math.round(size/100 + 1) + "px solid #fff",
		});
  } else {
	    $element.find('.qv-extension-picflip-corner-circle').css({"display": "none"});
	}
  if(layout.props.useBoxShadow){
    $element.find('.qv-extension-picflip-corner-circle').css({"box-shadow": "3px 3px 3px rgba(0,0,0,0.3)"});
  } else {
    $element.find('.qv-extension-picflip-corner-circle').css({"box-shadow": ""});
  }

  /**Cropping */
  if(layout.props.cropType == 'cover'){
    $element.find('.qv-extension-picflip-image-display').css({"object-fit": "cover"});
  } else if(layout.props.cropType == 'contain') {
    $element.find('.qv-extension-picflip-image-display').css({"object-fit": "contain"});
  } else {
      $element.find('.qv-extension-picflip-image-display').css({"object-fit": "fill"});
  }

  /** Flipbuttons and Title */
  if(!layout.props.showFlipButtons) {
    $element.find('.qv-extension-picflip-buttonRow').css("display", "none");
  } else {
    $element.find('.qv-extension-picflip-flip-mainContainer').css("height", "100%");
    $element.find('.qv-extension-picflip-flip-mainContainer').css("height", $element.find('.qv-extension-picflip-flip-mainContainer').height()-60);
    $element.find('.qv-extension-picflip-buttonRow').css("display", "block");
		if(!layout.props.isLocked){
				$element.find(".qv-extension-picflip-flipButton").css({"background-color": "#BADA55"});
				$element.find(".qv-extension-picflip-lockButton").css({"background-color": ""});
		} else {
				$element.find(".qv-extension-picflip-flipButton").css({"background-color": ""});
				$element.find(".qv-extension-picflip-lockButton").css({"background-color": "#da5555"});
		}
  }
}

  return {
    setUpCss : setUpCss,
    setFlipButton : setFlipButton,
    setLockButton : setLockButton,
		flipElement : flipElement
  }

});
