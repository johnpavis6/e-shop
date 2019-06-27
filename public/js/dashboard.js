var app = angular.module('adminApp', []);
app.controller('adminCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.getProducts = function() {
        $http({
            url: '/products/read',
            method: 'get'
        }).then(function(res) {
            console.log({ 'res': res.data.products });
            $scope.products = res.data.products;
        }, function(res) {
            console.log(res);
            alert("Error on fetch");
        });
    }, $scope.getProducts();
    $scope.currProduct = {};
    $scope.addProduct = function() {
        $scope.submitForm = $scope.pushProduct;
        $scope.currProduct = {};
    }
    $scope.editProduct = function(ind) {
        $scope.submitForm = $scope.updateProduct;
        $scope.editProductInd = ind;
        $scope.currProduct = {};
        for (key in $scope.products[ind]) {
            $scope.currProduct[key] = $scope.products[ind][key];
        }
        console.log($scope.currProduct);
        $('#productInfoModal').modal('toggle');
    }
    $scope.updateProduct = function(res) {
        $http({
            url: "/products/update",
            method: 'post',
            data: {
                product: $scope.currProduct,
                authenticity_token: window._token
            },
        }).then(function(res) {
            $scope.products[$scope.editProductInd] = $scope.currProduct;
            $('#productInfoModal').modal('toggle');
            alert('Successfully saved');
        }, function(res) {
            console.log(res);
            alert("Error on update");
        });
    }
    $scope.pushProduct = function(res) {
        $http({
            url: "/products/create",
            method: 'post',
            data: {
                product: $scope.currProduct,
                authenticity_token: window._token
            },
        }).then(function(res) {
            console.log(res.data);
            $scope.currProduct.id = res.data.insertId;
            $scope.products.push($scope.currProduct);
            $('#productInfoModal').modal('toggle');
            alert('Successfully saved');
        }, function(res) {
            console.log(res);
            alert("Error on insert");
        });
    }
    $scope.deleteProduct = function(ind) {
        var flag = confirm(`Are you sure to delete product ${$scope.products[ind].id}?`);
        if (!flag) return;
        $http({
            url: 'products/delete',
            method: 'post',
            data: {
                id: $scope.products[ind].id,
                authenticity_token: window._token
            }
        }).then(function(res) {
            alert('Deleted successfully');
            $scope.products.splice(ind, 1);
        }, function(res) {
            console.log(res);
            alert("Error on delete");
        });
    }
});