
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
  $('#BeerSearch').on('click', function(e){
    $targetDiv.empty();
    var $searchBeer = $('#SearchBeer');
    //this sets up the url for the server to take as query info
    var url = 'request/beer?name=' + encodeURI($searchBeer.val());
    $searchBeer.val('');
    e.preventDefault();
    $.ajax({
      url: url,
      dataType: 'json',
      crossDomain: true,
      success: function(response){
        if (response.length == 0) {
          response.push({ style: {name: 'None found',
                                  description: 'None'}});
        };
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
  $('#FermSearch').on('click', function(e){
    $targetDiv.empty();
    e.preventDefault();
    var $searchFerm = $('#SearchFerm');
    var url = 'request/fermentables?type=' + encodeURI($searchFerm.val());
    $searchFerm.prop('selectedIndex', 0);
    $.ajax({
      url: url,
      dataType: 'json',
      success : function(response) {
        console.log(response);
        if (response.length == 0) {
          response.push({ style: {name: 'None found',
                                  description: 'None'}});
        };
        //take the object that was returned and append it to the DOM
        var source = $("#ferm-entry-template").html();
        var template = Handlebars.compile(source);
        $targetDiv.html(template(response));
      },
      error: function(request, errorType, errorMessage){
        alert(errorType + " " + errorMessage);
      }
    })
  })
  $('#Clear').on('click', function(e){
    e.preventDefault();
    $targetDiv.empty();
  })
});
