#!/bin/sh
# Live Demo 01：看 HTTP 的原始樣子
# Windows PowerShell 請把 curl 改成 curl.exe

# 1. 對真的伺服器發一個請求：-i 會把狀態行和 Header 一起印出來
curl -i --http1.1 https://jsonplaceholder.typicode.com/posts/1

# 2. 之後換成自己的（先啟動 NativeApiServer，見 Live Demo 02）
# curl -i http://localhost:8080/api/products
