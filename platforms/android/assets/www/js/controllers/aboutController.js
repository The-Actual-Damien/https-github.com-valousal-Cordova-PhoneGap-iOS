app.controller('aboutController', function ($scope, $rootScope, $location, $cordovaGeolocation) {
$scope.getMap = function () {
    $cordovaGeolocation.getCurrentPosition()
        .then(function (position) {

                    // create a map in the "map" div, set the view to a given place and zoom
                    var map = L.map('map').setView([48.587732, 6.510320], 10);

                    // add an OpenStreetMap tile layer
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    // add a marker in the given location, attach some popup content to it and open the popup
                    //L.marker([48.587732, 6.510320]).addTo(map)
                        //.bindPopup('Les Vendanges de Fougeron<br>3 Avenue de la Libération<br>54300 Lunéville<br>France')
                        //.openPopup();

                    L.Routing.control({
                        waypoints: [
                            L.latLng(position.coords.latitude, position.coords.longitude),
                            L.latLng(48.587732, 6.510320)
                        ],


                        lineOptions: {
                            styles: [
                              // Shadow
                              {color: 'black', opacity: 0.8, weight: 11},
                              // Outline
                              {color: 'green', opacity: 0.8, weight: 8},
                              // Center
                              {color: 'orange', opacity: 1, weight: 4}
                            ],
                          },



                    }).addTo(map);


        }, function (error) { },
        { enableHighAccuracy: true }
    );
};


});