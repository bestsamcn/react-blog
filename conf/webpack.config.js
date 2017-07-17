var webpack = require('webpack');
var path = require('path');
process.env.NODE_ENV = '"development"';
var HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react': path.join(process.cwd(), 'node_modules', 'react')
        },
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader?limit=1000000'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },

    //开启sourcemap方便调试
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        })
    ]
}
