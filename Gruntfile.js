module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          keepalive: true,
          base: 'build', 
          open: {
            target: 'http://localhost:8000'            
          }
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['src/*.html'], dest: 'build/', flatten: true}
        ]
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['copy:main', 'connect']);
};