var http = require('http');
var urlParse = require('url');
var request = require('request');
var fs = require('fs');
var _ = require('lodash/array');
const PORT = 3000;
const apiKey = 'ba61a7796977ef4f2c21f8340f4f6bbf'
//this function parses the URL and sends back data based on url - /request adds the ?name=[userentry] to query the api.
function requests(req, res){
  //turn URL into an object
  var parsedURL = urlParse.parse(req.url, true);
  switch(parsedURL.pathname){
    //return the scripts file on request
    case '/scripts.js':
      res.writeHead(200, {'Content-type': 'application/javascript'});
      fs.readFile('scripts.js', function(err, data){
        if (err) throw err;
        res.end(data);
      });
      break;
    //return the css file on request
    case '/styles.css':
      res.writeHead(200, {'Content-type': 'text/css'});
      fs.readFile('styles.css', function(err, data){
        if (err) throw err;
        res.end(data);
      })
      break;
    //return the index.html file on request
    case '/':
      res.writeHead(200, {'Content-type': 'text/html'})
      fs.readFile('index.html', function(err, data){
        if (err) throw err;
        res.end(data);
      })
      break;
    //return the search string on request
    case '/request':
      //this request function puts together the api query url and then parses the data, removes duplicates, and sends the array of unique objects back
      request('http://api.brewerydb.com/v2/beers/' + parsedURL.search + '&key=' + apiKey + '&format=json', function(error, response, data){
        if (error) throw error;
        var apiData = JSON.parse(data);
        var uniqueAPIData = _.uniq(apiData.data, 'styleId');
        res.end(JSON.stringify(uniqueAPIData));
      })
      break;
  }

};
var server = http.createServer(requests);

server.listen(PORT, function(){
  console.log("Listening, Port: " + PORT);
})
