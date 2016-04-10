'use strict';

( function(  )
{
	var tcg = angular.module( 'tcg' );

	tcg.controller( 'TcgController', function( $rootScope, $scope, $state, sessionFactory )
	{
		// This is a controller.

		$scope.stateName = 'tcg';

		console.log( 'TcgController active!' );

	} );

} )(  );
