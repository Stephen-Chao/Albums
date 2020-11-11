//图片相关的路由
const router = require("express").Router();
const file = require("../model/file.js");
const fd = require("formidable");
const sd = require("silly-datetime");


//处理/pic/show请求,展示某个文件夹中的图片
router.get("/show",function (req,res) {
    //获取参数:被点击的文件夹名称
    var dirName = req.query.dirname;
    console.log(dirName);
    file.getContents("./uploads/"+dirName,function (err,pics) {
        if(err){
            res.render("show",{imgs:[]});
        }
        //传递图片数组:图片被点击的文件夹名称
        res.render("show",{imgs:pics,Dirname:dirName});
        res.end();
    });
});

//处理get的/pic/uploads请求,跳转到上传文件页面
router.get("/upload",function (req,res) {
    //上传页面需要所有的相册名称
    //获取所有的相册名,传递美upload视图渲染
    file.getContents("./uploads",function (err,files) {
       if(err){
           console.log(err);
           res.render("upload",{status:1,data:"服务器故障,稍后再试"});
           return;
       }
       res.render("upload",{status:0,data:files});
    });
});

//处理post的/pic/upload请求,上传文件
router.post("/upload",function (req,res) {
    //获取表单对象
    var form = new fd.IncomingForm();
    //设置上传文件的临时保存路径
    form.uploadDir = "./temp";
    //解析请求对象
    form.parse(req,function (err,fields,files){
        if(err){
            console.log(err);
            res.send("<h1 style='text-align:center;color:red'>上传失败</h1>")
            return;
        }
        //获取上传的目标文件夹
        var dirName = fields.dirName;
        //获取上传的图片对象
        var pic = files.pic;
        var oldPath = pic.path;//旧路径
        var name = pic.name;
        var arr = name.split(".");
        var ext = "."+arr[arr.length-1];//后缀名
        //设置文件的新名称
        var str = new Date().getTime()+""+Math.floor(Math.random()*8999+1000);
        var newPath = "./uploads/"+dirName+"/"+str +ext;
        //调用修改路径的方法
        file.changeName(oldPath,newPath,function (err) {
           console.log(err);
           res.send();
        });
        res.redirect("/pic/show?dirname="+dirName);
    });
});
module.exports = router;
