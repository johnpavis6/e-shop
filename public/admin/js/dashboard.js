var app = angular.module('adminApp', []);
app.controller('adminCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.getProducts = function() {
        $http({
            url: '/admin/products',
            method: 'get'
        }).then(function(res) {
            $scope.products = res.data.products;
        }, function(res) {
            alert(res.data);
        });
    }
    $scope.getProducts();
    $scope.currProduct = {};
    $scope.submit = function() {
        $('#productInfoModal').modal('toggle');
        $http({
            url: '/admin/' + $scope.submitUrl,
            method: 'post',
            data: $scope.currProduct,
        }).then(function(res) {
            console.log(res.data);
            alert('Successfully saved');
            $scope.callOnSuccess(res);
        }, function(res) {
            alert(res.data);
        });
    }
    $scope.addProduct = function() {
        $scope.currProduct = {};
        $scope.submitUrl = 'addProduct';
        $scope.updateProductFlag = false;
        $scope.callOnSuccess = $scope.pushProduct;
    }
    $scope.editProduct = function(ind) {
        $scope.editProductInd = ind;
        $scope.currProduct = {};
        for (key in $scope.products[ind]) {
            $scope.currProduct[key] = $scope.products[ind][key];
        }
        $scope.submitUrl = 'updateProduct';
        $scope.updateProductFlag = true;
        $scope.callOnSuccess = $scope.updateProduct;
        $('#productInfoModal').modal('toggle');
    }
    $scope.updateProduct = function(res) {
        $scope.products[$scope.editProductInd] = $scope.currProduct;
    }
    $scope.pushProduct = function(res) {
        $scope.currProduct.id = res.data.insertId;
        $scope.products.push($scope.currProduct);
    }
    $scope.deleteProduct = function(ind) {
        var flag = confirm(`Are you sure to delete product ${$scope.products[ind].id}?`);
        if (!flag) rerurn;
        $http({
            url: '/admin/deleteproduct',
            method: 'post',
            data: { id: $scope.products[ind].id }
        }).then(function(res) {
            alert('Deleted successfully');
            $scope.products.splice(ind, 1);
        }, function(res) {
            alert(res.data);
        });
    }
});