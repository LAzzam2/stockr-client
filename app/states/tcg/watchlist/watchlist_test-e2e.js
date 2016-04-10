'use strict';

var mock = require( 'protractor-http-mock' );

describe( 'App Watchlist', function(  )
{
	mock(
	[
		{
			request:
			{
				path: '/api/user/watchlist',
				withCredentials: true,
				method: 'post',
				data:
				{
					watchlistItem:
					{
						name: 'new watchlist item'
					}
				}
			},
			response:
			{
				status: 200,
				data:
				{
					newWatchlistItem:
					{
						_id: 'abc',
						name: 'new watchlist item'
					}
				}
			}
		},
		{
			request:
			{
				path: '/api/user/watchlist',
				withCredentials: true,
				method: 'get'
			},
			response:
			{
				status: 200,
				data: []
			}
		},
		{
			request:
			{
				path: '/api/user/watchlist',
				withCredentials: true,
				method: 'put',
				data:
				{
					watchlistItem:
					{
						_id: 'abc',
						name: 'updated watchlist item'
					}
				}
			},
			response:
			{
				status: 200
			}
		},
		{
			request:
			{
				path: '/api/user/watchlist',
				withCredentials: true,
				method: 'post',
				data:
				{
					watchlistItem:
					{
						_id: 'abc',
						name: 'updated watchlist item'
					}
				}
			},
			response:
			{
				status: 200
			}
		}
	] );

	afterEach( function(  )
	{
		mock.teardown(  );
	} );


	it( 'should add an item to the watchlist', function(  )
	{
		browser.ignoreSynchronization = false;

		browser.get( 'http://localhost:8080/app/watchlist' );

		element( by.model( 'newItem' ) ).sendKeys( 'new watchlist item' );
		element( by.css( '.enter-icon' ) ).click(  );

		var list = element.all( by.repeater( 'item in watchlist' ) );
		browser.sleep( 20 );

		expect( watchlist.count(  ) ).toEqual( 1 );
		expect( watchlist.get( 0 ).element( by.model( 'item.name' ) ).getAttribute( 'value' ) ).toEqual( 'new watchlist item' );

		expect( mock.requestsMade(  ) ).toEqual(
		[
			{
				url: 'http://localhost:9000/api/user/watchlist',
				withCredentials: true,
				method: 'get'
			},
			{
				url: 'http://localhost:9000/api/user/watchlist',
				withCredentials: true,
				method: 'post',
				data:
				{
					listItem:
					{
						name: 'new watchlist item'
					}
				} }
		] );
	} );

	it( 'should update an existing item', function(  )
	{
		mock.clearRequests(  );

		var watchlist = element.all( by.repeater( 'item in watchlist' ) );

		expect( watchlist.count(  ) ).toEqual( 1 );

		var newWatchListItemElement = watchlist.get( 0 ).element( by.model( 'item.name' ) );

		newListItemElement.clear(  );
		newListItemElement.sendKeys( 'updated watchlist item' );
		newListItemElement.sendKeys( protractor.Key.ENTER );

		expect( newWatchlistItemElement.getAttribute( 'value' ) ).toEqual( 'updated list item' );

		expect( mock.requestsMade(  ) ).toEqual(
		[
			{
				url: 'http://localhost:9000/api/user/watchlist',
				withCredentials: true,
				method: 'post',
				data:
				{
					watchlistItem:
					{
						_id: 'abc',
						name: 'updated list item'
					}
				}
			}
		] );
	} );

	it( 'should delete an existing item', function(  )
	{
		mock.clearRequests(  );

		var watchlist = element.all( by.repeater( 'item in watchlist' ) );

		expect( watchlist.count(  ) ).toEqual( 1 );

		var deleteElement = watchlist.get( 0 ).element( by.css( '.delete-list-item' ) );

		deleteElement.click(  );
		expect( watchlist.count(  ) ).toEqual( 0 );

		expect( mock.requestsMade(  ) ).toEqual(
		[
			{
				url: 'http://localhost:9000/api/user/watchlist',
				withCredentials: true,
				method: 'put',
				data:
				{
					watchlistItem:
					{
						_id: 'abc',
						name: 'updated list item'
					}
				}
			}
		] );
	} );
} );
