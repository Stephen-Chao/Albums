##photo案例
    在线相册

#### 项目结构

    /---    
     |-- public/  静态资源文件,公共资源文件
        |-- js/  存放js
        |-- css/  存放css
        |-- img/   存放图片
        |-- fonts/  存放字体 
     |-- model/  数据层(本案例中为文件的读取操作)
     |-- router/  路由
     |-- uploads/  存放所有的图片
     |-- temp/  上传图片的临时保存路径
     |-- views/  视图模版保存的路径
     |-- node_modules/  npm安装的模块
     |-- app,js  服务器启动文件
     |-- package.json  项目配置文件
     |-- .gitignore  git提交忽略项目的配置
     |-- .git/ 
##### 1.根据项目结构创建对应的文件或目录
    mkdir model public router uploads temp views
##### 2.生成 package.json文件
    npm init -y
    -y表示所有参数都默认
##### 3.git init 初始化本地仓库
##### 4.将bootstrap文件拖到public中
    bootstrap中的js文件夹,css文件夹,fonts文件夹全部拖到public中
##### 5.在.gitignore问价中添加三行
    node_modules/
    uploads/
    temp/
    作用:git忽略该三个文件夹
##### 6.提交

##### 7.安装依赖
    **
        cnpm命令和npm命令的效果是一样的
        cnpm师从国内的镜像下载的依赖模块,npm是从国外下载
        **在同一个项目中,cnpm和npm不能混合使用                      
    **                      
>- express
>- ejs
>- rimraf
>- silly-datatime
>- formidable

>cnpm express ejs rimraf silly-datatime formidable -S
    
    PS:
        package.json中的dependencies选项中的依赖会通过npm(cnpm) i 命令自动安装
