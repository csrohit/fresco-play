describe('AngularJS Test Controller:', function() {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

    describe('Testing:', function() {
        it('Check the controller exists or not', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect(controller).toBeDefined();
        });
    	it('Check the even function', function() {
                var $scope = {};
                var controller = $controller('myCtrl', { $scope: $scope });
                expect($scope.odd_even(1112)).toBe("even");
        });
    	it('Check the odd function', function() {
                var $scope = {};
                var controller = $controller('myCtrl', { $scope: $scope });
                expect($scope.odd_even(1111)).toBe("odd");
        });

    });
});
