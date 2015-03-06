var app = angular.module('aplikasi', ['ui.router','ngAnimate','toaster']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                title: 'Login',
                templateUrl: 'template/homePage.html',
                controller:'authCtrl'
            })
            .when('/user/dashboard',{
                title:'dashboard',
                templateUrl:'template/dashboard.html',
                controller:'authCtrl'
            })
            .when('/logout',{
                title:'logout',
                templateUrl:'template/homePage.html',
                controller:'authCtrl'
            })
            .when('/user/setting/', {
                title: 'Edit Users',
                templateUrl: 'template/uSetting/uSetting.html',
                controller: 'userEditCtrl'
            })
            .when('user/setting/password',{
                title:'Change Password',
                templateUrl:'template/uSetting/edit_profil.html'
            });
        /* .otherwise({
         redirectTo: '/login'
         });*/

    }])


app.controller('userEditCtrl',function($scope, Data, $route,$location,$rootScope){



    var uid = $rootScope.uid;
    Data.getUserProfile(uid).then(function(results) {
        var original=results;
        $scope.user = angular.copy(original);
        $scope.isClean = function() {
            return angular.equals(original, $scope.user);
        }
    });
    $scope.updateUser=function(user){
        Data.updateUserProfile(uid,{user:user}).then(function(results){
            Data.toast(results);
            if(results.status=="success!"){
                $location.path('/user/dashboard');
            }
        });
    };


});
app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    $scope.login = {};
    $scope.doLogin =function(user){
        Data.post('login',{user:user}).then(function(results){
            Data.toast(results);
            if(results.status=="success"){
                $location.path('/user/dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('/');
        });
    }
})
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.nik = results.nik;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '' || nextUrl == '/') {

                    } else {
                        $location.path("/");
                    }
                }
            });
        });
    });



