const CracoLessPlugin = require('craco-less');

module.exports = {
    webpack: {
        configure: {
            ignoreWarnings: [
                {
                    module: /node_modules\/antd/,
                    message: /Failed to parse source map/,
                },
            ],
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};