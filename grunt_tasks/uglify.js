module.exports = function (grunt) {
    var configData = grunt.config.data,
        appName = configData.appName;

    return {
        js: {
            options: {
                compress: true,
                report: false
            },
            'src': appName + '.' + configData.appVersion + '.js',
            'dest': appName + '.' + configData.appVersion + '.min.js'
        }
    };
};