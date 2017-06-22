function countviews(id, view) {

	$.get(
            "https://www.googleapis.com/youtube/v3/videos", {
                part: 'statistics',
                id: id,
                key: api
            },
            function (data) {
 
                $.each(data.items, function (i, item) {
     
                    $('#'+view).text(item.statistics.viewCount + ' views');

                })
            
        
        });
}