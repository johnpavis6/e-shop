var app = angular.module('adminApp', []);
app.controller('adminCtrl', function($scope, $http) {
    $scope.loginBtnHtml = 'Login';
    $scope.loginBtnDisable = false;
    $scope.errMsgShow = false;
    $scope.login = function() {
        $scope.loginBtnHtml = 'Verifying';
        $scope.loginBtnDisable = true;
        $http({
            url: '/admin/login',
            method: 'post',
            data: { username: $scope.username, password: $scope.password }
        }).then(function(res) {
            location.href += 'dashboard';
        }, function(res) {
            $scope.errMsg = res.data;
            $scope.errMsgShow = true;
            $scope.loginBtnHtml = 'Login';
            $scope.loginBtnDisable = false;
            console.info(res);
        });
    }
    $scope.closeAlert = function() {
        $scope.errMsgShow = false;
    }
});