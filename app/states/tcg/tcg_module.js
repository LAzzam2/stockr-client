'use strict';

( function(  )
{
	var tcg = angular.module( 'tcg',
	[
		'ui.router',
		'sessionFactory',
		'aCommunity'
	] );

	tcg.config( function( $stateProvider )
	{
		$stateProvider.state( 'tcg',
		{
			url: '/tcg',
			views:
			{
				tcg:
				{
					templateUrl: 'states/tcg/tcg_template.html',
					controller: 'TcgController as tcg'
				}
			}
		} );
	} );

} )(  );