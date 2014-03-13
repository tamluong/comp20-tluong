
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(42.418333, -71.106667),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);