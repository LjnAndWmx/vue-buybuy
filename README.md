# 基于 vue.js 2.x 开发 vue 项目 采用 vue+webpack 搭建的程序

###安装
        项目地址：(git clone)
        git clone git@github.com:LjnAndWmx/vue-buybuy.git
        通过 npm 安装本地服务第三方依赖模块(需要安装 node.js)
        cnpm i
        启动服务(http://localhost:8080)
        cnpm run dev
        发布代码
        cnpm run build 
###项目架构
        ├── README.md  
        ├── build // 构建服务和 webpack 配置
        ├── config // 项目不同环境的配置
        ├── dist // 项目 build 目录
        ├── index.html // 项目入口文件
        ├── package.json // 项目配置文件
        ├── src // 生产目录
        │ ├── assets // css js 和图片资源
        │ ├── components // 各种组件
        │ ├── views // 各种页面
        │ ├── vuex // vuex 状态管理器
        │ ├── filters.js // 各种过滤器
        │ └── main.js // Webpack 预编译入口
