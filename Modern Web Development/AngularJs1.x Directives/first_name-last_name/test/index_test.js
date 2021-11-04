describe('AngularJS Test Controller', function() {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

    describe('$scope.ID', function() {
        it('Check the controller exists or not', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect(controller).toBeDefined();
        });
	it('Check the scope object first_name', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.first_name).toBeDefined();
        });
	it('Check the scope object last_name', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.last_name).toBeDefined();
        });
    });
});
