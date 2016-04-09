'use strict';

describe( 'Watchlist', function(  )
{
	var scope;
	var controller;

	beforeEach( function(  )
	{
		module( 'appSproutClient' );
	} );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'WatchlistController', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'watchlist' );
	} );
} );
