'use strict';

( function(  )
{
	var aCommunity = angular.module( 'aCommunity' );

	aCommunity.controller( 'ACommunityController', function( $rootScope, $scope, watchlistFactory, storageFactory, $timeout )
	{

		// console.log( window.Velocity ); this is working!

		console.log( 'A-CommunityController active!' );

		$scope.watchlist = [  ];

		var watchlistCopy;

		$scope.loading = true;

		var getWatchlist = function(  )
		{
			watchlistFactory.getCommunityWatchlist(  )
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
					
					var index;
					for (index = 0; index < watchlist.length; ++index) {
						
						if( watchlist[index].levels.length >= 1 ){

							// check if ticker is already added to watchlist
							Array.prototype.find = function(obj){
							    // Loop through array
							    for(var i = 0, len = this.length; i < len; i++){
							        var ele = this[i],
							            match = true;
							        // Check each object
							        for(var x in obj){
							            if(ele[x] !== obj[x]){
							                match = false;
							                break;
							            }
							        }
							        // Did it match?
							        if(match){
							            return true;
							        }
							    }
							};

							if( !$scope.watchlist.find({ ticker: watchlist[index].ticker }) ){
								// Set watchlist item count to 1
								watchlist[index].count = 1;
								$scope.watchlist.push(watchlist[index]);
							}else{
								// select duplicate ticker
								var ticker = $.grep($scope.watchlist, function(e) { return e.ticker == watchlist[index].ticker });


								// increment ticker count +1
								++ticker[0].count;

								// remove duplicates function
								Array.prototype.unique = function() {
								    var a = this.concat();
								    for(var i=0; i<a.length; ++i) {
								        for(var j=i+1; j<a.length; ++j) {
								            if(a[i] === a[j])
								                a.splice(j--, 1);
								        }
								    }

								    return a;
								};
								// create single array with new levels added and remove duplicates
								var newLevels = ticker[0].levels.concat(watchlist[index].levels).unique(); ;

								// Sort levels function
								function sortLevels(element, index, array) {
									array.sort(function(a, b){return b-a});
								}
								// call sort levels function on newLevels
								newLevels.forEach(sortLevels);

								// Set Levels array to new sorted list
								ticker[0].levels = newLevels;
							}
						}
					}
					watchlistCopy = angular.copy( $scope.watchlist );
					// console.log($scope.watchlist);
				}
				// sort watchlist based on count (amount of times the ticker has been saved by users: "Popularity" )
				$scope.watchlist.sort(function(a, b) {return a.count - b.count});

				$timeout( function(  )
				{
					$scope.loading = false;
				}, 200 );
			} );
		};

		getWatchlist(  );
		watchlistCopy = angular.copy( $scope.watchlist );

	} );

} )(  );
