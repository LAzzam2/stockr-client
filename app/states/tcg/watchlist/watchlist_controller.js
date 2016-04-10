'use strict';

( function(  )
{
	var watchlist = angular.module( 'watchlist' );

	watchlist.controller( 'WatchlistController', function( $rootScope, $scope, watchlistFactory, $timeout )
	{
		// This is a controller.

		$scope.stateName = 'watchlist';

		// console.log( window.Velocity ); this is working!

		console.log( 'WatchlistController active!' );

		$scope.$watch( 'aWatchlist', function(  )
		{
			// console.log( $scope.aWatchlist );
			// console.log( '' );
		} );
	} );

} )(  );
