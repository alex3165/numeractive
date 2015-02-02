require.config({
    paths: {
          /**
          *
          * Dependencies
          *
          */

          'angular': 'bower_components/angular/angular',
          'angularAMD': 'bower_components/angularAMD/angularAMD',
          'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
          'angular-animate': 'bower_components/angular-animate/angular-animate.min',
          'angular-sanatize': 'bower_components/angular-sanitize/angular-sanitize.min',
          'angular-cookie': 'bower_components/angular-cookies/angular-cookies.min',
          'angular-strap': 'bower_components/angular-strap/dist/angular-strap.min',
          'ckeditor': 'bower_components/ckeditor/ckeditor',

          /**
          *
          * Framework
          *
          */
          'app': 'app',
          'router': 'router',

          /**
          *
          * Controllers
          *
          */
          'head-controller': 'modules/head/head-controller',
          'contact-controller': 'modules/contact/contact-controller',
          'category-controller': 'modules/category/category-controller',
          'article-controller': 'modules/article/article-controller',
          'admin-controller': 'modules/admin/admin-controller',
          'slider-controller': 'modules/slider/slider-controller',
          'login-controller': 'modules/login/login-controller',
          'addarticle-controller': 'modules/addarticle/addarticle-controller',
          'previewarticles-controller': 'modules/previewarticles/previewarticles-controller',

          /**
          *
          * Models
          *
          */
          'article-model': 'modules/article/article-model',
          'user-model': 'modules/user/user-model',

          /**
          *
          * Services
          *
          */
          'article-service': 'modules/article/article-service',
          'category-service': 'modules/category/category-service',
          'auth-service': 'modules/login/auth-service',
          'user-service': 'modules/user/user-service'
    },

    shim: {
        'angularAMD': ['angular'],
        'angular-animate': ['angular'],
        'angular-sanatize': ['angular'],
        'angular-cookie': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-strap': ['angular'],
        'router': ['angular', 'angular-ui-router'],
        'app': ['angular', 'angular-ui-router', 'angular-animate', 'angular-sanatize', 'angular-cookie', 'angular-strap']
    },

    deps: ['app']
});