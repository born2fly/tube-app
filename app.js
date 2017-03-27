// the parameters we need to pass in our request to YouTube's API --
var getVideo = function (tags, page) {
	console.log(page);
	var request = {};
	if (page == "new") {
		request = {
			part: 'snippet',
			q: tags,
			key: "AIzaSyAPFRZbtrrI-aHcLX2R4kKx1JgsMzIMFtA",
			maxResults: 10
		};
		$('.nextpage').show();
	}else{
		request = {
			part: 'snippet',
			q: tags,
			key: "AIzaSyAPFRZbtrrI-aHcLX2R4kKx1JgsMzIMFtA",
			maxResults: 10,
			pageToken: page
		};
		$('.prevpage').show();

	}

	console.log(request);

	// ajax call -- set the parameters --  youtube endpoint --
	$.ajax({
			url: "https://www.googleapis.com/youtube/v3/search",
			data: request,
			dataType: "jsonp", //use jsonp to avoid cross origin issues --
			type: "GET",
		})

		.done(function (result) {
			$('.nextpage').attr('id', result.nextPageToken);
			if(result.prevPageToken){}
			$('.prevpage').attr('id', result.prevPageToken);
			// iterate thru results --
			$.each(result.items, function (i, item) {
				var answer = showVideo(item);
				$('.results').append(answer);
				//  console.log(item);
			});
			console.log(result);
		})

		//   if no results --
		.fail(function (jqXHR, error) {
			var errorElem = showError(error);
			$('.search-results').append(errorElem);
		});
	console.log(tags);
};

// find requested items and display them --
function showVideo(item) {
	var videoID = item.id.videoId;
	var videoThumb = item.snippet.thumbnails.medium.url;
	var getTitle = item.snippet.title;
	// console.log(videoID);
	// console.log(videoThumb);
	// console.log(getTitle);
	return '<a href=https://youtube.com/watch?v=' + videoID + '>' + getTitle + '<br><img src="' + videoThumb + '"></a><br>';
}

// listener --
$(document).ready(function () {
	var tags = ' ';
	var pageToken = ' ';
	$('.video-getter').submit(function (e) {
		e.preventDefault();

		// reset results div --
		$('.results').html('');

		// read user input --
		tags = $(this).find("input[name='tags']").val();
		getVideo(tags, "new");
	});

	$('.nextpage').click(function (e) {
		e.preventDefault();
		console.log(tags + ' you click nextpage');
		$('.results').html(' ');
		pageToken = $('.nextpage').attr('id');
		getVideo(tags, pageToken);
		// console.log('you click nextpage');
	});
	$('.prevpage').click(function (e) {
		e.preventDefault();
		console.log(tags + ' you click prevpage');
		$('.results').html(' ');
		pageToken = $('.prevpage').attr('id');
		getVideo(tags, pageToken);
		// console.log('you click prevpage');
	});

});