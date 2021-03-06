  app.controller('gameController', function($scope, $rootScope, $resource, $http, $location, $routeParams, $q, Session) {
    $scope.createGame = function() {
      return $http({
        method: 'POST',
        url: 'http://valentin-salvestroni.fr/PhotoLocate/service/play/games',
        data: {
          player: $scope.games.player,
          level: $scope.games.level,
          ville: $scope.games.ville
        }
      }).success(function(games) {
        Session.set('token', games.token);
        Session.set('id', games.id);
        return $location.path("/games/play");
      }).error(function() {
        return console.log('error createGame');
      });
    };
    $scope.GetPictures = function() {
      return $http({
        method: 'GET',
        url: 'http://valentin-salvestroni.fr/PhotoLocate/service/play/games/' + Session.get('id') + '/photos?apiKey=' + Session.get('token')
      }).success(function(pictures) {
        return console.log('Ok GetPicture');
      }).error(function() {
        return console.log('error GetPicture');
      });
    };
    $scope.InitGame = function() {
      return $http({
        method: 'GET',
        url: "http://valentin-salvestroni.fr/PhotoLocate/service/play/games/" + Session.get('id') + "?apiKey=" + Session.get('token')
      }).success(function(game) {
        Session.set('lat', game.ville.lat);
        Session.set('lng', game.ville.lng);
        Session.set('zoom', game.zoom);
        Session.set('difficulte', game.difficulte);
        $scope.scoreTotal = 0;
        $scope.scoreManche = 0;
        $scope.nbMancheMax = Session.get('difficulte').nb_photos;
        $scope.nbManche = 0;
        $scope.timerValue = 0;
        $scope.zoom = Session.get('difficulte').temps;
        $scope.distanceDiff = Session.get('difficulte').distance;
        $scope.map = L.map('map').setView([Session.get('lat'), Session.get('lng')], $scope.zoom);
        $scope.markerTry = L.marker();
        $scope.distance = 0;
        $scope.greenIcon = L.icon({
          iconUrl: 'datas/img/marker-icon-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowAnchor: [12, 41],
          popupAnchor: [0, -25]
        });
        $scope.tile_layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo($scope.map);
        $scope.tile_layer.on('load', function() {
          $('#partieDebut').show();
        });
        return $scope.GetPictures().then(function(response) {
          Session.set('pictures', response.data);
          $scope.pictures = response.data;
          $scope.map.on('click', function(obj) {
            if ($scope.timerRunning && $scope.markerTry) {
              $scope.finManche(obj);
            }
          });
          $scope.debutPartie = function() {
            var arrayPhoto, i, object, _i, _len, _ref;
            $('#partieDebut').remove();
            $('#scoreManche').hide();
            $('#partieDebut').hide();
            arrayPhoto = new Array;
            i = 0;
            _ref = Session.get('pictures');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              object = _ref[_i];
              arrayPhoto[i] = {
                'href': object.href,
                'lat': object.image.lat,
                'lng': object.image.lng
              };
              i = i + 1;
            }
            Session.set('arrayPhoto', arrayPhoto);
            $scope.photoone = arrayPhoto[0].href;
            $scope.lat = arrayPhoto[0].lat;
            $scope.lng = arrayPhoto[0].lng;
            $scope.origin = [$scope.lat, $scope.lng];

            /*(arrayPhoto) ->
            						console.log(arrayPhoto[i])
             */
            $('#mancheSuivante').show();
          };
          $scope.mancheSuivante = function() {
            $scope.scoreManche = 0;
            $scope.resetTimer();
            $scope.verifNbManche();
          };
          $scope.go = function() {
            $scope.nbManche += 1;
            $('#mancheSuivante').hide();
            $('#shadow').hide();
            $scope.markerTry = L.marker();
            $scope.distance = 0;
            $scope.startTimer();
          };
          $scope.finManche = function(obj) {
            $scope.stopTimer();
            $scope.afficheScore(obj);
            $scope.showOrigin();
            setTimeout(function() {
              $scope.resetMap();
              $('#shadow').show();
              $('#scoreManche').show();
            }, 3000);
          };
          $scope.noTime = function() {
            $scope.stopTimer();
            $scope.showOrigin();
            setTimeout(function() {
              $scope.resetMap();
              $('#shadow').show();
              $('#scoreManche').show();
            }, 3000);
          };
          $scope.showOrigin = function() {
            setTimeout(function() {
              return $scope.originMarker = L.marker($scope.origin, {
                icon: $scope.greenIcon
              }).addTo($scope.map).bindPopup("C'??tait ici!").openPopup();
            }, 1000);
          };
          $scope.afficheScore = function(obj) {
            $('#partieDebut').hide();
            $scope.markerTry.setLatLng(obj.latlng).addTo($scope.map);
            $scope.distance = $scope.markerTry.getLatLng().distanceTo($scope.origin);
            $scope.calculScore($scope.distanceDiff / 3, (10/3));
            $scope.scoreTotal += $scope.scoreManche;
            $scope.timeManche = $scope.seconds;
            $scope.$apply();
          };
          $scope.calculScore = function(dist, time) {
            if (dist) {
              if ($scope.distance <= dist) {
                $scope.scoreManche = 5;
              }
              if ($scope.distance <= 2 * dist && $scope.distance > dist) {
                $scope.scoreManche = 3;
              }
              if ($scope.distance <= 3 * dist && $scope.distance > 2 * dist) {
                $scope.scoreManche = 1;
              }
              if ($scope.distance > 3 * dist) {
                $scope.scoreManche = 0;
              }
            }
            if (time) {
              if ($scope.timerValue <= time) {
                $scope.scoreManche *= 4;
              }
              if ($scope.timerValue <= 2 * time && $scope.timerValue > time) {
                $scope.scoreManche *= 2;
              }
              if ($scope.timerValue <= 3 * time && $scope.timerValue > 2 * time) {
                $scope.scoreManche *= 1;
              }
              if ($scope.timerValue > 3 * time) {
                $scope.scoreManche *= 0;
              }
            }
          };
          $scope.resetMap = function() {
            $scope.map.removeLayer($scope.markerTry);
            $scope.map.removeLayer($scope.originMarker);
            $scope.$apply();
          };
          $scope.verifNbManche = function() {
            if ($scope.nbManche < $scope.nbMancheMax) {
              $scope.photoone = Session.get('arrayPhoto')[$scope.nbManche].href;

              /*$scope.lat = Session.get('arrayPhoto')[$scope.nbManche].lat
              						$scope.lng = Session.get('arrayPhoto')[$scope.nbManche].lng
               */
              $scope.origin = [Session.get('arrayPhoto')[$scope.nbManche].lat, Session.get('arrayPhoto')[$scope.nbManche].lng];
              $('#scoreManche').hide();
              $('#mancheSuivante').show();
            } else {
              $scope.finPartie();
            }
          };
          $scope.startTimer = function() {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
          };
          $scope.stopTimer = function() {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
          };
          $scope.resetTimer = function() {
            $scope.$broadcast('timer-reset');
            $scope.timerRunning = false;
          };
          $scope.$on('timer-tick', function(event, args) {
            $scope.timerValue = args.millis + '';
            $scope.timerValue = parseInt($scope.timerValue / 1000);
            $scope.timerValue = 10 - $scope.timerValue;
          });
          $scope.finPartie = function() {
            $scope.stopTimer();
            setTimeout(function() {
              $scope.resetMap();
              $('#scoreManche').hide();
              $('#scoreFinal').show();
            }, 0);
            $http({
              method: 'PUT',
              url: 'http://valentin-salvestroni.fr/PhotoLocate/service/play/games/' + Session.get('id') + "?apiKey=" + Session.get('token'),
              data: {
                status: 'Finish',
                score: $scope.scoreTotal
              }
            }).success(function() {
              return console.log('ok');
            }).error(function() {
              console.log('error');
            });
          };
        });
      }).error(function() {
        return console.log($scope.games);
      });
    };
    return $scope.GetHighScore = function() {
      return $http({
        method: 'GET',
        url: 'http://valentin-salvestroni.fr/PhotoLocate/service/play/games/score/' + $scope.level + "?ville=" + $scope.ville
      }).success(function(HighScore) {
        console.log('ok');
        $scope.highscore = HighScore;
        return console.log(HighScore);
      }).error(function() {
        console.log('error');
        return console.log(level);
      });
    };
  });
