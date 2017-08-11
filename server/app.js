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
    hostname: 'lolapi.games-cube.com',
    port: '80',
    path: '/Area',
    method: 'GET',
    headers: {
        "DAIWAN-API-TOKEN": "84462-B8237-46CD6-52526"
    }
};

var client = http.request(options, (res) => {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
});

client.end();