var https = require('https');
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var options = {
    key: fs.readFileSync('./cert/chyingp-key.pem'),
    cert: fs.readFileSync('./cert/chyingp-cert.pem')
};

/*var server = https.createServer(options, function(req, res) {
    console.log('request');
    res.end('hello');
});

server.listen(3000);
*/
var options = {
    "method": "GET",
    "headers": {
        "DAIWAN-API-TOKEN": "84462-B8237-46CD6-52526"
    }
};

var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
        chunks.push(chunk);
    });

    res.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

// openssl x509 -req -in chyingp-csr.pem -signkey chyingp-key.pem -out chyingp-cert.pem