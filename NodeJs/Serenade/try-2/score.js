const convert = require('xml-js');
const fs = require('fs');
// const extend = require('util')._extend;


const CREATE_TEST_SUITE = {
  _attributes: {
    name: 'CarsApi Test Coverage',
    errors: '0',
    package: 'CarsApi Test Coverage',
    hostname: 'localhost',
    tests: '0',
    failures: '0',
    time: '0.111',
    timestamp: ''
  },
  properties: {},
  testcase: [],
  'system-out': {},
  'system-err': {}
}



const FAILURE_TO_WRITE = {
  "_attributes": {
    "name": "CarsApi Test Coverage",
    "time": "0",
    "classname": "Coverage failure"
  },
  "failure": {
    "_attributes": {
      "type": ""
    },
    "_text": "Missing Test Coverage "
  }
}

const SUCCESS_TO_WRITE = {
  "_attributes": {
    "name": "CarsApi Test Coverage",
    "time": "0",
    "classname": "Coverage success"
  }
}

const FAILURE_ESLINT_TO_WRITE = {
  "_attributes": {
    "name": "CarsApi Eslint Coverage",
    "time": "0",
    "classname": "Eslint error"
  },
  "failure": {
    "_attributes": {
      "type": ""
    },
    "_text": "Eslint error"
  }
}

const SUCCESS_ESLINT_TO_WRITE = {
  "_attributes": {
    "name": "CarsApi Lint Coverage",
    "time": "0",
    "classname": "Eslint success"
  }
}

let readUnitXML = readXML('./test-results.xml');
let readCloverXML = readXML('./coverage/clover.xml');
let readlintXML = readXML('./eslint.xml');

Promise.all([readUnitXML, readCloverXML, readlintXML]).then(data => {
  let unitJSON = convertXML2JS(data[0]);
  let cloverJSON = convertXML2JS(data[1]);
  let lintJSON = convertXML2JS(data[2]);


  let cloverResults = getCloverCount(cloverJSON);
  let lintResults = getlintCount(lintJSON);
  let unitResults = getUnitCount(unitJSON, cloverResults, lintResults);


  let unitResultXML = converJS2XML(unitResults);

  fs.writeFile('./unit.xml', unitResultXML, function(err) {
    if (err) throw err;
  });


}).catch(err => {
  console.log(err);
})

function converJS2XML(json) {
  let options = {
    ignoreComment: true,
    spaces: 4,
    compact: true
  };
  return convert.js2xml(json, options);
}

function convertXML2JS(xml) {
  return convert.xml2js(xml, {
    compact: true,
    spaces: 4
  });
}



function readXML(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) return reject(err);
      else return resolve(data);
    })
  });
}

function getCloverCount(cloverJson) {
  const metrics = cloverJson.coverage.project.metrics;
  const unconveredStatements = parseInt(metrics._attributes.statements) - parseInt(metrics._attributes.coveredstatements);
  const unconveredConditions = parseInt(metrics._attributes.conditionals) - parseInt(metrics._attributes.coveredconditionals);
  const unconveredMethods = parseInt(metrics._attributes.methods) - parseInt(metrics._attributes.coveredmethods);
  return {
    totalStatements: parseInt(metrics._attributes.statements),
    coveredStatements: parseInt(metrics._attributes.coveredstatements),
    unconveredStatements,
    totalConditionals: parseInt(metrics._attributes.conditionals),
    coveredConditionals: parseInt(metrics._attributes.coveredconditionals),
    unconveredConditions,
    totalMethods: parseInt(metrics._attributes.methods),
    coveredMethods: parseInt(metrics._attributes.coveredmethods),
    unconveredMethods,
  }
}

function getlintCount(lintJson) {
  let err_count = 0;
  let lint_err_count = 0;
  let lint_success_marigin = 5;
  let lint_success_count = 0;
  const testsuite_count = lintJson.testsuites.testsuite;
  for (i = 0; i < testsuite_count.length; i++) {
    err_count = err_count + parseInt(lintJson.testsuites.testsuite[i]._attributes.errors);
  }


  if (err_count > 0) {
    if (err_count <= 20) {
      lint_err_count = 1;
    }
    if (err_count >= 20 && err_count <= 400) {
      lint_err_count = 2;
    }
    if (err_count > 400) {
      lint_err_count = 3;
    }
  }
  lint_success_count = lint_success_marigin - lint_err_count
  return {
    lint_err_count: lint_err_count,
    lint_success_count: lint_success_count
  }
}

function getUnitCount(unitJson, cloverResults, lintResults) {

  const testsuite_count_unit = unitJson.testsuites.testsuite.length;
  //console.log(unitJson.testsuites.testsuite[9])
  let total = 0
  let failures = 0

  let failurelintCount = lintResults.lint_err_count;
  let successlintcount = lintResults.lint_success_count;

  let totalUnitClover = cloverResults.totalStatements + cloverResults.totalConditionals + cloverResults.totalMethods + failurelintCount + successlintcount;
  let totalfailure = cloverResults.unconveredStatements + cloverResults.unconveredConditions + cloverResults.unconveredMethods + failurelintCount;
  let successUnitClover = cloverResults.coveredStatements + cloverResults.coveredConditionals + cloverResults.coveredMethods;
  let failureUnitClover = cloverResults.unconveredStatements + cloverResults.unconveredConditions + cloverResults.unconveredMethods;

  const unitJsonResult = JSON.parse(JSON.stringify(unitJson));


  unitJsonResult.testsuites.testsuite.push(CREATE_TEST_SUITE)
  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.id = testsuite_count_unit;
  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.tests = totalUnitClover;

  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.failures = totalfailure;

  if (failureUnitClover > 0) {

    for (var i = 0; i < failureUnitClover; i++) {

      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(FAILURE_TO_WRITE);
    }
  }
  if (successUnitClover > 0) {
    for (var j = 0; j < successUnitClover; j++) {

      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(SUCCESS_TO_WRITE);

    }
  }


  if (successlintcount > 0) {
    for (let i = 0; i < successlintcount; i++) {
      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(SUCCESS_ESLINT_TO_WRITE);
    }
  }

  if (failurelintCount > 0) {
    for (let i = 0; i < failurelintCount; i++) {
      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(FAILURE_ESLINT_TO_WRITE);
    }
  }

  return unitJsonResult;
}
