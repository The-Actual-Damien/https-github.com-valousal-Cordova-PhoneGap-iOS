app.controller('allMomentsController', function ($scope, $rootScope, $cordovaFile) {

    if (!$rootScope.moments) {

        $cordovaFile.readFile('moments.json').then(
            function (result) {

                if (typeof result == 'string') {
                    $rootScope.moments = JSON.parse(result);
                }
                else {
                    $rootScope.moments = result;
                }

            }, function (err) { });

    }
});