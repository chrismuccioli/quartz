module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '../packages/style-core/styles/',
          src: ['util.scss'],
          dest: 'build',
          ext: '.css'
        }]
      }
    },
    concat: {
      dist: {
        src: [],
        dest: '../crystal/vendor/assets/stylesheets/vhx.quartz.1.0.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass:dist']);

};