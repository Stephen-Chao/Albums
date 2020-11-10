//模型层,数据层,操作文件相关的事情
const fs = require("fs");

/*读取文件夹的内容*/
/**
 *
  * @param {String} dirname 被读取的文件夹的名称
 */
function getContents(dirname,callback) {
    fs.readdir(dirname,function (err,files) {
        // console.log("------");
        // console.log(dirname);
        // console.log(err);
        // console.log("------");
        //异步方法返回数据不能使用return
        // return files;
        // if(err){
        //     callback(err,null);
        // }else{
        //     callback(null,files)
        // }
        callback(err,files);
    });
}

/**
 * 根据给定的名称创建文件夹
  * @param dirName {string} 文件夹名称
 */
function create(dirName,callback) {
    fs.mkdir(dirName,function (err) {
       callback(err);

    });
}
//暴露
module.exports = {
    getContents:getContents,
    create:create
}
