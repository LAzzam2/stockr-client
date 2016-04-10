'use strict';

( function(  )
{
	var watchlist = angular.module( 'watchlist',
	[
		'ui.router',
		'watchlistFactory',
		'ngEnter',
		'ngAnimate',
		'spinner',
		'aWatchlist',
	] );


	watchlist.config( function( $stateProvider )
	{
		$stateProvider.state( 'app-root.watchlist',
		{
			url: '/watchlist',
			views:
			{
				'app-content':
				{
					templateUrl: 'states/app-root/watchlist/watchlist_template.html',
					controller: 'WatchlistController as watchlist'
				}
			}
		} );
	} );

} )(  );
