
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
            controller: 'indexController'
        })

        .when('/wine', {
            templateUrl: 'views/wine.html',
            controller: 'wineController'
        })

        //Les différents vins
        .when('/wine/champagne', {
            templateUrl: 'views/wine_champagne.html',
            controller: 'wineController'
        })
        .when('/wine/rhone', {
            templateUrl: 'views/wine_rhone.html',
            controller: 'wineController'
        })
        .when('/wine/bordeaux', {
            templateUrl: 'views/wine_bordeaux.html',
            controller: 'wineController'
        })

        .when('/wine/bourgogne', {
            templateUrl: 'views/wine_bourgogne.html',
            controller: 'wineController'
        })

        .when('/wine/loire', {
            templateUrl: 'views/wine_loire.html',
            controller: 'wineController'
        })

        .when('/wine/alsace', {
            templateUrl: 'views/wine_alsace.html',
            controller: 'wineController'
        })

        .when('/wine/rhum', {
            templateUrl: 'views/wine_rhume.html',
            controller: 'wineController'
        })

        .when('/wine/whisky', {
            templateUrl: 'views/wine_whisky.html',
            controller: 'wineController'
        })

        .when('/wine/eaux', {
            templateUrl: 'views/wine_eaux.html',
            controller: 'wineController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })


        //Routage pour le jeu
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

        //Routage pour l'appli photo
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