app.controller('aboutController', function ($scope, $rootScope, $location, $cordovaGeolocation) {

   $scope.getMap = function () {
        // create a map in the "map" div, set the view to a given place and zoom
        var map = L.map('map').setView([48.587732, 6.510320], 13);

        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // add a marker in the given location, attach some popup content to it and open the popup
        L.marker([48.587732, 6.510320]).addTo(map)
            .bindPopup('Les Vendanges de Fougeron<br>3 Avenue de la Libération<br>54300 Lunéville<br>France')
            .openPopup();
   };

});