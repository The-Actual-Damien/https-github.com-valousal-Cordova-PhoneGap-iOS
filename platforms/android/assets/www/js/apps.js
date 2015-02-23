
var app = angular.module('Application', ['ngRoute', 'ngCordova', 'timer', 'ngResource']);

app.config(function ($routeProvider, $compileProvider, $locationProvider) {

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

        .when('/wine/champagne', {
            templateUrl: 'views/wine_champagne.html',
            controller: 'wineController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })






        .when('/games/home', {
            templateUrl: 'views/home.html',
            controller: 'gameController'
        })
        .when('/games/play', {
            templateUrl: 'views/game.html',
            controller: 'gameController'
        })
        .when('/games/options', {
            templateUrl: 'views/options.html',
            controller: 'gameController'
        })
        .when('/games/score', {
            templateUrl: 'views/score.html',
            controller: 'gameController'
        })
        .when('/games/regles', {
            templateUrl: 'views/regles.html',
            controller: 'gameController'
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