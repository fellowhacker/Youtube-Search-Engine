var api = 'AIzaSyB_rB142zrVbdrvvAhJUo3mo3DMctJFpnw';

$(function() {

	// prevents search-from from submitting

	$('#search-form').submit( function(e) {

		e.preventDefault();

	});

});

// func for searching videos

function searchForVideos() {


    // set the result page to null for evry new req
    $('#results').html('');
    $('#buttons').html('');
    
    // retrieve input from the search box

    q = $('#query').val();   

 
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: api
        }, function(values) {
            
            $.each(values.items, function(i, item) {
                
                $('#results').append(print(item));

            });
            
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));

        });

}



function next() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
    
   // clear 
    $('#results').html('');
    $('#buttons').html('');
    
 
    q = $('#query').val();   

    $.get(
    	"https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: api
        }, function(values) {
            
            
            $.each(values.items, function(i, item) {
                
                $('#results').append(print(item));

            });
            
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));


        });    
}

 
function prev() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    
 
    $('#results').html('');
    $('#buttons').html('');
    
 
    q = $('#query').val();   

    $.get(
    	"https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: api
        }, function(values) {
            
            $.each(values.items, function(i, item) {
                
                $('#results').append(print(item));

            });
            
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));


        });    
}



function print(item) {

    var id = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelname = item.snippet.channelTitle;
    var date = item.snippet.publishedAt;

    var result = '<li style="border-top:1px solid grey">' +
                        '<div class="img">' +
                            '<img src="' + thumb + '">' +
                        '</div>' +
                        '<div class="mat">' +
                            '<h4><a id="videoplay" href="https://youtube.com/embed/' + id + '?rel=0">' + title + '</a></h4>' +
                            '<small>By <span class="channelname" style="color:red">' + channelname + '</span> on ' + date + '</small>' +
                            '<p>' + description + '</p>' +
                        '</div>' + 
                    '</li>'

    return result;
}


function display_buttons(prev_but, next_but) {
    if(!prev_but) {
        var result =     '<div class="button-container">' +
                                '<button id="next-button" style="padding:5px;float:right" class=" btn btn-primary " data-token="' + next_but + '" data-query="' + q + '"' +
                                    'onclick = "next();">Next Page</button>' +
                            '</div>';
    } else {
        var result =     '<div class="button-container">' +
                                '<button id="prev-button" style="padding:5px;float:left" class=" btn btn-primary " data-token="' + prev_but + '" data-query="' + q + '"' +
                                    'onclick = "prev();">Prev Page</button>' +            
                                '<button id="next-button" style="padding:5px;float:right" class=" btn btn-primary " data-token="' + next_but + '" data-query="' + q + '"' +
                                    'onclick = "next();">Next Page</button>' +
                            '</div>';        
    }
    
    return result;
}

$('#videoplay').click( function() {

	alert("Hello");

})