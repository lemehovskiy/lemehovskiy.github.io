const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    watch: NODE_ENV == 'development',

    entry: {
        index: './src/entry.js',
        another: './src/another-module.es6',
        canvas_confetti: './src/canvas-confetti.es6'
    },

    output: {
        path: __dirname,
        filename: 'build/' + '[name].bundle.js'
    },


    plugins: [

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin("build/styles.css"),

        new webpack.ProvidePlugin({
            THREE: "three",
        }),

        new HtmlWebpackPlugin({
            template: 'src/html/pages/index.pug',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/lem-youtube.pug',
            filename: 'lem-youtube/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/lem-counter.pug',
            filename: 'lem-counter/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/three-js-experiments.pug',
            filename: 'three-js-experiments/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/three-js-experiments-2.pug',
            filename: 'three-js-experiments/experiment-2.html',
            chunks: ['another']
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/canvas-confetti.pug',
            filename: 'canvas/confetti-1.html',
            chunks: ['canvas_confetti']
        })

    ],

    module: {

        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 4 version']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },

    devServer: {
        stats: 'errors-only'
    },

    // devtool: NODE_ENV == 'development' ? "eval" : false,
    devtool: false,

    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }



};
