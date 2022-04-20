var connect = require('connect');
var logger = require("morgan"); 
var serve_static = require("serve-static"); 
var http = require('http');
var ejs = require('ejs');

var app = connect()
    .use (logger('dev'))
    .use (serve_static('public'))
    .use (serve);

http.createServer(app).listen(3000);

function serve (req, res) {
	if (req.url == "/mapper_ajax") {
        render (res, "mapper_ajax", {});
    } 
    else if(req.url == "/index"){
        render (res, "index", {});
    }
}

function render (res, view, model) {
    ejs.renderFile("public/" + view + ".ejs" ,model,
       function(err, result) {
           if (!err) {
               res.end(result);
           }
           else {
               res.end("An error occurred");
           }
       }
   );
}

