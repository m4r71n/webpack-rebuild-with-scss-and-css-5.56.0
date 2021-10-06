process.env.NODE_ENV = 'development';

const path = require('path');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.config.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {WebpackPluginServe: Serve} = require('webpack-plugin-serve');

const webpackconfig = merge(base, {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        dev: [
            './js/app.js',
            'webpack-plugin-serve/client'
        ]
    },
    module: {
        unsafeCache: true,
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, './sass')
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.join(__dirname, './node_modules')
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },


    output: {
        path: path.join(__dirname, 'dist'),
        pathinfo: false,

        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name].css',

            experimentalUseImportModule: true
        }),

        new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'wps'
            }
        }),

        new Serve({
            host: '127.0.0.1'
        }),
    ],

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                cacheGroupName: {
                    chunks: 'all',
                    name: 'dependencies',
                    test(module, chunks) {
                        const context = module.context;

                        if (context && (context.indexOf('webpack-plugin-serve') !== -1)) {
                            return false;
                        }
                        if (context && (context.indexOf('react-refresh-webpack-plugin') !== -1)) {
                            return false;
                        }

                        return context && context.indexOf('node_modules') >= 0;
                    },
                }
            }
        }
    },

    watch: true,
});

module.exports = webpackconfig;



