module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
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
      },
      js:{
        files:[
          {expand:true, cwd:'src/js', src:['**/*.js'], dest:'build/js'}
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
      js:{
        files: ['src/js/**/*.js'],
        tasks: ['copy:js'],
        options: {
          livereload: true,
          spawn: false
        }
      },
      image:{
        files: ['src/image/**/*'],
        tasks: ['imagemin'],
        options: {
          livereload: true,
          spawn: false
        }
      }
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
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/image',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'build/image'                  // Destination path prefix
        }],
        options:{
          optimizationLevel: 3
        }
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['copy:html', 'compass:dev', 'connect:livereload', 'watch']);
  grunt.registerTask('build', ['cssmin', 'copy:js', 'imagemin']);
};