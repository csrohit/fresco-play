describe('AngularJS Test Controller', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

    describe('$scope.ID', function() {
 
	it('should exist registerUser function', function() {
            var $scope = {};
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.registerUser).toBeDefined();
        });
        it('should exist registerUser function', function() {
            var $scope = {};
	        $scope.userid="abcsdfgh";
            $scope.emailid="sajgajd@djf.com";
            $scope.pswd="Nshhg@8734";
            var controller = $controller('myCtrl', { $scope: $scope });
            expect($scope.registerUser()).toBe('successful');
        });
	it('registerUser function should call alert function with the message "Registration Successful"', function() {
            var $scope = {};
	        $scope.userid="abcsdfgh";
            $scope.emailid="sajgajd@djf.com";
            $scope.pswd="Nshhg@8734";
            var controller = $controller('myCtrl', { $scope: $scope });
            var spy=spyOn(window,"alert");
            $scope.registerUser();
            expect(spy).toHaveBeenCalledWith('Registration Successful')
        });
    });
});
