var appRoute = angular.module('aplikasi', ['ui.router','ui.bootstrap','ngAnimate','toaster']);
appRoute.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url:'/home',
            views:{
                'nav@':{templateUrl:'template/nav.html',
                    controller:'authCtrl'},
                'login@home':{templateUrl:'template/navhomepage.html'}
            }
        })
        .state('home.login',{
            views:{
                'login@home':{templateUrl:'template/loginform.html'}
            }
        })
        .state('dashboard',{
            url:'/dashboard',
            views:{
                'nav@':{templateUrl:'template/nav.html'},
                'login@dashboard':{templateUrl:'template/navdashboard.html',controller:'authCtrl'},
                '':{templateUrl:'template/dashboard.html',
                    ressolve: ['$scope', '$state',
                        function (  $scope,   $state) {
                            $scope.$state = $state;
                        }]
                }
            }
        })
        .state('dashboard.siswa',{
            url:'/siswa',
            views:{
                'nilai@dashboard':{templateUrl:'template/dashboard/siswa/view_siswa.html',
                controller:'siswaCtrl'}
            }
        })
        .state('settings',{
            url:'/settings',
            views:{
                'nav@':{templateUrl:'template/nav.html'},
                'login@settings':{templateUrl:'template/navdashboard.html',
                    controller:'authCtrl'},
                '':{templateUrl:'template/uSetting/edit_user.html',
                    controller:'userEditCtrl'
                }
            }
        })
        .state('settings.profile',{
            url:'/editprofil',
            views:{
                'uSetting@settings':{templateUrl:'template/uSetting/update_profile.html',
                    controller: ['$scope', '$state',
                        function (  $scope,   $state) {
                                $scope.$state = $state;
                        }]
                }
            }
        })
        .state('settings.password',{
            url:'/editpassword',
            views: {
                'uSetting@settings': {
                    templateUrl: 'template/uSetting/update_password.html',
                    controller: 'passwordCtrl'
                }
            }
        })
})


.run(
    ['$rootScope', '$state', '$stateParams','Data',
        function ($rootScope,   $state,   $stateParams,Data)
        {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.authenticated = false;
            Data.get('session').then(function (results)
                {
                if (results.uid)
                    {
                        $rootScope.authenticated = true;
                        $rootScope.uid = results.uid;
                        $rootScope.name = results.name;
                        $rootScope.nik = results.nik;
                        $rootScope.$state=$state;
                        $rootScope.$stateParams=$stateParams;
                   }
                }
            )
        }
    ]
);
appRoute.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
                var e1 = scope.$eval(attrs.ngModel);
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                    return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);


appRoute.directive('formElement', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label : "@",
            model : "="
        },
        link: function(scope, element, attrs) {
            scope.disabled = attrs.hasOwnProperty('disabled');
            scope.required = attrs.hasOwnProperty('required');
            scope.pattern = attrs.pattern || '.*';
        },
        template: '<div class="form-group"><label class="col-sm-3 control-label no-padding-right" >  {{label}}</label><div class="col-sm-7"><span class="block input-icon input-icon-right" ng-transclude></span></div></div>'
    };

});

appRoute.directive('onlyNumbers', function() {
    return function(scope, element, attrs) {
        var keyCode = [8,9,13,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
        element.bind("keydown", function(event) {
            if($.inArray(event.which,keyCode) == -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
});

appRoute.directive('animateOnChange', function($animate) {
    return function(scope, elem, attr) {
        scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv!=ov) {
                var c = 'change-up';
                $animate.addClass(elem,c, function() {
                    $animate.removeClass(elem,c);
                });
            }
        });
    }
});


