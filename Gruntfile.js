module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-amdcheck');

  var stemappDir = '/Users/gary5416/dev/WebAppBuilderForArcGIS/client/stemapp';
  var appDir = './dist';
  var app1 = '/app1'; // in this example it should match the folder name under src/apps
  var app2 = '/app2'; // in this example it should match the folder name under src/apps

  grunt.initConfig({

    unzip: {
      // https://www.npmjs.com/package/grunt-zip
      // unzip the base web appbuilder code to each app directory in appDir
      app1: {
        src: './wab-base.zip',
        dest: appDir + app1
      },
      app2: {
        src: './wab-base.zip',
        dest: appDir + app2
      }
    },

    sync: {
      // https://www.npmjs.com/package/grunt-sync
      // Copy custom widget code to the individual application widget directories
      // in the dist 'appDir' folder.
      apps: {
        verbose: true,
        files: [
          {
            cwd: 'src/widgets',
            src: [
              'OpenURL/**', '!OpenURL/**/*.css.map'
            ],
            dest: appDir + app1 + '/widgets'
          },
          {
            cwd: 'src/widgets',
            src: [
              'OpenURL/**', '!OpenURL/**/*.css.map'
            ],
            dest: appDir + app2 + '/widgets'
          }
        ]
      },
      stemapp: {
        // Copy custom widget code to the locally hosted WebAppBuilderForArcGIS app
        // This will ensure if a users builds an app with your custom widget it will be current.
        verbose: true,
        files: [
          {
            cwd: './src/widgets',
            src: ['**'],
            dest: stemappDir + '/widgets'
          }
        ]
      }
    },

    watch: {
      main: {
        files: [
          'src/widgets/**', 'apps/**/*'
        ],
        tasks: [
          'sass', 'postcss', 'sync:apps', 'copy:apps'
        ],
        options: {
          spawn: false,
          atBegin: true
        }
      },
      livereload: {
        options: {
          livereload: 35729
        },
        files: ['src/apps/**', 'src/widgets/**']
      }
    },

    copy: {
      apps: {
        files: [
          {
            expand: true,
            cwd: 'src/apps',
            src: ['**'],
            dest: appDir
          }
        ]
      }
    },

    clean: {
      appDir: {
        'src': appDir
      }
    },

    sass: {
      OpenURL: {
        options: {
          // Generate a sourcemap to assist with debugging
          sourceMap: true,
          outputStyle: 'expanded',
          sourceComments: true
        },
        files: {
          'src/widgets/OpenURL/css/style.css': 'src/widgets/OpenURL/css/style.scss'
        }
      }
    },

    postcss: {
      OpenURL: {
        options: {
          map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'src/widgets/OpenURL/css/' // ...to the specified directory
          },

          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
            require('cssnano')() // minify the result
          ]
        },
        dist: {
          src: 'src/widgets/OpenURL/css/style.css'
        }
      }
    },

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Quality Tasks
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    eslint: {
      target: ['src/widgets/**/**/*.js']
    },

    amdcheck: {
      options: {
        saveFilesWithUnusedDependenciesOnly: true,
        excepts: [],
        exceptsPaths: [
          /^jimu\/loaderplugins\//, /^dijit\/(form|layout)/, /^dojo\/(NodeList|NodeList-dom)/, /^esri\/dijit/
        ],
        strict: true
      },
      check: {
        options: {
          removeUnusedDependencies: false
        },
        files: [
          {
            expand: true,
            cwd: 'src/widgets',
            src: ['**/**/*.js']
          }
        ]
      }
    },

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Serve Tasks
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    connect: {
      server: {
        options: {
          hostname: '*',
          base: appDir,
          port: 9004,
          protocol: 'https',
          useAvailablePort: true,
          livereload: 35729,
          open: true,
          // key: grunt.file.read('../etc/ssl/server.key').toString(),
          // cert: grunt.file.read('../etc/ssl/server.crt').toString(),
          // ca: grunt.file.read('../etc/ssl/ca.crt').toString()
        }
      }
    }
  });

  grunt.registerTask('init', [
    'clean',
    'unzip',
    'sass',
    'postcss',
    'sync:apps',
    'copy:apps'
  ]);

  grunt.registerTask('stemapp', ['sass', 'postcss', 'sync:stemapp']);

  grunt.registerTask('serve', ['clean', 'unzip', 'connect', 'watch']);

  grunt.registerTask('quality', 'Run code quality tasks', ['eslint', 'amdcheck:check']);

};
