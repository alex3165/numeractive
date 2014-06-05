/***********************
      Auth Service
************************/

numApp.factory('AuthService', function ($http, user) {
  return {
    login: function (credentials) {
      return $http
        .post('/api/login', credentials)
        .success(function (res,status,headers) {
          if (res.token != 'undefined'){
            //Session.create(res.token, res.userid);
            user.token = res.token;
            user.login = credentials.login;
            user.userid = res.userid;
            user.islogged = true;
          }
        }).error(function(err) {
            console.log(err);
        });
    }
  };
});

numApp.value('user', {
  islogged: false,
  userid: '',
  login: '',
  token: ''
});

// numApp.service('Session', function () {
//   this.create = function (token, userId) {
//     this.id = token;
//     this.userId = userId;
//   };
//   this.destroy = function () {
//     this.id = null;
//     this.userId = null;
//   };
//   return this;
// });