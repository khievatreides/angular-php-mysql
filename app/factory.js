appRoute.factory("Data", ['$http','toaster',
    function ($http , toaster) {
        var serviceBase = 'backend/v1/';
        var obj = {};
        obj.toast = function(data){
            toaster.pop(data.status,"",data.message,10000,'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post=function(q,object){
            return $http.post(serviceBase +q,object).then(function(results){
                return results.data;
            });
        };
        obj.getUserProfile = function(userID){
            return $http.get(serviceBase + "getUserProfile/:" +userID).then(function(results){
                return results.data;
            });
        };
        obj.updateUserProfile =function(id,user){
            return $http.post(serviceBase+"updateUserProfile/:"+id,user).then(function(results){
                return results.data;
            });
        };
        obj.updateUserPassword =function(id,password){
            return $http.post(serviceBase+"updateUserPassword/:"+id,password).then(function(results){
                return results.data;
            });
        };
        obj.updateSiswa =function(id,siswa){
            return $http.post(serviceBase+"updatesiswa/:"+id,siswa).then(function(results){
                return results.data;
            });
        };
        obj.insertSiswa=function(q,object){
            return $http.post(serviceBase +q,object).then(function(results){
                return results.data;
            });
        };
        obj.delete=function(q,id){
            return $http.delete(serviceBase+q,id).then(function(results){
                return results.data;
            })
        };

        return obj;
    }]);