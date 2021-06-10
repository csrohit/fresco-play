const convert = require('xml-js');
const fs = require('fs');

const CREATE_TEST_SUITE = { _attributes: 
   { 
     name: 'Angular Test Coverage',
     errors: '0',
     package: 'Angular Test Coverage',
     hostname: 'localhost',
     tests: '0',
     failures: '0',
     time: '0.111',
     timestamp: '' },
  properties: {},
  testcase: 
   [ ] }

const FAILURE_TO_WRITE = {
    "_attributes": {
      "name": "Angular Test Coverage",
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
      "name"  :"Angular Test Coverage",
      "time":"0",
      "classname": "Coverage success"
    }
 }

let readTestResultXML = readXML('./test-result.xml');
let readCloverXML = readXML('./coverage/clover.xml');

Promise.all([readTestResultXML , readCloverXML]).then(data => {
    let testResultJSON = convertXML2JS(data[0]);
    let cloverJSON = convertXML2JS(data[1]);
   
    let cloverResults = getCloverCount(cloverJSON);
    let unitResults = getUnitCount(testResultJSON , cloverResults);
    
    let unitResultXML = converJS2XML(unitResults);

    fs.writeFile('./unit.xml',unitResultXML , function(err){
        if(err) throw err;
    });

    
}).catch(err => {
    console.log(err);
})

function converJS2XML(json){
    let options = {ignoreComment:true , spaces:4 , compact:true};
    return convert.js2xml(json, options);
}

function convertXML2JS(xml){
    return convert.xml2js(xml , {compact:true , spaces: 4});
}

function readXML(path){
    return new Promise(function(resolve , reject){
        fs.readFile(path , 'utf-8' , (err , data) =>{
            if(err) return reject(err);
            else return resolve(data);           
        })
    });
}

function getCloverCount(cloverJson) {
    
  let clover_sucess_count = 0;
  let clover_err_count =0;
  const metrics = cloverJson.coverage.project.metrics;

  let uncoveredStatements = parseInt(metrics._attributes.statements) - parseInt(metrics._attributes.coveredstatements);
  let uncoveredConditions = parseInt(metrics._attributes.conditionals) - parseInt(metrics._attributes.coveredconditionals);
  let uncoveredMethods = parseInt(metrics._attributes.methods) - parseInt(metrics._attributes.coveredmethods);
  let uncovered_count = uncoveredStatements+uncoveredMethods+uncoveredConditions;
  let total = parseInt(metrics._attributes.statements) + parseInt(metrics._attributes.conditionals) + parseInt(metrics._attributes.methods);

  // console.log(total,'total');
  // console.log(uncovered_count,'uncovered_count');

 
  const normalization = 125; // set your initial uncovered_count in normalization
  clover_sucess_count = normalization - uncovered_count;
  clover_err_count = uncovered_count;
  
   return {
    clover_err_count:clover_err_count,
    clover_success_count:clover_sucess_count

  }
}

function getUnitCount(testResultJSON , cloverResults){

  const testsuite_count_unit = testResultJSON.testsuite.testcase.length;

  let total = parseInt(testResultJSON.testsuite._attributes.tests);
  let failures = parseInt(testResultJSON.testsuite._attributes.failures);   

  let successcloverCount = cloverResults.clover_success_count;
  let failurecloverCount = cloverResults.clover_err_count;

  let totalUnitClover = failurecloverCount+successcloverCount;
  let totalfailure= failurecloverCount;
  let successUnitClover= successcloverCount;
  let failureUnitClover=failurecloverCount;

    const unitJsonResult = JSON.parse(JSON.stringify(testResultJSON)); //for deep copy as Object.assign doesn't support deep copy..
    unitJsonResult.testsuite.testcase.push(CREATE_TEST_SUITE)
    unitJsonResult.testsuite.testcase[testsuite_count_unit]._attributes.id = 1;
    unitJsonResult.testsuite.testcase[testsuite_count_unit]._attributes.tests = totalUnitClover;

    unitJsonResult.testsuite.testcase[testsuite_count_unit]._attributes.failures = totalfailure;

    unitJsonResult.testsuite._attributes.tests = totalUnitClover;
    
    unitJsonResult.testsuite._attributes.failures = totalfailure;

    
    if(failureUnitClover > 0){
      for(var i=0;i < failureUnitClover;i++){
        unitJsonResult.testsuite.testcase.push(FAILURE_TO_WRITE);
      }
    }
    if(successUnitClover > 0){
      for(var j=0;j< successUnitClover;j++){
          unitJsonResult.testsuite.testcase.push(SUCCESS_TO_WRITE);
      }
    }

    return unitJsonResult;
}