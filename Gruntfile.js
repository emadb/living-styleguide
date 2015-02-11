module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          keepalive: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['connect']);

  grunt.loadNpmTasks('grunt-contrib-connect');
};