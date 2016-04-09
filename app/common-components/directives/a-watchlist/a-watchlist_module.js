'use strict';

( function(  )
{
	var aWatchlist = angular.module( 'aWatchlist', [ ] );

	aWatchlist.directive( 'aWatchlist', function(  )
	{
		return {

			restrict: 'E',
			scope:
			{
				watchlist: '='
			},
			controller: 'AWatchlistController',
			templateUrl: 'common-components/directives/a-watchlist/a-watchlist_template.html'

		};
	} );

} )(  );
