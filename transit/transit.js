
      function initialize() {
      	//set up center of the map
      	var landmark = new google.maps.LatLng(42.418333, -71.106667);
      	
      	//set map options
        var mapOptions = {
          center: landmark,
          zoom: 12
        };
        
        //creating the map
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
            
        
        //create a marker
        var marker = new google.maps.Marker({
        	position: landmark,
        	title: "Medford"
        });
        marker.setMap(map);
        
        //global info window
        var infowindow = new google.maps.InfoWindow();
        
        //Open info window on click
        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent(marker.title);
        	infowindow.open(map, marker);
        });
      }
      //google.maps.event.addDomListener(window, 'load', initialize);