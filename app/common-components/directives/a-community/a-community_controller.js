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
						
						if( $scope.watchlist.length == 0 && watchlist[index].levels.length > 0 ){
							$scope.watchlist.push(watchlist[index]);
						}else if( watchlist[index].levels.length > 1 ){
							console.log(watchlist[index].levels)
							var duplicate;
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
							var watchlistItems = $scope.watchlist;
							
							duplicate = watchlistItems.find({ ticker: watchlist[index].ticker });

							if( !duplicate ){
								$scope.watchlist.push(watchlist[index]);
							}
						}

					}
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

	} );

} )(  );
