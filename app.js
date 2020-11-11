const express = require("express");
const app = express();
const router = require("./router");
app.listen(4000);

// 设置视图模版引擎
app.set("view engine","ejs");

//设置post请求参数获取方式
app.use(express.urlencoded({extended:true}))

//设置根目录
app.use(express.static("./public"))
app.use(express.static("./uploads"))
//访问localhost:4000
app.get("/",function (req,res) {
    //请求跳转到相册的请求中去(重定向)
    res.redirect("/album");
});

//请求主要分为两大类:
//相册(文件夹)相关的请求,相片(文件)相关的请求

//处理所有以/album开头的请求
app.use("/album",router.album);

//处理所有以/pic开头的请求
app.use("/pic",router.pic);
