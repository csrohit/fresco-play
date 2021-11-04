var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
	var imgPath = "img/";
	$scope.priceFilter = false;
	$scope.selectedPriceFilter = "";
	$scope.dtsinCart = 0;
	$scope.products = [
		{
			name: "Happy Cycle",
			discount: "20%",
			price: 2500,
			brand: "Wheels",
			addedToCart: false,
			image: imgPath + "cycle.jpg",
			quantity: 0
		},
		{
			name: "Polo Baby Care Dress",
			discount: "20%",
			price: 500,
			brand: "Super Hero",
			addedToCart: false,
			image: imgPath + "shirt.jpg",
			quantity: 0
		},
		{
			name: "Kids Shoes",
			discount: "10%",
			price: 1000,
			brand: "Feel Good",
			addedToCart: false,
			image: imgPath + "shoes.jpg",
			quantity: 0
		}

	];
	$scope.filteredProducts = $scope.products;
	$scope.addToCart = function () {
		alert('Product Added to Cart successfully')
		return "success";
	}
	//create scope variable options that has 'Low Price to High' and 'High Price to Low' values.
	//add selectPriceFilter function that assign scope priceFilter to true / false based on condition
  $scope.options = [
    'Low Price to High', 'High Price to Low'
  ]

  $scope.selectPriceFilter = () => {
    if($scope.selectedPriceFilter === $scope.options[0]){
      $scope.priceFilter = false;
    }else{
      $scope.priceFilter = true;
    }
	
	console.log($scope.priceFilter);

  }

  $scope.brands = [
	  "Feel Good", "Wheels", "Super Hero"
  ]

});


