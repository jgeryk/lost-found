angular.module('mapController', ['uiGmapGoogleMapApi']).controller('MapController', function ($scope, uiGmapGoogleMapApi) {

    $scope.showMap = true;
    $scope.map = {
        center: {latitude: 42.3670, longitude: -72.5170},
        zoom: 12,
        bounds: {northeast: {latitude: 70, longitude: 180}, southwest: {latitude: -70, longitude: -180}}
    };

    marker1 = {
        id: 0,
        latitude: 42.3670,
        longitude: -72.5170,
        title: "m1",
        id: 0,
        show: false,
        desc: "Come do this job for me I'll give you some cheese"
    }

    marker2 = {
        id: 0,
        latitude: 42.3679,
        longitude: -72.5179,
        title: "m2",
        id: 1,
        show: false,
        desc: "Another great marker"

    }

    $scope.markers = [marker1, marker2];

    uiGmapGoogleMapApi.then(function(maps){
        console.log("promise");
        $scope.showMap = true;


    });
});
