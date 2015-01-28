/***********************
      Auth Service
************************/

numApp.factory('AuthService', function ($http, user, $cookieStore) {
  return {
    login: function (credentials) {
      return $http
        .post('/api/login', credentials)
        .success(function (res, status, headers) {
          if (res.token != 'undefined'){
            user.token = res.token;
            user.login = credentials.login;
            user.userid = res.userid;
            user.islogged = true;
            $cookieStore.put("user", user);
          }
        }).error(function(err) {
            console.log(err);
        });
    },
    destroy: function(){
      user.token = '';
      user.login = '';
      user.userid = '';
      user.islogged = false;
      $cookieStore.put("user", user);
      return;
    },
    getCookie: function(){
      return $cookieStore.get("user");
    }
  };
});

numApp.factory('ArticleService', function ($http, user){
  return{
    addArticle: function(article){
      return $http.post('/api/post',article).success(function(res, status, headers){
        console.log(res);
      }).error(function(err){
        console.log(err);
      });
    },
    removeArticle: function(articleId) {
      return $http.delete('/api/post/'+articleId);
    }
  };
});

numApp.factory('CategoryService', function ($http, user){
  return{
    removeCategory: function(categoryId) {
      return $http.delete('/api/category/'+categoryId);
    }
  };
});

numApp.value('article', {
  title: '',
  categorie: '',
  text: '',
  img: '',
  userid: ''
});

numApp.value('user', {
  islogged: false,
  userid: '',
  login: '',
  token: ''
});