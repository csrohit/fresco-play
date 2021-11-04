
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
      connect: {     
      server: {
        options: {
          port: 8000,
          base: 'app',
          keepalive:true
        }
      }
    },
    protractor: {
      options: {
        configFile: "conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          seleniumPort:8001
          // Arguments passed to the command
        }
      },
      your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },
    concurrent: {
      process: ['connect','protractor']
  }
  });
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['concurrent','protractor','connect']);

};
