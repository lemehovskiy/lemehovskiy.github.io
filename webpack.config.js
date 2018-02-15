const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    watch: NODE_ENV == 'development',

    entry: {
        index: './src/entry.js',
        three_js_experiments: './src/three_js_experiments.es6',
        canvas_confetti: './src/canvas-confetti.es6',
        lem_gmaps_page: './src/lem_gmaps_page.es6'
    },

    output: {
        filename: 'build/' + '[name].bundle.js',
        path: __dirname
    },


    plugins: [

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin("build/styles.css"),

        new webpack.ProvidePlugin({
            THREE: "three"
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
            template: 'src/html/pages/lem-gmaps/index.pug',
            filename: 'lem-gmaps/index.html',
            chunks: ['index', 'lem_gmaps_page']

        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/lem-counter.pug',
            filename: 'lem-counter/index.html',
            chunks: ['another']
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/three-js-experiments-confetti-1.pug',
            filename: 'three-js-experiments/confetti-1.html',
            chunks: ['index', 'three_js_experiments']
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/pages/three-js-experiments-physics-1.pug',
            filename: 'three-js-experiments/physics-1.html',
            chunks: ['index', 'three_js_experiments']
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
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development',
                                minimize: NODE_ENV == 'production'
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 4 version']
                                    })
                                ],
                                sourceMap: 'inline'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development'
                            }
                        }
                    ]
                })

            },

            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=100000'
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
