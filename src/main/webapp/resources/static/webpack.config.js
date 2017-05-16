var path = require('path');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = (envOptions) => {
    envOptions = envOptions || {};
    const config = {
        entry: {
            main: './main.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].bundle.js'
        },
        resolve: {
            modules: [
                path.resolve(__dirname, "node_modules"),
            ],
            extensions: ['.ts', '.js', '.html']
        },
        module: {
            rules: [
                { test: /\.html$/, loader: 'html-loader' },
                
                { test: /\.css$/,
                  use: [ 'style-loader', 'css-loader' ]
                },
                { test: /\.ts$/,
                    loaders: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                        } ,
                            'angular2-template-loader'
                    ] 
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=public/fonts/[name].[ext]'
                }
            ]
        },
        devtool: '#source-map',
    };
    if (envOptions.MODE === 'prod') {
        config.plugins = [
            /*new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),*/
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false // we need this for lazy v8
                },
                comments: false
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)@angular/,
                __dirname
            ),
            new HtmlWebpackPlugin({
                title: 'Dashboard',
              //  template: 'index.ejs', // Load a custom template (ejs by default see the FAQ for details) 
                inject: 'body'
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ];
    }
    return config;
};