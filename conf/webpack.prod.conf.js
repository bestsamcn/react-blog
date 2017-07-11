var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-withimg-loader');
process.env.NODE_ENV = '"development"';

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app:'./src/main.js',
        vendor:['react', 'react-router', 'react-redux', 'axios']
    },
    output: {
        path: path.join(process.cwd(),'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        publicPath: '/dist/'
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
        }, {
            test: /\.(htm|html)$/i,
            loader: 'html-withimg-loader'
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'production'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'vendor.js'
        })
    ]
}
