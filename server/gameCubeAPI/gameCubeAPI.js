import config from '../config/config.js'
import http    from 'http'

const gameCubeAPIdata = function(path, ok_callback, err_callback)
{
    var options = {
        hostname: config.gameCubedataHost,
        port: '80',
        path: path,
        method: 'GET',
        headers: {
            "DAIWAN-API-TOKEN": config.dataToken
        }
    };

    var client = http.request(options, (res2) => {
        var data = '';
        res2.setEncoding('utf8');
        res2.on('data', (chunk) => {
            data += chunk;
        });
        res2.on('end', () => {
            //res.send(data);
            if(ok_callback)
                ok_callback(data);
            //console.log(data);
        });
    });

    client.end();
}

const gameCubeAPIvideo = function(path, ok_callback, err_callback)
{
    var options = {
        hostname: config.gameCubevideoHost,
        port: '80',
        path: path,
        method: 'GET',
        headers: {
            "DAIWAN-API-TOKEN": config.videoToken
        }
    };

    var client = http.request(options, (res2) => {
        var data = '';
        res2.setEncoding('utf8');
        res2.on('data', (chunk) => {
            data += chunk;
        });
        res2.on('end', () => {
            //res.send(data);
            if(ok_callback)
                ok_callback(data);
            //console.log(data);
        });
    });

    client.end();
}

export default {gameCubeAPIdata, gameCubeAPIvideo};
