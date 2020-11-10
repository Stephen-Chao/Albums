//相册的路由,处理与相册相关的请求
const router = require("express").Router();
const file = require("../model/file.js");

//处理/album请求,显示当前服务器上的所有相册
router.get("/",function (req,res) {
    //获取服务器上的所有相册()
    /*读取文件夹的路径不能一当前文件为标准,要以项目根目录为标准*/
    var files = file.getContents("./uploads",function (err,files) {
        //console.log(files)
        //
        //处理数据,根据结果将数据渲染到视图中
        if(err){
            res.render("index",{albums:null});
            return ;
        }
        // console.log(files);
        res.render("index",{albums:files});
    });

});

//处理get方式的/album/create请求,跳转到创建文件夹的页面
router.get("/create",function (req,res) {
    res.render("create");
});

//处理post的/album/check的请求,检查in过程是否存在
router.post("/check",function (req,res) {
    //获取请求参数
    var dirName = req.body.dirName.trim();
    if(dirName ==""){
        res.send({status:"failed",msg:"相册名不能为空"});
        return;
    }
    //获取当前服务器上有哪些相册
    var files = file.getContents("./uploads",function (err,files) {
        if(err){//获取内容失败
            console.log(err);
            res.send({status:"failed",msg:"获取失败"})
            return ;
        }
        //获取内容成功
        //判断files中是否包含dirName
        if(files.includes(dirName)){
            //包含
            //说明文件夹名称已经存在
            res.send({status:"failed",msg:"相册名已经存在"});
            return;
        }
        // 文件夹不存在,可以创建
        file.create("./uploads/"+dirName,function (err) {
            if(err){
                console.log(err);
                res.send({status:"failed",msg:"创建失败"});
            }
            res.send({status:"success",msg:"创建成功"});
        })
    });
});

//暴露路由
module.exports = router;
