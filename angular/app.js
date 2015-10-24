(function(){
  var app = angular.module('lost-found', []);

  app.controller('mapController', function(){

    this.title = "Found Map";
    this.mapShow = true;

    this.toggleMap = function(){
      console.log('oooooh');
      this.mapShow = !this.mapShow;
      console.log(this.mapShow);
    }

    function initialize() {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(42.390921, -72.525994),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }
      var map = new google.maps.Map(mapCanvas, mapOptions)
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  });

  function Hello($scope, $http) {
    $http.get('/').
        success(function(data) {
            $scope.greeting = data;
        });
}

})();
