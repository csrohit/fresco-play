// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
  
    chromeOptions: {
       args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
     }
      },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['test/e2e/index.spec.js'],


  
onPrepare: function() {
  var jasmineReporters = require('jasmine-reporters');
  jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: 'e2e'
  }));
},
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
