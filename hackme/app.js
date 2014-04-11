var express = require('express');

var app = express(express.logger());
app.use(express.logger());

//handle request for "/"
app.get("/", function(res, req){
	req.send("Welcome to hackme");
});

app.get("/pika", function(res, req){
	req.send("Where is my pikapika?");
});

//this is never executed
//post: html form, set in a form test
//$ quote in jquery -> send in post request
//curl connect to url
//curl -d "" http...
app.post("/submit.json", function(res, req) {
	req.send("you found me alr");
});

app.get("/wutang", function(res, req){
	req.send(500);
});


var port = process.env.PORT || 5000; //look for process.env.port, if not found, get 5000
app.listen(port, function(){
	console.log("Listening on "+port);
});