const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log("@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@");
module.exports = {
    devtool: "source-map",
    performance: {
        hints: false
    },
    entry: {
        app: "./src/bootstrap.ts" // JiT compilation
    },
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: "dist/[name].bundle.js",
        chunkFilename: "dist/[id].chunk.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
    },
    devServer: {
        historyApiFallback: true,
        stats: "minimal",
        open: true,
        inline: true,
        port: 9000,
        contentBase: path.join(__dirname, "wwwroot/"),
        watchContentBase: true
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //to support eg. background-image property 
                loader: "file-loader",
                query: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images/'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                query: {
                    limit: '10000',
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/'
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
                    /*loader: ExtractTextPlugin.extract("style-loader", "css-loader") */
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
                    /* loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader") */
            },
            {
                test: /favicon.ico$/,
                loader: "file-loader?name=/[name].[ext]"
            },

            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: ["app"] }),

        new CleanWebpackPlugin(["./wwwroot/dist", "./wwwroot/assets"]),

        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: false,
            template: "./index.html"
        }),

        new CopyWebpackPlugin([
            { from: "./assets/", to: "assets/" }
        ])
    ]
};