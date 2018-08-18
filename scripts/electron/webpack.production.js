const merge = require('webpack-merge');
const mainConfig = require('./webpack.config.js');

module.exports = merge(mainConfig, {
    mode: 'production'
});
