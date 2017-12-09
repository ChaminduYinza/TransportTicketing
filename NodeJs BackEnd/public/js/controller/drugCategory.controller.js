var app1 = angular.module('app1', []);
app1.controller('drugCategoryController', function($scope, $http) {
  $http.get("http://localhost:3000/api/drugcategory").then(function (response) {
      $scope.mydrugCategory = response.data;
      
  });
});



