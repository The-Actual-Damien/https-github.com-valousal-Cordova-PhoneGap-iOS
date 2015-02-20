app.controller('oneMomentController', function ($scope, $rootScope, $routeParams) {

    $scope.moment = $rootScope.moments[$routeParams.id];
    $scope.getMap = function () {

        Microsoft.Maps.loadModule(
            'Microsoft.Maps.Map',
            {
                callback: function () {

                    map = new Microsoft.Maps.Map(
                        document.getElementById('divMap'),
                        {
                            credentials: 'ApwVDVpGkzPeEwUGZBt4JicxKf2xSN3vXX-ZeNXsRpyUhXUe0iClcukP7724uE3H',
                            center: new Microsoft.Maps.Location(
                                $scope.moment.geolocation.lat,
                                $scope.moment.geolocation.lon
                                ),
                            zoom: 15
                        });

                    var center = map.getCenter();
                    var pin = new Microsoft.Maps.Pushpin(
                        center,
                        { width: 50, height: 50, draggable: true }
                        );

                    map.entities.push(pin);

                }
            }
            );

    };

    if ($scope.moment.geolocation) {
        $scope.getMap();
    }

});