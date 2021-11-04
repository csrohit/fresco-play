var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    var imgPath = "img/";
    $scope.quantity=0;
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
	]
    //Add your code here for addToCart function which returns success message
    $scope.addToCart = function(pdt){


      alert("Product added to cart successfully");
      return "success";
    }
});
