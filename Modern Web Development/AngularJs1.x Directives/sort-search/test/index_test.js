describe('AngularJS Controller: ', function() {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

	it('should exist options to be defined with values "Low Price to High" and "High Price to Low"', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.options[0]).toBe("Low Price to High");
	    expect($scope.options[1]).toBe("High Price to Low");
        });
     it('selectPriceFilter() to be defined', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.selectPriceFilter).toBeDefined();
        });
        it('priceFilter should be false', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            $scope.selectedPriceFilter=$scope.options[0];
            $scope.selectPriceFilter();
            expect($scope.priceFilter).toBeDefined(false);
        });
        it('priceFilter should be true', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            $scope.selectedPriceFilter=$scope.options[1];
            $scope.selectPriceFilter();
            expect($scope.priceFilter).toBeDefined(true);
        });

});
