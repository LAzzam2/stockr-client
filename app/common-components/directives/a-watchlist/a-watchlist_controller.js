'use strict';

( function(  )
{
	var aWatchlist = angular.module( 'aWatchlist' );

	aWatchlist.controller( 'AWatchlistController', function( $rootScope, $scope, watchlistFactory, storageFactory, $timeout )
	{

		// console.log( window.Velocity ); this is working!

		console.log( 'A-WatchlistController active!' );

		$scope.watchlist = [  ];
		$scope.newItem = '';

		var watchlistCopy;

		$scope.loading = true;

		var getWatchlist = function(  )
		{
			watchlistFactory.getWatchlist(  )
			.then( function( watchlist )
			{	
				if( ( !watchlist ) || ( watchlist.length === 0 ) )
				{
					// console.log( watchlist.length );
					// $scope.wacthlist = watchlist;
					watchlistCopy = angular.copy( $scope.watchlist );
				}
				else
				{
					$scope.watchlist = watchlist;
					watchlistCopy = angular.copy( $scope.watchlist );
					// console.log($scope.watchlist);
				}

				$timeout( function(  )
				{
					$scope.loading = false;
				}, 200 );
			} );
		};

		getWatchlist(  );
		watchlistCopy = angular.copy( $scope.watchlist );

		// $scope.keyPress = function( item, index, event )
		// {
		// 	if( event.keyCode === 13 )
		// 	{
		// 		$scope.saveWatchlist( item, index, event );
		// 	}
		// };

		// $scope.addNewKeyPress = function( item, event )
		// {
		// 	if( event.keyCode === 13 )
		// 	{
		// 		$scope.addNewWatchlistItem( item );
		// 	}
		// };

		var addNewWatchlistItem = function( itemValue )
		{
			var duplicate = false;
			$.each($scope.watchlist, function( index, value ) {
				if( value.ticker == itemValue){
					duplicate = true;
				}
			});
			if( ( itemValue === '' ) || ( itemValue === undefined ) )
			{
				return;
			}
			if( $scope.watchlist.length <= 5 )
			{
				if( duplicate == false ){
					var newItem =
					{
						ticker: itemValue,
						levels: [ ]
					};

					$scope.watchlist.push( newItem );
					$scope.saveWatchlist( newItem, 0, event );
				}
				else
				{
					//No duplicates!
					console.log('Duplicate!')
				}
			}
			else
			{
				//Only 5 watchlist items max
					console.log('Max Items!')
			}


		};

		var saveWatchlistItemAnimation = function( index )
		{
			var watchlistItems = document.getElementsByClassName( 'watchlist-item' );
			var savedWatchlistItem = watchlistItems[ index ];
			var enterIcon = document.getElementsByClassName( 'enter-icon' )[ 0 ];

			savedWatchlistItem.style.backgroundColor = '#B7E4A9';
			savedWatchlistItem.style.WebkitTransition = 'none';

			// enterIcon.style.backgroundColor = '#78b066';
			// enterIcon.style.WebkitTransition = 'none';

			$timeout( function(  )
			{
				savedWatchlistItem.style.WebkitTransition = 'background-color 1s ease-in';
				savedWatchlistItem.style.backgroundColor = '#fcfcfa';

				// enterIcon.style.WebkitTransition = 'background-color 1s ease-in';
				// enterIcon.style.backgroundColor = '#688e5c';
			}, 50 );

			savedWatchlistItem.addEventListener( 'webkitTransitionEnd', function(  )
			{
				savedWatchlistItem.style.WebkitTransition = '';
				savedWatchlistItem.style.backgroundColor = '';
			} );
		};

		var updateWatchlistCopy = function(  )
		{
			watchlistCopy = angular.copy( $scope.watchlist );
		};

		$scope.saveWatchlist = function( item, index, event )
		{
			console.log('thisItem: ',item);
			// If trying to save a newly created list item with no value,
			// don't do anything.
			if( ( item.ticker === undefined ) && ( item._id === undefined ) )
			{
				return;
			}

			// Because we are using the reverse filter,
			// we need to get the actual index.
			var realIndex = $scope.watchlist.length - index - 1;


			// If the new value is the same as the factory value,
			// dont do anything.
			// if( ( watchlistCopy[ realIndex ] ) && ( item.ticker === watchlistCopy[ realIndex ].ticker ) )
			// {
			// 	return;
			// };

			// If trying to save an existing list item with no value,
			// delete it.
			if( ( item.ticker === '' ) && ( item._id !== undefined ) )
			{
				$scope.deleteWatchlistItem( item, index );
				return;
			}
			watchlistFactory.upsertWatchlistItem( item )
			.then( function( response )
			{
				// If the user is creating a new item,
				// we need to give it an ID that we get back from the server.
				if( response.newWatchlistItem )
				{
					$timeout( function(  )
					{
						$scope.watchlist[ realIndex ]._id = response.newWatchlistItem._id;
						$scope.newItem = '';
					} );
				}

				updateWatchlistCopy(  );
				// saveWatchlistItemAnimation( index );
			} );
		};

		$scope.deleteWatchlistItem = function( item, index )
		{
			// console.log( item );
			var inverseIndex = $scope.watchlist.length - index - 1;


			watchlistFactory.deleteWatchlistItem( item )
			.then( function(  )
			{
				$scope.watchlist.splice( inverseIndex, 1 );
				updateWatchlistCopy(  );
			} );
		};

		$scope.addCurrentTicker = function(  )
		{
			var currentTicker = storageFactory.local.get('currentTicker');
			addNewWatchlistItem( currentTicker );
		}

		$scope.addLevel = function( itemValue, level, index )
		{
			var realIndex = $scope.watchlist.length - index - 1;
			var duplicate = false;

			$('input').val('');
			if( ( level === '' ) || ( level === undefined ) || isNaN(level))
			{
				return;
			}
			$.each($scope.watchlist[realIndex].levels, function( index, value ) {
				if( value == level){
					duplicate = true;
				}
			});
			if(duplicate == false){
				$scope.watchlist[realIndex].levels.push(level);
				$scope.saveWatchlist( $scope.watchlist[realIndex], 0, event );
			}
		};

		$scope.levelInputKeypress = function( item, level, index, event )
		{
			// console.log('levelInputKeypress', level);
			if( event.keyCode === 13 )
			{	
				$scope.addLevel( item, level, index );
			}
		}
		$scope.deleteLevel = function( item, val, index )
		{
			var arr = item.levels;
    		var itemtoRemove = val;
    		arr.splice($.inArray(itemtoRemove, arr),1);
			$scope.saveWatchlist( item, index, event );
		}
	} );

} )(  );
