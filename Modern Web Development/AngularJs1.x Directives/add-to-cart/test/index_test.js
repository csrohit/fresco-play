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
	it('Check the scope object products', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products).toBeDefined();
        });
	it('should exist product name', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products[0].name).toBeDefined();
        });
	it('should exist product discount', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products[0].discount).toBeDefined();
        });
	it('should exist product price', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products[0].price).toBeDefined();
        });
	it('should exist product brand', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products[0].brand).toBeDefined();
        });
	it('should exist product quantity', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.products[0].quantity).toBeDefined();
        });
	it('should exist addToCart function', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.addToCart).toBeDefined();
        });
	it('should addToCart function return "success" string', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            var pdt={
			name : "Kids Shoes",
			discount:"10%",
			price: "1460",
			brand : "Feel Good",
			addedToCart:false,
			quantity:1
		};
            expect($scope.addToCart(pdt)).toBe("success");
     });


    });
});
