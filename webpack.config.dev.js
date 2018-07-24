const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(ttf|woff|eot|svg|jpg|img|png)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
     resolve: {
        alias: {
            '@': path.join(__dirname, "src"),
          },
         extensions: ['.vue','.js', '.css','*',]
  },
  devServer:{
    overlay: true,
    open:true
  },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './template.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",    //webpack会检测模块代码有没有使用jq,有就会自动帮你import
            jQuery: "jquery"
        })
    ]
}