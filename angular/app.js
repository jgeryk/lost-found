(function(){
  var app = angular.module('lost-found', []);
	var map;
	var marker;
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
        center: new google.maps.LatLng(0, 0),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }
      map = new google.maps.Map(mapCanvas, mapOptions);
			google.maps.event.addListener(map, 'click', function(event) {
    		placeMarker(event.latLng);
			});
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(42.390921, -72.525994),
				map: map,
			});
    }
		
    google.maps.event.addDomListener(window, 'load', initialize);
  });
	function placeMarker(location) {
		marker.setMap(null);
		marker  = new google.maps.Marker({
				position: location,
				map: map,
			});
		document.getElementById('lat').value = location.lat();
		document.getElementById('lng').value = location.lng();
	}


  function Hello($scope, $http) {
    $http.get('/').
        success(function(data) {
            $scope.greeting = data;
        });
}

})();
