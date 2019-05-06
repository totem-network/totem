const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const config = {
    entry: {
        app: [
            '@babel/polyfill',
            './app/src/index.tsx'
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
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
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'app/assets/images',
                to: 'images'
            },
            {
                from: 'node_modules/cryptocurrency-icons/svg/icon',
                to: 'images/cryptocurrency-icons'
            },
            {
                from: 'node_modules/@browser-logos',
                to: 'images/browser-logos'
            },
            {
                from: 'app/assets/fonts',
                to: 'fonts'
            },
            {
                from: 'app/assets/apps',
                to: 'apps'
            },
            {
                from: 'app/assets/manifest.json'
            },
            {
                from: 'app/assets/browserconfig.xml'
            }
        ]),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new InjectManifest({
            importWorkboxFrom: 'local',
            swSrc: './app/src/service-worker.js',
            include: /\.(html|js|svg)$/
        })
    ],
    resolve: {
        aliasFields: ['browser'],
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.json'],
        mainFields: ['browser', 'module', 'main'],
        modules: [
            path.resolve('./app/src'),
            path.resolve('./app/assets'),
            path.resolve('./build/contracts'),
            path.resolve('./node_modules')
        ],
        plugins: [
            new TsconfigPathsPlugin({})
        ]
    }
};

module.exports = config;
