// karma.conf.cjs
const webpackConfig = require('./webpack.config.test.cjs'); 

module.exports = function(config) {
  config.set({
    
    logLevel: config.LOG_INFO, 

    frameworks: ['jasmine'],
    
    files: [
      'src/tests/**/*.js',
      'src/tests/**/*.jsx'
    ],

    preprocessors: {
      'src/tests/**/*.js': ['webpack'],
    },

    webpack: webpackConfig,
    reporters: ['spec'],
    
    browsers: ['ChromeHeadless'], 
    
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'), 
      require('karma-spec-reporter')
    ],
    singleRun: true,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};