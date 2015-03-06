appRoute.controller('siswaCtrl',function($scope,$modal,$state,Data){
    $scope.siswaBaru={};
    $scope.$state = $state;
    Data.get('siswa').then(function(results){
     $scope.siswas=results;
    });

    $scope.deleteSiswa =function(siswa){
        if(confirm('Apakah anda yakin akan menghapus siswa ini ?')){
            Data.delete('deletesiswa/'+siswa.sid).then(function(results){
               Data.toast(results);
                $scope.siswas = _.without($scope.siswas, _.findWhere($scope.siswas, {sid:siswa.sid}));
            });
        }
    }
     $scope.open =function(p,size){
            var modalInstance=$modal.open({
                templateUrl:'template/dashboard/siswa/edit_siswa.html',
                controller:'siswaEditCtrl',
                size:size,
                resolve:{
                    item :function(){
                        return p;
                    }
                }
            });
            modalInstance.result.then(function(selectedObject){
            if(selectedObject.save=='insert'){
                    $scope.siswas.push(selectedObject);
                }
                else if(selectedObject.save=="update")
                {
                    p.sid=selectedObject.sid;
                    p.n_siswa =selectedObject.n_siswa;
                    p.nis= selectedObject.nis;
                    p.kid =selectedObject.kid;
                }
            });
        }
});


appRoute.controller('siswaEditCtrl',function($scope,$modalInstance,item,Data){
    $scope.siswa=angular.copy(item);
    $scope.cancel=function(){
        $modalInstance.dismiss('close');
    };
    $scope.title=(item.sid >0)? 'Edit Siswa' : 'Tambah Siswa';
    $scope.buttonText =(item.sid > 0) ? 'Update Data Siswa' : 'Tambah Data Siswa';
    var original = item;
    $scope.isClean =function(){
        return angular.equals(original.$scope.siswa);
    };
    $scope.saveSiswa =function(siswa){
        console.log( siswa.sid );
        if(siswa.sid >0){
            Data.updateSiswa(siswa.sid,{siswa:siswa}).then(function(result){
                Data.toast(result);
               if(result.status =="success"){
                   var x =angular.copy(siswa);
                   x.save ='update';
                   $modalInstance.close(x);
               }
                else{
                   console.log(result);
               }
            });
        }
        else{
            Data.insertSiswa('insertsiswa',{siswa:siswa}).then(function(result){
                Data.toast(result);
                if(result.status =="success!"){
                    console.log(result);
                    var x =angular.copy(siswa);
                    x.save ='insert';
                    x.id =result.sid;

                    $modalInstance.close(x);
                }
                else{
                    console.log(result);
                }
            })

        }
    }
});
appRoute.controller('passwordCtrl',function($scope,$state,$rootScope,$http,Data){
    var uid=$rootScope.uid;
    $scope.$state = $state;
    $scope.updatePass =function(passwordModel) {
        Data.updateUserPassword(uid,{passwordModel:passwordModel}).then(function(results){
            Data.toast(results);
            if(results.status=="success"){
                $state.go('dashboard');
            }
        });
    }
});
appRoute.controller('authCtrl', function ($scope, $rootScope, $http,$state, Data) {
    $scope.login = {};
    $scope.doLogin =function(user){
        Data.post('login',{user:user}).then(function(results){
            Data.toast(results);
            if(results.status=="success"){
                $state.go('dashboard');
                Data.get('session').then(function(results){
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                })
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $state.go('home');
        });
    }
})

appRoute.controller('userEditCtrl',function($scope, Data, $state,$http,$rootScope){
    var uid = $rootScope.uid;
    Data.getUserProfile(uid).then(function(results) {
        var original=results;
        $scope.user = angular.copy(original);
        console.log($scope.user);
        $scope.isClean = function() {
            return angular.equals(original, $scope.user);
        }
    });
    $scope.updateUser=function(user){
        Data.updateUserProfile(uid,{user:user}).then(function(results){
            Data.toast(results);
            if(results.status=="success!"){
                $state.go('dashboard');
            }
        });
    };

});