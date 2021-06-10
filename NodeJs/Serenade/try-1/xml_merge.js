const convert = require('xml-js');
const fs = require('fs');


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
  
  let clover_success_margin = 10;
  let clover_sucess_count = 0;
  let clover_err_count =0;
  const metrics = cloverJson.coverage.project.metrics;
  let uncoveredStatements = parseInt(metrics._attributes.statements) - parseInt(metrics._attributes.coveredstatements);
  let uncoveredConditions = parseInt(metrics._attributes.conditionals) - parseInt(metrics._attributes.coveredconditionals);
  let uncoveredMethods = parseInt(metrics._attributes.methods) - parseInt(metrics._attributes.coveredmethods);
  let uncovered_count = uncoveredStatements+uncoveredMethods+uncoveredConditions;


 if (uncovered_count > 10) {
    if (uncovered_count <= 20) {
      clover_err_count = 1;
    }
    if (uncovered_count > 20 && uncovered_count <= 30) {
      clover_err_count = 2;
    }
    if (uncovered_count >30 && uncovered_count <= 45) {
      clover_err_count = 3;
    }
    if(uncovered_count>45 && uncovered_count <=60 ){
      clover_err_count = 4;
    }
    if(uncovered_count>60 && uncovered_count <= 75){
      clover_err_count = 5;
    }
    if(uncovered_count>75 && uncovered_count <= 90){
      clover_err_count = 6;
    
    }
    if(uncovered_count>90 && uncovered_count <= 105){
      clover_err_count = 7;
    }if(uncovered_count>105 && uncovered_count <= 120){
      clover_err_count = 8;
    }
    if(uncovered_count>120 && uncovered_count <= 135){
      clover_err_count = 9;
    }
    if(uncovered_count>135){
      clover_err_count = 10;
    }
  }
  clover_sucess_count = clover_success_margin - clover_err_count;
  

   return {
    

    clover_err_count:clover_err_count,
    clover_success_count:clover_sucess_count

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
  

  let total = 0
  let failures = 0

  let failurelintCount = lintResults.lint_err_count;
  let successlintcount = lintResults.lint_success_count;

  let failurecloverCount = cloverResults.clover_err_count;
 
  let successcloverCount = cloverResults.clover_success_count;
 
  let totalUnitClover = failurecloverCount+successcloverCount;
  
  let totalfailure= failurelintCount+failurecloverCount;
  let successUnitClover= successcloverCount;
  let failureUnitClover=failurecloverCount;
   const unitJsonResult = JSON.parse(JSON.stringify(unitJson));
  unitJsonResult.testsuites.testsuite.push(CREATE_TEST_SUITE)
  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.id = testsuite_count_unit;
  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.tests = totalUnitClover;
  unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.failures = totalfailure;

  if (failurecloverCount > 0) {

    for (var i = 0; i < failurecloverCount; i++) {

      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(FAILURE_TO_WRITE);
    }
  }
  if (successcloverCount > 0) {
    for (var j = 0; j < successcloverCount; j++) {

      unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(SUCCESS_TO_WRITE);

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


