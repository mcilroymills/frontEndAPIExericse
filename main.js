$(document).ready(function() {
  $( "#submit" ).click(function() {
    event.preventDefault();//This keeps the added text on the page
    var artist = $('form #artistBox').val();
    var url = "https://itunes.apple.com/search?term=" + artist + "&entity=album";
    $('#searchTerm').text("You searched for: " + artist);

      $.ajax({
      url: url,
      method: "GET",
      dataType: 'jsonp',
      success: function(json) {
        $('#searchResults').html("");//clear previous search results
        //A bet that the first artist in the result is the correct artist
        var mainArtistId = json.results[0].artistId;
        var resultCount = 0;
        for (var i = 0; i < json.results.length; i++) {
          if (json.results[i].artistId === mainArtistId) {
            var imageSrc = json.results[i].artworkUrl100;
            var image = $('<img />');
            image.attr( 'src', imageSrc);
            var albumLink = json.results[i].collectionViewUrl;
            var anchorTag  = $('<a></a>');
            anchorTag.attr('href', albumLink);
            image.appendTo('#searchResults');
            $(image).wrap(anchorTag);
            resultCount++;

          }
        }
        $('#searchTerm').append("<br>" + resultCount + " result(s)");


      }
  });
  });
});


