module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 8000,
        hostname: '*',
        base: 'build',
        open: {
          target: 'http://localhost:8000/'
        }
      },
      livereload: {
        options: {
          open: true
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
          livereload: true,
          spawn: false
        }
      },
      sass:{
        files: ['src/sass/**/*'],
        tasks: ['compass:dev'],
        options:{
          livereload: true
        }
      },
    },

    compass: {
      dev:{
        options:{
          sassDir: 'src/sass',
          cssDir: 'build/css'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      build: {
        files: {
          'build/css/main.min.css': ['build/css/main.css']
        }
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['copy:html', 'compass:dev', 'connect:livereload', 'watch']);
  grunt.registerTask('build', ['cssmin']);
};