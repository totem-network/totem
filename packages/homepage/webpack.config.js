var webpack = require('webpack');
var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
 
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        rules: [
        {
            test: /\.jsx?/i,
            loader: 'babel-loader',
            options: {
                plugins: [
                    ['transform-react-jsx', { pragma: 'h' }]
                ]
            }
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/assets'
            }
        ]),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new GenerateSW({
            clientsClaim: true,
            exclude: /\.(mp4|webm|png|woff|woff2)$/,
            runtimeCaching: [
                {
                    urlPattern: /\.(mp4|webm)$/,                
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'video-cache'              
                    }
                },
                {
                    urlPattern: /\.(png)$/,                
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'image-cache'
                        // TODO: expires
                    }
                },
                {
                    urlPattern: /\.(woff|woff2)$/,                
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'font-cache'              
                    }
                }
            ],
            skipWaiting: true
        })
    ],
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat",
            "create-react-class": "preact-compat/lib/create-react-class",
            "react-dom-factories": "preact-compat/lib/react-dom-factories"
        },
        extensions: ['.js', '.jsx', '.json'],
    }
}