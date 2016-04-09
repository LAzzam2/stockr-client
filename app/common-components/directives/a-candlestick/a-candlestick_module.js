'use strict';

( function(  )
{
	var aCandlestick = angular.module( 'aCandlestick', [
		'candlestickFactory',
		'listFactory'
	] );
	aCandlestick.directive( 'aCandlestick', function(  )
	{
		return {

			restrict: 'E',
			scope:
			{
				candlestick: '='
			},
			controller: 'ACandlestickController',
			templateUrl: 'common-components/directives/a-candlestick/a-candlestick_template.html'

		};
	} );

} )(  );
