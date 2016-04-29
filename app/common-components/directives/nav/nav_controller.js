'use strict';

( function(  )
{
	var nav = angular.module( 'nav' );

	nav.controller( 'NavController', function( $rootScope, $scope, storageFactory, sessionFactory, $state, $timeout )
	{

		$scope.user = 'test';
		// console.log( window.Velocity ); this is working!
		console.log('user: ',$scope.user);

		$scope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
		{
			$scope.user = storageFactory.local.getObject( 'user' );
		} );

		console.log( 'NavController active!' );

		$scope.logout = function(  )
		{
			sessionFactory.logout(  )
			.then( function(  )
			{
				$state.go( 'homepage', { reload: true });
				$scope.user = storageFactory.local.getObject( 'user' );
			} );
		};

	} );

} )(  );
