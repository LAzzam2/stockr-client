'use strict';

( function(  )
{
	var candlestickFactory = angular.module( 'candlestickFactory', [ ] );

	candlestickFactory.factory( 'candlestickFactory', function( $http, $q, $state, appConstants )
	{
		var candlestickFactoryApi = {  };

		candlestickFactoryApi.list = [  ];

		// Return public API.

		return candlestickFactoryApi;
	} );

} )(  );
