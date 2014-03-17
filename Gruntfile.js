module.exports = function (grunt) {
    var packageData = JSON.parse(grunt.file.read("package.json"));

    grunt.initConfig({
        appName: packageData.name,
        appVersion: packageData.version
    });

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve(__dirname + '/grunt_tasks'),
        fileExtensions: ['js', 'coffee']
    }, function (err) {
        grunt.log.error(err);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};