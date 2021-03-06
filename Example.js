/**
 * 
 */

// An example of how to use the WunderNode client.
//
// By Andrew Anderson
// git: www.github.com/evalcrux
// Changes by lgriffin include defintion of country and city
// Imports
var config = require('./config/development');
// Changes by bacall213 include clarification on how to use the Wundernode client,
// including removal of unused city and country variables, and an example query.

var WunderNodeClient = require("wundernode");
var URL = require('url');
// Definitions


// Location is passed to the Wunderground API via the query returned by Express
// Example query: http://127.0.0.1:3000/conditions?New York,NY
// Generates this request: http://api.wunderground.com/api/<API_KEY>/conditions/q/New%20York,NY.json

// Set to true if you want to see all sort of nasty output on stdout.
var debug = false;

// Create Client
var wunder = new WunderNodeClient(config.api, debug,  10, 'minute');

var express = require('express');

var app = express();


app.get('/', function(req, res) {
        res.end('Hello from wundernode!');
});


app.get('/conditions', function(req, res){
   var query = URL.parse(req.url).query;
   console.log('query: ' +  query);
    wunder.conditions(query, function(err, obj) {
            if (err){
                    console.log('errors: ' + err);
                    res.end("Error processing query string:" + queryData.query);
            }
            res.end(obj);
    });
});

app.get('/almanac', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.almanac(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/forecast', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.forecast(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/forecast10day', function(req, res) {
   var query = URL.parse(req.url).query;
   console.log('getting forecast for loc: ' + query); 
   
    wunder.forecast10day(req.query.loc, function(err, obj) {
         res.end(obj);
    });
});

app.get('/geolookup', function(req, res) {
   var query = URL.parse(req.url).query;
   console.log('finding location for geoloc: ' + JSON.stringify(queryData));
   
   wunder.geolookup(query, function(err, obj) {
            res.end(obj);
    });
   
});

app.get('/hourly', function(req, res){
    var queryData = URL.parse(req.url);
    wunder.hourly(queryData.query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/hourly7day', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.hourly7day(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/hourly10day', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.hourly10day(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/yesterday', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.yesterday(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/history', function(req, res){
    var query = URL.parse(req.url).query;
    var date = URL.parse(req.url).date; //format YYYYMMDD
    wunder.history(query, date, function(err, obj) {
        res.end(obj);
    });
});

app.get('/planner', function(req, res){
   var queryData = URL.parse(req.url, true);
   console.log('queryData.range: ' + queryData.range);
   console.log('queryData.query: ' + queryData.query);
   var query = queryData.query;
   var range = queryData.range;
   if (!query || !range) {
      res.send(400, 'Required parameters missing, invalid query');
      res.end();
   }
   console.log('queryData: ' + JSON.stringify(queryData));
    wunder.planner(query, range, function(err, obj) {
            res.end(obj);
    });
});

app.get('/satellite', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.satellite(query, function(err, obj) {
            res.end(obj);
    });
});

app.get('/webcams', function(req, res){
    var query = URL.parse(req.url).query;
    wunder.webcams(query, function(err, obj) {
      res.end(obj);
    });
});



app.listen(3000);




