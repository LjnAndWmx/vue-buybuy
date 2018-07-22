const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                test: /\.(ttf|woff|eot|svg|jpg)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
     resolve: {
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
        })
    ]
}