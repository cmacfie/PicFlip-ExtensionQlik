define( [
  "qlik",
  "jquery",
  "css!./css/style.css",
  "text!./layout.html",
  './js/properties',
  './js/functions'
], function (qlik, $, cssContent,  template, props, funcs) {
  'use strict'
  var myElement;

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
      this.$scope.id = layout.qInfo.qId;
      this.$scope.myElement = $element;
      this.$scope.layout1 = layout;
      console.log(this);
      this.$scope.qlik=qlik;
      if ( !this.$scope.table ) {
        this.$scope.table = qlik.table( this );
      }
      this.$scope.useTitles = layout.props.useTitles;
      $( document ).ready(function() {
          funcs.setUpCss($element, layout);

      $element.find('.qv-extension-picflip-flipButton').unbind().click( function () {
        funcs.setFlipButton($element, layout);
      });

      $element.find('.qv-extension-picflip-lockButton').unbind().click( function () {
        funcs.setLockButton($element, layout);
      });
    	var frameHolder = $('.qv-extension-picflip-flip-container');
      var hey = "hey";
      $element.find('.qv-extension-picflip-flip-container').unbind().on("mouseenter", function(event){
  			funcs.flipElement(event, this, layout);
    	})
    	$element.find('.qv-extension-picflip-flip-container').on("mouseleave", function(event){
          funcs.flipElement(event, this, layout);
    	})

/*
      console.log("Element ",$element);
      $element.find('.qv-extension-picflip-flip-container').mouseover( function () {
        $element.find('.qv-extension-picflip-flip-container .qv-extension-picflip-back').css("transform", "rotateY(0deg)");
        $element.find('.qv-extension-picflip-flip-container .qv-extension-picflip-front').css("transform", "rotateY(180deg)");
      });

      $element.find('.qv-extension-picflip-flip-container').mouseleave( function () {
        $element.find('.qv-extension-picflip-flip-container .qv-extension-picflip-back').css("transform", "rotateY(180deg)");
        $element.find('.qv-extension-picflip-flip-container .qv-extension-picflip-front').css("transform", "rotateY(0deg)");
      });
*/
      });
      return qlik.Promise.resolve();
    },
  };
} );
