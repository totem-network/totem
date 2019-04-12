const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const config = {
    entry: {
        app: [
            '@babel/polyfill',
            './src/index.tsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/app'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                sideEffects: false,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'assets/images',
                to: 'images'
            },
            {
                from: 'assets/manifest.json'
            },
            {
                from: 'assets/browserconfig.xml'
            }
        ]),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new InjectManifest({
            importWorkboxFrom: 'local',
            swSrc: './src/service-worker.js',
            include: /\.(html|js|svg)$/
        })
    ],
    resolve: {
        // TODO: when material ui supports this: https://github.com/developit/preact-compat/issues/476
        alias: {
            /*"react": "preact-compat",
            "react-dom": "preact-compat"*/
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            path.resolve('./src'),
            path.resolve('./assets'),
            path.resolve('./build/contracts'),
            path.resolve('./node_modules')
        ]
    }
};

module.exports = config;