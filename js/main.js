var api = 'AIzaSyB_rB142zrVbdrvvAhJUo3mo3DMctJFpnw';


$(function() {  

    // prevents search-from from submitting

    $('#search-form').submit( function(e) {

        e.preventDefault();

    });

});

$('#sel1').click( function() {

    console.log("aaa");
    searchForVideos();


});
 

function searchForVideos() {


    var select = $('#sel1').find(':selected').text();
  
    var order = checkfororder(select);
     
    $('#disp_res').html('');
    $('#buttons').html('');
    

    q = $('#query').val();   

    if(!q.trim()) {

        document.getElementById("alert").style.display = "block";       
        return false;

    }
    else {
        
        document.getElementById("alert").style.display = "none";

    }

 
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            maxResults: '10',
            type: 'video',
            order : order,
            key: api
        }, function(values) {
            
            $.each(values.items, function(i, item) {

                $('#disp_res').append(print(item, i));               

            });
            
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));

        });

}



function next() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
    var select = $('#sel1').find(':selected').text();

    console.log(select);

    var order = checkfororder(select);
    
   // clear 
    $('#disp_res').html('');
    $('#buttons').html('');
    
 
    q = $('#query').val();   

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            maxResults: '10',
            pageToken: token,
            type: 'video',
            order : order,
            key: api
        }, function(values) {
            
            
            $.each(values.items, function(i, item) {
                
                $('#disp_res').append(print(item, i));

            });
            
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));


        });    
}

 
function prev() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    
    var select = $('#sel1').find(':selected').text();

    console.log(select);

    var order = checkfororder(select);
 
    $('#disp_res').html('');
    $('#buttons').html('');
    
 
    q = $('#query').val();   

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            maxResults: '10',
            pageToken: token,
            type: 'video',
            order : order,
            key: api
        }, function(values) {
            
            $.each(values.items, function(i, item) {
                
                
                $('#disp_res').append(print(item, i));

            });
             
            $('#buttons').append(display_buttons(values.prevPageToken, values.nextPageToken));

        });    
}



function print(item, i) {

    var id = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var img = item.snippet.thumbnails.high.url;
    var channelname = item.snippet.channelTitle;
    var date = item.snippet.publishedAt;
    var channelid = item.snippet.channelId;    
    var view = "viewCount" + i;
    var dur = "duration" + i;
    countviews(id, view);
    videoduration(id, dur);
 

    var result = '<li style="border:1px solid grey; padding:1%;margin-left:-8%;box-shadow:0 0 8px grey;">' +
                        '<div class="img">' +
                            '<img src="' + img + '">' +
                        '</div>' +
                        '<div class="mat">' +
                            '<h4><a id="videoplay" href="https://youtube.com/embed/' + id + '?rel=0">' + title + '</a></h4>' +
                            '<b>  <a target="blank" style="color : #e44c65;" href="https://youtube.com/channel/' + channelid + '"><span style="color : #e44c65;">' + channelname + '</span> </a><br><span style="color:green" id="' + view + '"></span><br><span style="color : #e44c65;" id="' + dur + '"></span> </b>' +
                            '<p style="color:white;">' + description + '</p>' +
                        '</div>' + 
                    '</li><br>'

    return result;
    
}


function display_buttons(prev_but, next_but) {

    if(!prev_but) {

        var result =     '<div class="button-container">' +
                                '<button id="next-button" style="padding:5px;float:right" class=" btn btn-primary " data-token="' + next_but + '" data-query="' + q + '"' +
                                    'onclick = "next();">Next Page >> </button>' +
                            '</div>';

    }
    else {

        var result =     '<div class="button-container">' +
                                '<button id="prev-button" style="padding:5px;float:left" class=" btn btn-primary " data-token="' + prev_but + '" data-query="' + q + '"' +
                                    'onclick = "prev();"> << Prev Page</button>' +            
                                '<button id="next-button" style="padding:5px;float:right" class=" btn btn-primary " data-token="' + next_but + '" data-query="' + q + '"' +
                                    'onclick = "next();">Next Page >> </button>' +
                            '</div>';        
   
    }
    
    return result;

}

 function searchForVideosBySort() {

    var select = $('#sel1').find(':selected').text();
    if(select == 'Upload Date' || select == 'View Count' || select == 'Rating' || select == 'Default')
        searchForVideos();

 }

 function checkfororder(select) {

    if(select == 'Upload Date') {
        return 'date';
    }
    else if(select == 'View Count') {
        return 'viewCount';
    }
    else if(select == 'Rating') {
        return 'rating';
    }
    else     
        return 'relevance';

 }