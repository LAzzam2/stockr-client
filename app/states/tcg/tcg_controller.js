'use strict';

( function(  )
{
	var tcg = angular.module( 'tcg' );

	tcg.controller( 'TcgController', function( $rootScope, $scope, $state, sessionFactory, watchlistFactory, storageFactory )
	{
		// This is a controller.

		$scope.user = storageFactory.local.getObject( 'user' );

		$scope.stateName = 'tcg';

		console.log( 'TcgController active!' );

		$scope.logout = function(  )
		{
			sessionFactory.logout(  )
			.then( function(  )
			{
				$state.go($state.current, {}, {reload: true});
			} );
		};

	} );

} )(  );
