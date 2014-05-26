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
            '<%= yeoman.dist %>/public/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/public/styles/{,*/}*.css',
            '<%= yeoman.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/public/styles/fonts/*'
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
          '.tmp/': ['<%= yeoman.app %>/jade/index.jade', '<%= yeoman.app %>/jade/mobile.jade']
        },
        options: {
          basePath: '<%= yeoman.app %>/jade/',
          client: false,
          pretty: true
        }
      }
    },
    useminPrepare: {
      html: ['.tmp/index.html', '.tmp/mobile.html'],
      options: {
        dest: '<%= yeoman.dist %>/public'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/public/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>/public']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/public/images'
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
          dest: '<%= yeoman.dist %>/public/images'
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
          '<%= yeoman.dist %>/public/index.html': ['.tmp/index.html', '.tmp/mobile.html']
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/public/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/styles',
          src: '{,*/}*.css',
          dest: '<%= yeoman.dist %>/public/styles'
        }, {
          expand: true,
          cwd: '<%= yeoman.server %>',
          src: '{,*/}*.js',
          dest: '<%= yeoman.dist %>/server'
        }, {
          expand: true,
          cwd: './',
          src: ['package.json', 'newrelic.js'],
          dest: '<%= yeoman.dist %>'
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
        html: ['<%= yeoman.dist %>/public/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/public/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/public/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/public/scripts/scripts.js': [
            '<%= yeoman.dist %>/public/scripts/scripts.js'
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
    },
    ngconstant: {
      options: {
        space: ' '
      },
      development: [{
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          ENV: 'development',
          fbAppId: '362760827200419'
        }
      }],
      production: [{
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          ENV: 'production',
          fbAppId: '493236667462235'
        }
      }]
    }
  });

  grunt.registerTask('server', [
    'clean:server',
    'ngconstant:development',
    'concurrent:server',
    'express',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
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

  grunt.registerTask('release', [
    'build',
    'deploy'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

};
