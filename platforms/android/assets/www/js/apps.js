
var app = angular.module('myMoments', ['ngRoute', 'ngCordova']);

app.config(function ($routeProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist('/');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $routeProvider
        .when('/', {
            templateUrl: 'views/indexApp.html',
            controller: 'indexController'
        })

        .when('/presentation', {
            templateUrl: 'views/presentation.html',
            controller: 'presentationController'
        })

        .when('/wine', {
            templateUrl: 'views/wine.html',
            controller: 'wineController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })

        .when('/allmoment', {
            templateUrl: 'views/allMoments.html',
            controller: 'allMomentsController'
        })

        .when('/addmoment', {
            templateUrl: 'views/addMoment.html',
            controller: 'addMomentController'
        })

        .when('/moment/:id', {
            templateUrl: 'views/oneMoment.html',
            controller: 'oneMomentController'
        })
        .otherwise({ redirectTo: '/' });

});