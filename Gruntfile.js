var livereloadPort = 35729;
var lrSnippet = require('connect-livereload')({
  port: livereloadPort
});
var mountFolder = function(connect, dir){
  return connect.static(require('path').resolve(dir));
}
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('connect-livereload');  

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 8000,
        hostname: '*',
        open: {
          target: 'http://localhost:8000'            
        }
      },
      livereload: {
        options: {
          middleware: function(connect){
            return [lrSnippet, mountFolder(connect, 'build')];
          }
        }
      }
    },

    copy: {
      html: {
        files: [
          {expand: true, src: ['src/*.html'], dest: 'build/', flatten: true}
        ]
      }
    },
    
    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false
        }
      },
      livereload: {
        options:{
          livereload: livereloadPort
        },
        files:['build/*.html']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['copy:html', 'connect:livereload', 'watch']);
};