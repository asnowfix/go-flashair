go-flashair <!-- omit in toc -->
===========

Table of Contents <!-- omit in toc -->
-----------------

- [Notes](#notes)
  - [Config](#config)
  - [Bonjour / mDNS scan](#bonjour--mdns-scan)
    - [Upload file](#upload-file)
  - [List Folder Content](#list-folder-content)
- [References](#references)
  - [Flash-Air Developers](#flash-air-developers)
  - [Others](#others)

GoLang library to access Toshiba FlashAir Wireless SD-Cards

Notes
=====

Config
------

After reset

```ini
[Vendor]

CIPATH=/DCIM/100__TSB/FA000001.JPG
APPMODE=4
APPNETWORKKEY=********
VERSION=FA9CAW3AW3.00.02
CID=02544d535733324740e072e679010701
PRODUCT=FlashAir
VENDOR=TOSHIBA
MASTERCODE=123456789012
```

Write to switch to [STA mode](https://web.archive.org/web/20190916221308/https://www.flashair-developers.com/en/documents/tutorials/advanced/1/):

```ini
[Vendor]

CIPATH=/DCIM/100__TSB/FA000001.JPG
APPMODE=5
APPNAME=myflashair
APPSSID=<ESSID>
APPNETWORKKEY=<passwd>
VERSION=FA9CAW3AW3.00.02
CID=02544d535733324740e072e679010701
PRODUCT=FlashAir
VENDOR=TOSHIBA
MASTERCODE=123456789012
```

After switch to STA mode:

```ini
[Vendor]

CIPATH=/DCIM/100__TSB/FA000001.JPG
APPMODE=5
APPNAME=myflashair
APPSSID=<ESSID>
APPNETWORKKEY=********************
VERSION=FA9CAW3AW3.00.02
CID=02544d535733324740e072e679010701
PRODUCT=FlashAir
VENDOR=TOSHIBA
MASTERCODE=123456789012
```

Bonjour / mDNS scan
-------------------

```bash
sudo apt install mdns-scan
```

```bash
$ mdns-scan
[...]
+ flashair_ec21e5db1e12._http._tcp.local
[...]
```

On the Wi-Fi router:

```
9	ec:21:e5:db:1e:12	flashair_ec21e5db1e12	192.168.1.74	Wifi
```

Access using the IP address:

```
$ curl -v http://192.168.1.74 -o index.htm
*   Trying 192.168.1.74:80...
* TCP_NODELAY set
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to 192.168.1.74 (192.168.1.74) port 80 (#0)
> GET / HTTP/1.1
> Host: 192.168.1.74
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: Xcerebellum/1.0
< Connection: close
< Content-Type: text/html
< 
{ [1372 bytes data]
100 21868    0 21868    0     0  62125      0 --:--:-- --:--:-- --:--:-- 61949
* Closing connection 0
```

### Upload file

Allow upload

```bash
$ curl -v -X POST 'http://192.168.1.74/config.cgi?MASTERCODE=123456789012&UPLOAD=1' 
*   Trying 192.168.1.74:80...
* TCP_NODELAY set
* Connected to 192.168.1.74 (192.168.1.74) port 80 (#0)
> POST /config.cgi?MASTERCODE=123456789012&UPLOAD=1 HTTP/1.1
> Host: 192.168.1.74
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: Xcerebellum/1.0
< Connection: close
< Content-Type: text/plain
< 
* Closing connection 0
SUCCESS
```

Set upload directory

$ curl -X POST 'http://192.168.1.74/upload.cgi?UPDIR=/upload'

Upload file

```bash
$ curl -F data=@101_0324/IMGP9435.JPG -X POST 'http://192.168.1.74/upload.cgi'
```

List Folder Content
-------------------

```javascript
httpObj = new XMLHttpRequest();
httpObj.open("GET", '/command.cgi?op=100&DIR='+dir+'&TIME='+dd.getTime(), false);
httpObj.send(null);
```

```
$ curl -X GET 'http://192.168.1.74/command.cgi?op=100&DIR=/'
WLANSD_FILELIST
,DCIM,0,16,20840,25658
,GUPIXINF,0,16,20840,25658
,IMGP9435.JPG,3731250,32,0,0

$ curl -X GET 'http://192.168.1.74/command.cgi?op=100&DIR=/DCIM'
WLANSD_FILELIST
/DCIM,100__TSB,0,16,20840,25658

$ curl -X GET 'http://192.168.1.74/command.cgi?op=100&DIR=/DCIM/100__TSB'
WLANSD_FILELIST
/DCIM/100__TSB,FA000001.JPG,128617,33,19075,6923
```

List files uploaded one after the other:

```
$ curl -X GET 'http://192.168.1.74/command.cgi?op=100&DIR=/'
WLANSD_FILELIST
,DCIM,0,16,20840,25658
,GUPIXINF,0,16,20840,25658
,IMGP9435.JPG,3731250,32,0,0
,IMGP9479.JPG,1766683,32,0,0
,IMGP9484.JPG,2353637,32,0,0
```

References
==========

Flash-Air Developers
--------------------

1. [Flash-Air Developers Home (WebArchive)](https://web.archive.org/web/20190810024408/https://www.flashair-developers.com/en)
   1.  [WebArchive Parameter: encetamasb/flashair-developers.forum.en.json](https://gist.github.com/encetamasb/ff157dfae29480e9f22ed82f8f2911f1)
   2.  [Using Station Mode](https://web.archive.org/web/20190916221308/https://www.flashair-developers.com/en/documents/tutorials/advanced/1/)
   3.  [API Config](https://www.flashair-developers.com/en/documents/api/config/](https://web.archive.org/web/20190810024408/https://www.flashair-developers.com/en/documents/api/config/)
   4.  [config.cgi / WebDAV](https://web.archive.org/web/20190810023909/https://flashair-developers.com/en/documents/api/configcgi/#WEBDAV)
2. [Flash-Air Developers Source-Code (GitHub)](https://github.com/FlashAirDevelopers)
   1. https://github.com/FlashAirDevelopers/FlashAirFileManager
3. [Flash-Air Developers Forum (Redit)](https://www.reddit.com/r/flashair_developers)
   1. https://www.reddit.com/r/flashair_developers/comments/cxll82/appmode5_wifi_access_working_ping_ok_but_no/
   2. https://www.reddit.com/r/flashair_developers/comments/cmbopo/flashairdeveloperscom_is_closing/
Others
------

1. https://github.com/davecheney/mdns/
2. https://github.com/hashicorp/mdns
3. https://godoc.org/github.com/hashicorp/mdns
4. [Fix for Toshiba FlashAir (or other) SD card initialization #2088](https://github.com/prusa3d/Prusa-Firmware/pull/2088)
5. Hackaday.io - [Reverse Engineering Toshiba Flashair Wifi SD card](https://hackaday.io/project/5558-reverse-engineering-toshiba-flashair-wifi-sd-card)
6. [Using a Toshiba Flashair SD card](https://mattshub.com/blogs/blog/flashair-sd-card)
7. [Using the Toshiba FlashAir card for ML development ](https://www.magiclantern.fm/forum/index.php?topic=17041.0)
8. GitHub Topic: [flashair](https://github.com/topics/flashair)
9. BlackHat USA 2018: [Reversing a Japanese Wireless SD Card From Zero to Code Execution](https://docs.google.com/presentation/d/13OJNOb2IMwp79SDrbxSLF3i7StTgWLdD7QlYpic39r8/edit#slide=id.g3d28bb72e8_5_74)
10. [FlashRE - a set of tools that ease reversing the Toshiba FlashAir cards](https://github.com/guedou/flashre#flashre-tools)
