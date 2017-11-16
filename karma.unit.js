var webpackConfig = require("./webpack.config");

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["mocha", "chai", "sinon"],
        files: [
            "./assets/js/jquery.min.js",
            "test/**/*.ts"
        ],
        exclude: [],
        preprocessors: {
            "test/**/*.ts": ["webpack", "sourcemap"]
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ["mocha"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["PhantomJS"],
        singleRun: true,
        concurrency: Infinity
    });
};