'use strict';

( function(  )
{
	var login = angular.module( 'login' );

	login.controller( 'LoginController', function( $rootScope, $scope, $state, sessionFactory, storageFactory )
	{
		// This is a controller.

		$scope.stateName = 'login';

		$scope.email = '';
		$scope.password = '';
		$scope.user = '';

		$scope.loginUser = function(  )
		{
			if( !$scope.form.$valid )
			{
				return;
			}

			var user = {  };

			user.email = $scope.email;
			user.password = $scope.password;

			sessionFactory.login( user )
			.then( function(  )
			{
				$state.go( 'app-root.watchlist' );
			} );
		};

		console.log( 'LoginController active!' );

	} );

} )(  );