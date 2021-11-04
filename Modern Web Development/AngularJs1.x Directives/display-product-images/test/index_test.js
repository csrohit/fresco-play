describe('AngularJS Test Controller', function () {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    it('should exist product image', function () {
        var $scope = {};
        var controller = $controller('myCtrl', { $scope: $scope });
        expect($scope.products[0].image).toEqual("img/cycle.jpg");
        expect($scope.products[1].image).toEqual("img/shoes.jpg");
        expect($scope.products[2].image).toEqual("img/shirt.jpg");
    });


});
