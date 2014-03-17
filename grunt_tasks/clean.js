module.exports = function (grunt) {
    var configData = grunt.config.data,
        appName = configData.appName;

    return {
        src:  [
            appName + '.*.js',
            appName + '.*.min.js'
        ]
    };
};