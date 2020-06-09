$(document).ready(function () {
	var offset = 18;
	var moreFlag = false;


	$("#search").on("click", function () {
		$('.list').html('');
		getGifs();
	});

	$("#more").on("click", function () {
		moreGifs();
	});

	//Initialise Quill Text Editor
	var toolbarOptions = [
        [{
			'font': []
        }],
        ['bold', 'italic', 'underline'],
        ['blockquote', 'code-block'],
        [{
			'list': 'ordered'
        }, {
			'list': 'bullet'
        }],
        ['omega']
    ];

	var quill = new Quill('#editor', {
		modules: {
			toolbar: toolbarOptions
		},
		theme: 'snow'
	});

	// This function is for getting Gifs from the API	
	function getGifs() {
		var query = $('#searchbox').val();
		$.ajax({
			url: 'https://api.giphy.com/v1/gifs/search?api_key=OZbsYWJGGOLqLCPpYdneQ6zopPnScwob&limit=18',
			type: "GET",
			data: {
				q: query,
			},
			contentType: "application/json",
			dataType: 'json',
			success: function (data) {
				renderList(data);
			}
		});
	}

	// This is common function for rendering gifs
	function renderList(data) {
		var totalResults = 0;
		$('.results').text(totalResults);
		var list = $('.list');
		var a = data;
		totalResults = a.data.length;
		if (a.data.length > 0) {
			$('#more').removeClass('hide');
		} else {
			$('#more').addClass('hide');
		}
		if (moreFlag) {
			totalResults = totalResults + a.data.length;
		}

		$('.results').text(totalResults);
		for (var x = 0; x < a.data.length; x++) {
			list.append("<img class='roll img-fluid' src='" + a.data[x].images.preview_webp.url + "' data-id='img" + x + "'>");
		}
	}

	// This function is useful to get more gifs 
	function moreGifs() {
		var query = $('#searchbox').val();
		moreFlag = true;
		offset = offset + 18;
		$.ajax({
			url: 'https://api.giphy.com/v1/gifs/search?&api_key=OZbsYWJGGOLqLCPpYdneQ6zopPnScwob&limit=18',
			type: "GET",
			data: {
				offset: offset,
				q: query,
			},
			contentType: "application/json",
			dataType: 'json',
			success: function (data) {
				renderList(data);
			}
		});
	}

	// Event to launch modal dialog on custom button 'G'
	$(".ql-omega").on("click", function () {
		modal.style.display = "block";
	});

	// Click event for the gifs in the modal
	$('.list').on("click", '.roll', function () {
		$('.ql-editor').append($(event.target).clone()).html();
	});

	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];


	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

});