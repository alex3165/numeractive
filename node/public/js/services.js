/***********************
      Auth Service
************************/

numApp.factory('AuthService', function ($http, user,$cookieStore) {
  return {
    login: function (credentials) {
      return $http
        .post('/api/login', credentials)
        .success(function (res,status,headers) {
          if (res.token != 'undefined'){
            user.token = res.token;
            user.login = credentials.login;
            user.userid = res.userid;
            user.islogged = true;
            $cookieStore.put("user", {
              login : user.login,
              token : user.token,
              userid : user.userid,
              islogged : true
            });
          }
        }).error(function(err) {
            console.log(err);
        });
    },
    destroy: function(){
        $cookieStore.remove('user');
        user.token = '';
        user.login = '';
        user.userid = '';
        user.islogged = false;
      return;
    }
  };
});

numApp.value('user', {
  islogged: false,
  userid: '',
  login: '',
  token: ''
});