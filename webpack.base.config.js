const isDevelopment = process.env.NODE_ENV !== 'production';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, '.'),

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, './js')
                ],

                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
        ]
    },

    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        })
    ],

    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'app': path.join(__dirname, './js'),
        },
        modules: [path.join(__dirname, './node_modules')],
        fallback: {
            'stream': false
        }
    }
};
