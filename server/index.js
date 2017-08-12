import express from 'express'
import https from 'https'
import fs from 'fs'
import api     from './gameCubeAPI/gameCubeAPI'
import config from './config/config'

var app = express();

/**
 * CORS support.
 */
app.all('*', function (req, res, next) {
    //console.log("fdsafdsa")
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

/* 代理所有带玩数据API */
config.apiDataList.forEach((e) => {
    app.get(e, function(req, res){
        //console.log(req);
        console.log(req.url);
        api.gameCubeAPIdata(req.url, (data) => {
            res.send(data);
        })
    });
})

/* 代理所有带玩视频API */
config.apiVideoList.forEach((e) => {
    app.get(e, function(req, res){
        //console.log(req);
        console.log(req.url);
        api.gameCubeAPIvideo(req.url, (data) => {
            res.send(data);
        })
    });
})

/* 启动https */
var options = {
    key: fs.readFileSync(config.httpsKeyFile),
    cert: fs.readFileSync(config.httpsCertFile)
};

https.createServer(options, app).listen(443);