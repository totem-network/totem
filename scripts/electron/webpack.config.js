const path = require('path');

const config = {
    context: path.resolve(__dirname, 'main'),
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, './../../build/electron'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                sideEffects: false,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            // path.resolve('./app/src'),
            path.resolve('./node_modules')
        ]
    },
    target: 'electron-main'
};

module.exports = config;
