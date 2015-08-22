var apikey = 'AIzaSyDudo12NRfs2TyYeN66kOlMrJ-sUx1P0-8'

$(document).ready(function(){
  $targetDiv = $('#Data');
  $('#Submit').on('click', function(e){
    var $author = encodeURI($('#Author').val()) || '*';
    var $title = encodeURI($('#BookName').val()) || $author;
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + $title + '&inauthor=' + $author + '&key=' + apikey;
    console.log(url);
    e.preventDefault();
    $.ajax({
      url: url,
      dataType: 'json',
      crossDomain: true,
      success: function(response){
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $targetDiv.html(template(response.items))
        response.items.forEach(function(obj){
          console.log(obj.volumeInfo.title, obj.volumeInfo.authors, obj.volumeInfo)
        })
      },
      error: function(request, errorType, errorMessage){
          alert(errorType + " " + errorMessage);
        }
    })
  })
});
