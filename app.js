
var request = { 
    part: 'snippet',
    q: $('#movies').val(),
    key:"AIzaSyAPFRZbtrrI-aHcLX2R4kKx1JgsMzIMFtA" 

};


$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: request,
		dataType: "jsonp",    //use jsonp to avoid cross origin issues
		type: "GET",
	 })
        .done(function(result){
            console.log(result);
     })

 .fail(function(jqXHR, error){
 var errorElem = showError(error);
		$('.search-results').append(errorElem);
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