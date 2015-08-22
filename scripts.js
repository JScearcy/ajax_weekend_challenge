
$(document).ready(function(){
  //this is for checking the description given for data, otherwise it will return Not Provided
  Handlebars.registerHelper('checkEmptyDescription', function(desc){
    if(!desc){
      return 'Not Provided';
    }
    else {
      return desc;
    }
  })
  //function to check the name to make sure something was provided, otherwise it will return hidden which will add that class to the div
  Handlebars.registerHelper('noName',function(name){
    if(!name){
      return 'hidden'
    }
  })
  $targetDiv = $('#Data');
  //main click listener - on click sends data to simple server to make an api query
  $('#Search').on('click', function(e){
    var $searchPage = $('#SearchPage').val();
    //this sets up the url for the server to take as query info
    var url = 'request?name=' + encodeURI($searchPage);
    e.preventDefault();
    $.ajax({
      url: url,
      dataType: 'json',
      crossDomain: true,
      success: function(response){
        console.log(response);
        //take the object that was returned and append it to the DOM
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $targetDiv.html(template(response));
      },
      error: function(request, errorType, errorMessage){
          alert(errorType + " " + errorMessage);
        }
    })
  })
});
