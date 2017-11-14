const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: "file-loader?name=assets/fonts/[name]-[hash:6].[ext]"
            },
            {
                test: /favicon.ico$/,
                loader: "file-loader?name=/[name].[ext]"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
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
            inject: 'body',
            template: "./index.html"
        }),

        new CopyWebpackPlugin([
            { from: "./style/images/*.*", to: "assets/", flatten: true }
        ])
    ]
};