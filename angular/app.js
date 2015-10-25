(function(){
  var app = angular.module('lost-found', []);
	var map;

  app.controller('mapController', function($scope){
    var self = this;
    this.title = "Found Map";
    self.currentLatitude =  2131;
    self.currentLongitude = 23423;
    this.mapShow = true;
    function printCoords(){
      console.log(currentLatitude);
      console.log(currentLongitude);
    }
    this.toggleMap = function(){
      console.log('oooooh');
      this.mapShow = !this.mapShow;
      console.log(this.mapShow);
    }
    function getLoc(position, initialize) {
      self.currentLatitude = position.coords.latitude;
      self.currentLongitude = position.coords.longitude;

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(self.currentLatitude, self.currentLongitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.HYBRID
        }
        map = new google.maps.Map(mapCanvas, mapOptions);
        google.maps.event.addListener(map, 'click', function(event) {
          placeMarker(event.latLng);
        });

      function placeMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
        });
        self.currentLatitude = location.lat();
        self.currentLongitude = location.lng();
        console.log(self.currentLatitude);
        console.log(self.currentLongitude);
        document.getElementById('lat') = location.lat();
        document.getElementById('lng') = location.lng();
      }

      google.maps.event.addDomListener(window, 'load', initialize);

    }

    // console.log(lat);
    // console.log(lng);
    navigator.geolocation.getCurrentPosition(getLoc);

    // function initialize() {
    //   console.log('whhaaat');
    //   var mapCanvas = document.getElementById('map');
    //   console.log(currentLatitude);
    //   console.log(currentLongitude);
    //   var mapOptions = {
    //     center: new google.maps.LatLng(currentLatitude, currentLongitude),
    //     zoom: 16,
    //     mapTypeId: google.maps.MapTypeId.HYBRID
    //   }
    //   map = new google.maps.Map(mapCanvas, mapOptions);
    //   google.maps.event.addListener(map, 'click', function(event) {
    //     placeMarker(event.latLng);
    //   });
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);
    //
    //
    // function placeMarker(location) {
    //   var marker = new google.maps.Marker({
    //     position: location,
    //     map: map,
    //   });
    //   console.log(location.lat());
    //   console.log(location.lng());
    //   document.getElementById('lat') = location.lat();
    //   document.getElementById('lng') = location.lng();
    // }
  });



  function Hello($scope, $http) {
    $http.get('/').
        success(function(data) {
            $scope.greeting = data;
        });
}

})();
