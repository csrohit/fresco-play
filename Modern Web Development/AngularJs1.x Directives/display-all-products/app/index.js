var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
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
});

/*
-----------------
Product Details
-----------------
product1
    name : "Happy Cycle",
    discount:"20%",
    price: "2500",
    brand : "Wheels",
    addedToCart:false,
    image : imgPath + "cycle.jpg",
    quantity:0

product2
    name : "Kids Shoes",
    discount:"10%",
    price: "1460",
    brand : "Feel Good",
    addedToCart:false,
    image : imgPath + "shoes.jpg",
    quantity:0

product3
    name : "Polo Baby Care Dress",
    discount:"20%",
    price: "2500",
    brand : "Super Hero",
    addedToCart:false,
    image : imgPath + "shirt.jpg",
    quantity:0

*/