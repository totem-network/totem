const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebextensionPlugin = require('webpack-webextension-plugin');

module.exports = {
    src: 'scripts/browser-extension',
    packageTarget: 'build/browser-extension/packages/[vendor]',
    target: 'build/browser-extension/[vendor]',
    webpack: (config, { dev, vendor }) => {

        const totemUrl = dev ? 'https://localhost:8080' : 'https://totem.app';

        config.plugins = config.plugins.map((plugin) => {
            if (plugin instanceof WebextensionPlugin) {
                return new WebextensionPlugin({
                    vendor,
                    manifestDefaults: {
                        "content_scripts": [
                            {
                                "js": ["./scripts/contentApplication.js"],
                                "matches": [
                                    "file://*/*",
                                    "http://*/*",
                                    "https://*/*"
                                ],
                                "exclude_matches": [
                                    totemUrl + '/*'
                                ],
                                "run_at": "document_start",
                                "all_frames": true
                            },
                            {
                                "js": ["./scripts/contentTotem.js"],
                                "matches": [
                                    totemUrl + '/*'
                                ],
                                "run_at": "document_start",
                                "all_frames": true
                            }
                        ]
                    }
                });
            }

            return plugin;
        });
        
        config.plugins.push(
            new CopyWebpackPlugin([
                {
                    from: path.resolve('./app/assets/images/icon/logo_128x128.png'),
                    to: 'images/logo_128x128.png'
                },
                {
                    from: 'scripts/message/inpage.js',
                    to: 'scripts/web-accessible/message.js'
                }
            ])
        );

        config.plugins.push(
            new webpack.DefinePlugin({
                'TOTEM_URL': JSON.stringify(totemUrl)
            })
        )
        
        return config;
    }
};