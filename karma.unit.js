var webpackConfig = require("./webpack.config");

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "karma-typescript"],
    files: ["test/**/*.ts"],
    exclude: [],
    preprocessors: {
      "test/**/*.ts": ["webpack"]
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ["mocha", "karma-typescript"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: true,
    concurrency: Infinity,
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    webpackMiddleware: {
      stats: "errors-only"
    },

    coverageReporter: {
      reporters: [{ type: "text-summary" }]
    }
  });
};
