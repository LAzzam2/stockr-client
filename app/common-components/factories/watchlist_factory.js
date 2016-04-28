'use strict';

( function(  )
{
	var watchlistFactory = angular.module( 'watchlistFactory', [ ] );

	watchlistFactory.factory( 'watchlistFactory', function( $http, $q, $state, appConstants )
	{
		var watchlistFactoryApi = {  };

		watchlistFactoryApi.watchlist = [  ];

		watchlistFactoryApi.getWatchlist = function(  )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			$http( {

				method: 'get',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/watchlist'

			} )
			.success( function( data )
			{
				console.log( 'Get watchlist success: ', data );

				watchlistFactoryApi.watchlist = data.watchlistItems;

				//sort levels highest to lowest
				function sortLevels(element, index, array) {
					element.levels.sort(function(a, b){return b-a});
				}
				data.watchlistItems.forEach(sortLevels);

				deferred.resolve( data.watchlistItems );
			} )
			.error( function( error )
			{
				console.log( 'Get watchlist error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};

		watchlistFactoryApi.getCommunityWatchlist = function(  )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			$http( {

				method: 'get',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/tcg/watchlist'

			} )
			.success( function( data )
			{
				console.log( 'Get watchlist success: ', data );

				watchlistFactoryApi.watchlist = data.watchlistItems;

				//sort levels highest to lowest
				function sortLevels(element, index, array) {
					element.levels.sort(function(a, b){return b-a});
				}
				data.watchlistItems.forEach(sortLevels);

				deferred.resolve( data.watchlistItems );
			} )
			.error( function( error )
			{
				console.log( 'Get watchlist error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};

		watchlistFactoryApi.upsertWatchlistItem = function( item )
		{	
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			console.log( watchlistFactoryApi.watchlist );

			var cleanItem = angular.toJson( item );
			cleanItem = angular.fromJson( cleanItem );

			$http( {

				method: 'post',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/watchlist',
				data:
				{
					watchlistItem: cleanItem
				}

			} )
			.success( function( data )
			{
				// console.log( 'upsertWatchlistItem success: ', data );

				deferred.resolve( data ); 
			} )
			.error( function( error )
			{
				// console.log( 'upsertWatchlistItem error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};

		watchlistFactoryApi.deleteWatchlistItem = function( item )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			item = angular.toJson( item );
			item = angular.fromJson( item );

			console.log( item );

			$http( {

				method: 'put',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/watchlist',
				data:
				{
					watchlistItem: item
				}

			} )
			.success( function( data )
			{
				console.log( 'deleteWatchlistItem success: ', data );

				deferred.resolve( data );
			} )
			.error( function( error )
			{
				console.log( 'deleteWatchlistItem error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};


		// Return public API.

		return watchlistFactoryApi;
	} );

} )(  );
