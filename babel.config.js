module.exports = function (api) {

    if ('development' === api.env()) {
        return {
            presets: [
                ['@babel/preset-react', {
                    development: true
                }]
            ]
        }
    }

    return {
        plugins: [
            ['@babel/plugin-transform-runtime', {
                helpers: true
            }],
        ],
        presets: [
            ['@babel/preset-env', {
                debug: true,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                bugfixes: true
            }],
            ['@babel/preset-react']
        ]
    };
};
