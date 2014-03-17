module.exports = function (grunt) {
    var configData = grunt.config.data,
        appName = configData.appName;

    return {
        options: {
            banner: '// https://github.com/webschik/userAgent\n' +
                '(function (window, document, navigator, undefined) {\n',
            footer: "\nif (typeof define === 'function' && define.amd) {define('" + appName +
                "', [], function(){return " + appName + ";});}this." + appName + " = " + appName + ";\n}(window, document, navigator));"
        },
        dist: {
            src: [
                'src/def.js',
                'src/getSimpleObject.js',
                'src/stringify.js',
                'src/browser.js',
                'src/collect.js',
                'src/getKey.js',
                'src/network.js',
                'src/os.js',
                'src/support.js',
                'src/main.js'
            ],
            dest: appName + '.' + configData.appVersion + '.js'
        }
    };
};