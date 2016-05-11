'use strict';

( function(  )
{
	var aCandlestick = angular.module( 'aCandlestick' );

	aCandlestick.controller( 'ACandlestickController', function( $rootScope, $scope, candlestickFactory, storageFactory, $timeout )
	{

		console.log( 'CandlestickController active!' );

		// console.log( window.Velocity ); this is working!

		$scope.loading = false;
		
		$scope.candlestick = [{
			name: 'Insert a ticker to begin.',
			price: '',
			open: '',
			high: '',
			low: ''
		}];
		var candlestick = $scope.candlestick[0];

		$scope.activeName = 'Insert';
		
		window.onkeydown = function(event) {
			// console.log('keystroke', $(".symbol-input").val(), $(".symbol-input").is(":focus") );
			if( !$("input").is(":focus") ){
				// console.log('symbol-input not focused');
				$(".symbol-input").focus();
				if(!$('#symbol-form').hasClass('active')){
				    if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 97 && event.keyCode <= 122 ){	
						$(".symbol-input").select();
			    		$('#symbol-form').addClass('active');
			    		$('.candlestick').addClass('muted');
				    }
			   	}
		   	}else
		   	{
		   		return;
		   	}
		}

		$scope.keyPress = function( item, index, event )
		{
			if( event.keyCode === 13 )
			{
				$scope.saveList( item, index, event );
			}
		};

		$scope.addNewKeyPress = function( item, event )
		{
			if( event.keyCode === 13 )
			{	
				$scope.loading = true;
				$scope.pullTickerData( item );
			}
		};

		$scope.pullTickerData = function( item, event )
		{
			function getData( item ) {
				var url = "http://query.yahooapis.com/v1/public/yql";
				var symbol = item;
				var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

				$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
					.done(function (data) {
						var quote = data.query.results.quote;
						console.log(quote);
						$scope.loading = false;
						if( quote.LastTradePriceOnly == null ){
							errorMsg(data);
				    	}else{
							setItems(quote);
					    	setCurrentTicker(quote.symbol);
				    	}
				    	
					})
					.fail(function (jqxhr, textStatus, error) {
						$scope.loading = false;
						var err = textStatus + ", " + error;
						alert('Request failed: ' + err);
				});
			}
			getData( item );
			// var Markit = {};
			// /**
			// * Define the QuoteService.
			// * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
			// * Second argument is fCallback, a callback function executed onSuccess of API.
			// */
			// Markit.QuoteService = function(sSymbol, fCallback) {
			//     this.symbol = sSymbol;
			//     this.fCallback = fCallback;
			//     this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
			//     this.makeRequest();
			// };
			// /**
			// * Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
			// */
			// Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
			//     this.fCallback(jsonResult);
			// };
			// /**
			// * Ajax error callback
			// */
			// Markit.QuoteService.prototype.handleError = function(jsonResult) {
			//     console.error(jsonResult);
			// };
			// /** 
			// * Starts a new ajax request to the Quote API
			// */
			// Markit.QuoteService.prototype.makeRequest = function() {
			//     //Abort any open requests
			//     if (this.xhr) { this.xhr.abort(); }
			//     //Start a new request
			//     this.xhr = $.ajax({
			//         data: { symbol: this.symbol },
			//         url: this.DATA_SRC,
			//         dataType: "jsonp",
			//         success: this.handleSuccess,
			//         error: this.handleError,
			//         context: this
			//     });
			// };

			// new Markit.QuoteService(item, function(jsonResult) {
			// 	setItems(jsonResult);
			// 	setCurrentTicker(item);
			//     //Catch errors
			//     if (!jsonResult || jsonResult.Message || jsonResult.Status == 'Failure|APP_SPECIFIC_ERROR' ){
			//         $scope.loading = false;
			//         errorMsg(jsonResult.message);
			//     }
			//     else{
			//     	//If all goes well, your quote will be here.
			// 	    // console.log(jsonResult);
			// 	    $scope.loading = false;

			// 	    //Now proceed to do something with the data.
			// 	    setItems(jsonResult);
			// 	    setCurrentTicker(item);
			// 	    /**
			// 	    * Need help? Visit the API documentation at:
			// 	    * http://dev.markitondemand.com
			// 	    */
			//     }

			    
			// });

			function setCurrentTicker( ticker ){
				// local storage keys should be in a config file somewhere-
				storageFactory.local.set('currentTicker', ticker);
			} 
	
		    function errorMsg(data){
		    	$(".symbol-input").select();
		    	$(".symbol-input").val('');
	    		$('#symbol-form').addClass('active');
	    		$('.candlestick').addClass('muted');
	    		$('.label').addClass('error');
	    		$('.label').removeClass('symbol');
		    	$scope.$apply(function() { 
		    		$scope.candlestick[0].name = "Oops. I'm not sure that's a valid stock symbol. Try again!";
		    	});
		    }
		    function setItems(data){
	    		$('.symbol-input').blur();
	    		$('.label').removeClass('error');
	    		$('.label').addClass('symbol');
		        $('#symbol-form').removeClass('active');
		        $('.candlestick').removeClass('muted');
		        $('h1').text('$'+symbol);
		    	$('#results').addClass('active');
		    	var symbol = {
					price: data.LastTradePriceOnly,
					high: data.DaysHigh,
					low: data.DaysLow,
					open: data.Open,
					change: data.Change,
					upperWick: 0,
					lowerWick: 0,
					body: 0,
					spread: data.DaysHigh - data.DaysLow,
					symbol: data.Symbol
				};

				$scope.$apply(function() { 
					$scope.candlestick[0].name = symbol.symbol;
				});

				$('.upper .high p').text(symbol.high);
				$('.lower .low p').text(symbol.low);

				var cHeight = window.innerHeight - (window.innerHeight*.40);

				if( symbol.price > symbol.open  ){
					$('.candlestick').addClass('pos');
					$('.candlestick').removeClass('neg');

					$('.upper .low p').text(symbol.price);
					$('.lower .high p').text(symbol.open);

					symbol.upperWick = (symbol.high - symbol.price) / symbol.spread;
					symbol.body = (symbol.price - symbol.open) / symbol.spread;
					symbol.lowerWick = (symbol.open - symbol.low) / symbol.spread;
					bgColor(symbol);
				}else if( symbol.price < symbol.open ){
					$('.candlestick').addClass('neg');
					$('.candlestick').removeClass('pos');

					$('.upper .low p').text(symbol.open);
					$('.lower .high p').text(symbol.price);

					symbol.upperWick = (symbol.high - symbol.open) / symbol.spread;
					symbol.body = (symbol.open - symbol.price) / symbol.spread;
					symbol.lowerWick = (symbol.price - symbol.low) / symbol.spread;
					bgColor(symbol);
				}else{
					$('.candlestick').removeClass('neg');
					$('.candlestick').removeClass('pos');

					$('.upper .low p').text(symbol.open);
					$('.lower .high p').text(symbol.price);
					bgColor(symbol);
				}
				
				$('.body').css('height',cHeight*symbol.body);
				$('.upper').css('height',cHeight*symbol.upperWick);
				$('.lower').css('height',cHeight*symbol.lowerWick);
				function bgColor(symbol){
					// console.log( symbol.price, symbol.prevClose );
					if( symbol.change > 0 ){
						$('body').addClass('pos');
						$('body').removeClass('neg');
					}else if( symbol.change < 0 ){
						$('body').addClass('neg');
						$('body').removeClass('pos');
					}else if( symbol.change == 0 ){
						$('body').removeClass('neg');
						$('body').removeClass('pos');
					}
				}
		    }	
		}

	} );

} )(  );
