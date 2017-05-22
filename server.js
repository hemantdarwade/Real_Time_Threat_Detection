var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
//var fs = require('fs');
var port = process.env.PORT || 8080 ;

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
       
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('hacking attempt result:\n\n');
	

   fs.readFile('lb-1.log', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
   var commands = data.split('\n');

for(var i = 0; i < commands.length; i++){
     
      var d = commands[i].split(' ');
	

	for(var j = 0; j < d.length; j++) { 

           var ORIGIN_HEADER = d[3];
if (ORIGIN_HEADER == "\"MATLAB") {
	//console.log("Yes,"+commands[i]);
	res.write("\n\n\n")
	res.write('Yes,'+commands[i]+'\n\n');
	break;
	
	}
else if (ORIGIN_HEADER == "\"MATLAB R2013a") {
	//console.log("Yes,"+commands[i]);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Yes,'+commands[i]+'\n\n');
	break;
	
	}
	
else if (ORIGIN_HEADER == "\"faasos.com\"") {
	//console.log("No,"+commands[i]);
	res.write('No,'+commands[i]+'\n\n');	
	break;
	}


       }
}    
res.end();

});

});

}
server.listen(port);