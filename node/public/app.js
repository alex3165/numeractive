define(function(require, exports, module) {
    'use strict';

    var angularAMD = require('angularAMD');
    var NumeractiveRouter = require('router');

    var SliderController = require('slider-controller');
    var CategoryController = require('category-controller');
    var LoginController = require('login-controller');
    var AdminController = require('admin-controller');
    var ArticleController = require('article-controller');
    var AddArticleController = require('addarticle-controller');
    var PreviewArticlesController = require('previewarticles-controller');

    var ArticleModel = require('article-model');
    var UserModel = require('user-model');

    var ArticleService = require('article-service');
    var AddArticleService = require('addarticle-service');
    var CategoryService = require('category-service');
    var AuthService = require('auth-service');
    var SliderDirective = require('slider-directive');
    var CkeditorDirective = require('ckeditor-directive');

    var NumeractiveApplication = angular.module('numeractive', [
        'ui.router',
        'ngAnimate',
        'mgcrea.ngStrap',
        'ngSanitize',
        'ngCookies',
        'angularFileUpload'
    ]);
    NumeractiveApplication.constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        });

    NumeractiveApplication.config(NumeractiveRouter);

    NumeractiveApplication.controller('SliderCtrl', SliderController);
    NumeractiveApplication.controller('CategoriesCtrl', CategoryController);
    NumeractiveApplication.controller('LoginCtrl', LoginController);
    NumeractiveApplication.controller('ArticleCtrl', ArticleController);
    NumeractiveApplication.controller('NewArticleCtrl', AddArticleController);
    NumeractiveApplication.controller('HomeCtrl', PreviewArticlesController);
    NumeractiveApplication.controller('AdminCtrl', AdminController);

    NumeractiveApplication.value('article', ArticleModel);
    NumeractiveApplication.value('user', UserModel);

    NumeractiveApplication.factory('ArticleService', ArticleService);
    NumeractiveApplication.factory('AddArticleService', AddArticleService);
    NumeractiveApplication.factory('CategoryService', CategoryService);
    NumeractiveApplication.factory('AuthService', AuthService);

    NumeractiveApplication.directive('slider', SliderDirective);
    NumeractiveApplication.directive('ckeditor', CkeditorDirective);

    module.exports = angularAMD.bootstrap(NumeractiveApplication);

});