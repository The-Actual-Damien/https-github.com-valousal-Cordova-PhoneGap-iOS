
var app = angular.module('myMoments', ['ngRoute', 'ngCordova']);

app.config(function ($routeProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist('/');

    $routeProvider
        .when('/', {
            templateUrl: 'views/allMoments.html',
            controller: 'allMomentsController'
        })
        .when('/addmoment', {
            templateUrl: 'views/addMoment.html',
            controller: 'addMomentController'
        })
        .otherwise({ redirectTo: '/' });

});