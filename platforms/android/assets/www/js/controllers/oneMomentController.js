app.controller('oneMomentController', function ($scope, $rootScope, $routeParams) {

    $scope.moment = $rootScope.moments[$routeParams.id];
    $scope.getMap = function () {

        /*Microsoft.Maps.loadModule(
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
        );*/
       // create a map in the "map" div, set the view to a given place and zoom
       var map = L.map('divMap').setView([$scope.moment.geolocation.lat,$scope.moment.geolocation.lon], 10);

       // add an OpenStreetMap tile layer
       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(map);

       // add a marker in the given location, attach some popup content to it and open the popup
       L.marker([$scope.moment.geolocation.lat,$scope.moment.geolocation.lon]).addTo(map)
               .bindPopup('Photo prise ici')
            .openPopup();

    };

    /*if ($scope.moment.geolocation) {
        $scope.getMap();
    }*/

});