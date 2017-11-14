const path = require("path");
const webpackConfig = require("./webpack.config");

webpackConfig.module.rules = [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        query: {
            compilerOptions: {
                inlineSourceMap: true,
                sourceMap: false
            }
        }
    },
    {
        test: /\.ts$/,
        enforce: "post",
        loader: "istanbul-instrumenter-loader",
        options: { esModules: true },
        exclude: ["node_modules", /\.spec\.ts$/]
    }
];

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["mocha", "chai", "sinon"],
        files: ["test/**/*.ts"],
        exclude: [],
        preprocessors: {
            "test/**/*.ts": ["webpack", "sourcemap"]
        },
        webpack: {
            devtool: "inline-source-map",
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackMiddleware: {
            noInfo: true
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ["progress", "coverage-istanbul"],
        coverageIstanbulReporter: {
            dir: path.join(__dirname, "coverage"),
            reports: ["html", "lcovonly", "text-summary"],
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            "report-config": {
                html: {
                    subdir: "html"
                }
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["PhantomJS"],
        singleRun: true,
        concurrency: Infinity
    });
};