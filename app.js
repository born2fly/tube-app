

// var getVideo = function(tags) {
// the parameters we need to pass in our request to YouTube's API
var request = { 
    part: 'snippet',
    q: $('#videos').val(),
    key:"AIzaSyAPFRZbtrrI-aHcLX2R4kKx1JgsMzIMFtA" 
	};
// };

$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: request,
		dataType: "jsonp",    //use jsonp to avoid cross origin issues
		type: "GET",
	 })
        .done(function(result){
            console.log(result);
});

	var searchResults = showSearchResults(tags, result.items.length);
         $('.search-results').html(searchResults);
		 $.each(result.items, function(i, item) {
			var answer = showAnswer(item);
			$('.results').append(answer);
			 console.log(item);
	  })

 .fail(function(jqXHR, error){
 var errorElem = showError(error);
		$('.search-results').append(errorElem);
		
});


$(document).ready( function() {
	$('.video-getter').submit( function(e){
		e.preventDefault();
		$('.results').html('');
		
		var tags = $(this).find("input[name='videos']").val();
		getVideo(tags);
	});

});


/*	

.done(function(result){ //this waits for the ajax to return with a succesful promise 
		console.log(result);
		var searchResults = showSearchResults(request.tagged, result.items.length);

		$('.search-results').html(searchResults);
		//$.each is a higher order function. It takes an array and a function as an argument.
		//The function is executed once for each item in the array.
		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
    
*/