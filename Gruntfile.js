// Generated on 2014-02-14 using generator-angularexpress 0.0.5
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      server: 'server'
    },
    watch: {
      jade: {
        files: ['<%= yeoman.app %>/jade/**/*.jade'],
        tasks: ['jade']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      express: {
        files: ['<%= yeoman.server %>/{,*/}*.js'],
        tasks: ['express'],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: ['.tmp', '.sass-cache']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    sass: [{
      options: {
        loadPath: ['<%= yeoman.app %>/bower_components/foundation/scss', '<%= yeoman.app %>/bower_components'],
        sourcemap: true
      },
      files: [{
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        src: '{,*/}*.scss',
        dest: '.tmp/styles/',
        ext: '.css'
      }]
    }],
    jade: {
      index: {
        files: {
          '.tmp/': ['<%= yeoman.app %>/jade/index.jade']
        },
        options: {
          basePath: '<%= yeoman.app %>/jade/',
          client: false,
          pretty: true
        }
      }
    },
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: {
          '<%= yeoman.dist %>/index.html': '.tmp/index.html'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/styles',
          src: '{,*/}*.css',
          dest: '<%= yeoman.dist %>/styles'
        }]
      }
    },
    concurrent: {
      server: [
        'jade',
        'sass'
      ],
      dist: [
        'jade',
        'sass',
        'imagemin',
        'svgmin'
      ]
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    express: [{
      options: {
        script: './server/main.js',
        debug: true
      }
    }],
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      prod: {
        options: {
          remote: 'git@github.com:mattvleming/bonfire.git',
          branch: 'prod'
        }
      }
    }
  });

  grunt.registerTask('server', [
    'clean:server',
    'concurrent:server',
    'express',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'htmlmin',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'buildcontrol:prod'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
