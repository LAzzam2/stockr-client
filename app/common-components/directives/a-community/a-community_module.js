'use strict';

( function(  )
{
	var aCommunity = angular.module( 'aCommunity', [ ] );

	aCommunity.directive( 'aCommunity', function(  )
	{
		return {

			restrict: 'E',
			scope:
			{
				watchlist: '='
			},
			controller: 'ACommunityController',
			templateUrl: 'common-components/directives/a-community/a-community_template.html'

		};
	} );

} )(  );
