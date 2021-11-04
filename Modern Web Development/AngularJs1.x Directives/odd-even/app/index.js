// Add your code here

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.number1=0;
    $scope.number2 = 0;
    $scope.odd_even = result => {
      return result % 2? 'odd': 'even';
    }
});
