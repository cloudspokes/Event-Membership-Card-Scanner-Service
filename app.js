
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();
var port = process.env.PORT || 3000;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.get('/members', function(req, res){
	
	var output = { "message": "No records found." };
	
	if (req.query["lname"] == 'Smith') {
		output = { "status":"Current", "message": "Success", "name": "Tim Smith", "membership_category": "category 1", "account": "123-ABC", "expiration_date": "20121125" };
	} else if (req.query["zip"] == '11111') {
		output = { "status":"Current", "message": "Success", "name": "Mike Jones", "membership_category": "category 3", "account": "ZZZ-098", "expiration_date": "20121018" };
	}

	var body = JSON.stringify(output);
	res.writeHead(200, {
	  "Content-Type": "application/json",
	  "Access-Control-Allow-Origin": "*"
	});

	res.end(body);

 });

app.get('/members/:id', function(req, res){
	
	var output = { "message": "No record found." };
	
	if (req.params.id == '1') {
		output = { "status":"Expired", "message": "Success", "name": "Tim Smith", "membership_category": "category 1", "account": "123-ABC", "expiration_date": "20121125" };
	} else if (req.params.id == '2') {
		output = { "status":"Current", "message": "Success", "name": "Mike Jones", "membership_category": "category 3", "account": "ZZZ-098", "expiration_date": "20111018" };
	}

	var body = JSON.stringify(output);
	res.writeHead(200, {
	  "Content-Type": "application/json",
	  "Access-Control-Allow-Origin": "*"
	});

	res.end(body);

 });

app.post('/visitations/:date/:id', function(req, res){

	var output = '{ "message": "success", "guests": '+req.body.guests+'}';
	var body = JSON.stringify(output);
	res.writeHead(200, {
	  "Content-Type": "application/json",
	  "Access-Control-Allow-Origin": "*"
	});

	res.end(body);
	
	// curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"guests":5}'  http://localhost:3001/visitations/20121125/1

 });

app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
