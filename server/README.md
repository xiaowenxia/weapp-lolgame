## 使用Let's Encrypt安装免费证书

参考Let's Encrypt官方的安装链接：
[https://certbot.eff.org/#ubuntutrusty-other](https://certbot.eff.org/#ubuntutrusty-other)

### 安装certbot
```sh
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot 
```
### 运行certbot
```sh
$ sudo certbot certonly
```
安装提示完成安装即可。

使用[www.myssl.cn](https://www.myssl.cn/tools/check-server-cert.html)这个网站检查一下证书是否正常，正常情况下3个证书应该都是正常的。
#### 注意使用证书的时候一定要用fullchain.pem,这个有中间证书，android系统如果没有中间证书的话会认为证书无效的。