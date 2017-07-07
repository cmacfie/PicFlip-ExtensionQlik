define( [
  "qlik",
  "jquery",
  "css!./css/style.css",
  "text!./layout.html",
  './js/properties',
  './js/functions'
], function (qlik, $, cssContent,  template, props, funcs) {
  'use strict'

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
      this.$scope.useTitles = layout.props.useTitles;
      $( document ).ready(function() {
          funcs.setUpCss(layout);
      });

      $('.qv-extension-flipButton').unbind().click( function () {
        funcs.setFlipButton(layout);
      });

      $('.qv-extension-lockButton').unbind().click( function () {
        funcs.setLockButton(layout);
      });

      return qlik.Promise.resolve();
    },
  };
} );
