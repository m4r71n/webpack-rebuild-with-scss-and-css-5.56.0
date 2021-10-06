module.exports = (api) => {
    // `api.file` - path to the file
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases

    if (api.mode === 'development') {
        return {
            plugins: [
                'autoprefixer'
            ],
        }
    }

    return {
        plugins: [
            'autoprefixer'
        ],
    };
};