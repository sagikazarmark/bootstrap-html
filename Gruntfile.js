module.exports = function(grunt) {
  "use strict";

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootstrap HTML v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n\n',

    clean: {
      dist: ['dist/']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
          'bower_components/bootstrap-select/bootstrap-select.js',
          'bower_components/bootstrap-spinner/dist/bootstrap-spinner.js',
          'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
          'bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js'
        ],
        dest: 'dist/assets/js/bootstrap.js'
      }
    },

    less: {
      dist: {
        files: {
          'dist/assets/css/style.css': 'less/style.less'
        }
      }
    },

    copy: {
      js: {
        src: 'js/*',
        dest: 'dist/assets/'
      },
      vendor_js: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/jquery-bootswatch/jquery.bootswatch.js'
        ],
        dest: 'dist/assets/js/lib/'
      }
    },

    processhtml: {
      options: {
        recursive: true
      },
      dist: {
        files:[
          {
            expand: true,
            flatten: true,
            src: ['src/*.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    jsbeautifier: {
      files : ["dist/*.html"],
    },

    watch: {
      options: { livereload: true },
      html: {
        files: 'src/**/*.html',
        tasks: ['html']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          base: 'dist',
          hostname: '*',
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('html', ['processhtml', 'jsbeautifier']);

  grunt.registerTask('dist', ['clean','copy', 'concat', 'less', 'html']);

  grunt.registerTask('default', ['connect', 'watch']);
};
