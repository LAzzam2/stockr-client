'use strict';

( function(  )
{

	var appSproutClient = angular.module( 'appSproutClient',
	[
		'reverseFilter',
		'appConstants',

		'homepage',
		'register',
		'login',
		'tcg',
		'appRoot',
		'nav',
		'ngAnimate',
		'storageFactory',
		'userFactory',
		'sn.skrollr'

	] );

	appSproutClient.config( function( $urlRouterProvider, $locationProvider, snSkrollrProvider )
	{
		$urlRouterProvider.otherwise( '/' );
		$locationProvider.html5Mode( true );
  		snSkrollrProvider.config = { smoothScrolling: true, forcedHeight: false };

	});

	appSproutClient.run( function( $rootScope, snSkrollr )
	{
  		snSkrollr.init();
  		console.log( snSkrollr );
		$rootScope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
		{
			$rootScope.fromState = fromState;
			$rootScope.fromParams = fromParams;

			$rootScope.toState = toState;
			$rootScope.toParams = toParams;
		} );

	});

} )(  );
