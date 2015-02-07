
app.controller('addMomentController', function ($scope, $rootScope, $location, $cordovaGeolocation, $cordovaCamera, $cordovaFile) {

    $scope.moment = {
        image: '',
        title: ''
    };

    $cordovaGeolocation.getCurrentPosition()
        .then(function (position) {

            $scope.moment.geolocation = { "lat": position.coords.latitude, "lon": position.coords.longitude };

        }, function (error) { },
        { enableHighAccuracy: true }
        );

    $scope.addMoment = function () {

        if ($rootScope.moments) {
            $rootScope.moments.push($scope.moment);
        }
        else {
            $rootScope.moments = [$scope.moment];
        }
        $scope.save();

    };

    $scope.save = function () {

        requestFileSystem(window.PERSISTENT, 0, fsReceived, errorHandler);
        $location.path('/');

    };

    var fsReceived = function (fileSystem) {
        fileSystem.root.getFile('moments.json', { create: true, exclusive: false }, feReceived, errorHandler);
    };

    var feReceived = function (fileEntry) {
        fileEntry.createWriter(fwReceived, errorHandler);
    };

    var fwReceived = function (fileWriter) {
        var momentsText = angular.toJson($scope.moments);
        fileWriter.write(momentsText);
    };

    var errorHandler = function (error) {

    };


   $scope.addPicture = function () {

        $cordovaCamera.getPicture()
            .then(function (imageData) {

                $scope.moment.image = imageData;

                var now = new Date();
                var nowString = now.getYear() + '' + now.getMonth() + '' + now.getDay() + '_' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
                var imageName = 'image-' + nowString + '.jpg';

                $cordovaFile.moveFile(imageData, imageName)
                    .then(function () {
                        $scope.moment.image = '/' + imageName;
                    }, errorHandler);

            })

    };

});