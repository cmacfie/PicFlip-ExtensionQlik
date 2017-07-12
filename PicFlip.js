define( [
  "qlik",
  "jquery",
  "css!./css/style.css",
  "text!./layout.html",
  './js/properties',
  './js/functions'
], function (qlik, $, cssContent,  template, props, funcs) {
  'use strict'

  var isLocked;

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
      qlik.setLanguage('en');
      $element.isLocked = layout.props.isLocked;
      $element.isReversed = layout.props.isReversed;
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
        $element.find('.qv-extension-picflip-flip-container').unbind().on("mouseenter", function(event){
    			if(!$element.isLocked){ funcs.flipElement($element, event.type, this, layout);  }
      	})
      	$element.find('.qv-extension-picflip-flip-container').on("mouseleave", function(event){
          if(!$element.isLocked){ funcs.flipElement($element, event.type, this, layout); }
      	})
      });

      return qlik.Promise.resolve();
    },
  };
} );
