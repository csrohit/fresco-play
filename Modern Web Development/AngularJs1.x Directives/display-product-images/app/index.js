var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.quantity=0;
   //Add image property to the products and the image should have the url of images 
    var imgPath = "img/";
 //add your $scope variable products here with below provided product details.  
 
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
   }
 ]
$scope.addToCart=function(){
	alert('Product Added to Cart successfully')
	return "success";
	}
	
});
