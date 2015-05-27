module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        src: '../.meteor/local/build/programs/web.browser/*.css',
        dest: '../../crystal/vendor/assets/stylesheets/core.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy']);

};
