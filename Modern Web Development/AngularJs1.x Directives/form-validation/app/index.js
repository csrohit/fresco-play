var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    var imgPath = "img/";
    $scope.dtsinCart=0;
    $scope.products = [ 
		{
			name : "Happy Cycle",
			discount:"20%",
			price: "2500",
			brand : "Wheels",
			addedToCart:false,
			image : imgPath + "cycle.jpg",
			quantity:0
		},
		{
			name : "Kids Shoes",
			discount:"10%",
			price: "1460",
			brand : "Feel Good",
			addedToCart:false,
			image : imgPath + "shoes.jpg",
			quantity:0
		},
		{
			name : "Polo Baby Care Dress",
			discount:"20%",
			price: "2500",
			brand : "Super Hero",
			addedToCart:false,
			image : imgPath + "shirt.jpg",
			quantity:0
		},
	];
	$scope.addToCart=function(){
		alert('Product Added to Cart successfully')
		return "success";
  }
  
  $scope.userid = '';
  $scope.emailid = '';
  $scope.pswd = '';

	//add your code for registerUser which alert user and return successful message

    $scope.registerUser = () => {
      alert("Registration Successful");
      return 'successful';
    }
});

