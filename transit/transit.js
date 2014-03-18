var stations_str = '[{"line":"blue","station":"Wonderland","lat":42.41342,"lng":-70.991648},{"line":"blue","station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"line":"blue","station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"line":"blue","station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"line":"blue","station":"Orient Heights","lat":42.386867,"lng":-71.00473599999999},{"line":"blue","station":"Wood Island","lat":42.3796403,"lng":-71.02286539000001},{"line":"blue","station":"Airport","lat":42.374262,"lng":-71.030395},{"line":"blue","station":"Maverick","lat":42.36911856,"lng":-71.03952958000001},{"line":"blue","station":"Aquarium","lat":42.359784,"lng":-71.051652},{"line":"blue","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"blue","station":"Government Center","lat":42.359705,"lng":-71.05921499999999},{"line":"blue","station":"Bowdoin","lat":42.361365,"lng":-71.062037},{"line":"orange","station":"Oak Grove","lat":42.43668,"lng":-71.07109699999999},{"line":"orange","station":"Malden Center","lat":42.426632,"lng":-71.07411},{"line":"orange","station":"Wellington","lat":42.40237,"lng":-71.077082},{"line":"orange","station":"Sullivan","lat":42.383975,"lng":-71.076994},{"line":"orange","station":"Community College","lat":42.373622,"lng":-71.06953300000001},{"line":"orange","station":"North Station","lat":42.365577,"lng":-71.06129},{"line":"orange","station":"Haymarket","lat":42.363021,"lng":-71.05829},{"line":"orange","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"orange","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"orange","station":"Chinatown","lat":42.352547,"lng":-71.062752},{"line":"orange","station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"line":"orange","station":"Back Bay","lat":42.34735,"lng":-71.075727},{"line":"orange","station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"line":"orange","station":"Ruggles","lat":42.336377,"lng":-71.088961},{"line":"orange","station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"line":"orange","station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"line":"orange","station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"line":"orange","station":"Green Street","lat":42.310525,"lng":-71.10741400000001},{"line":"orange","station":"Forest Hills","lat":42.300523,"lng":-71.113686},{"line":"red","station":"Alewife","lat":42.395428,"lng":-71.142483},{"line":"red","station":"Davis","lat":42.39674,"lng":-71.121815},{"line":"red","station":"Porter Square","lat":42.3884,"lng":-71.11914899999999},{"line":"red","station":"Harvard Square","lat":42.373362,"lng":-71.118956},{"line":"red","station":"Central Square","lat":42.365486,"lng":-71.103802},{"line":"red","station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"line":"red","station":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"line":"red","station":"Park Street","lat":42.35639457,"lng":-71.0624242},{"line":"red","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"red","station":"South Station","lat":42.352271,"lng":-71.05524200000001},{"line":"red","station":"Broadway","lat":42.342622,"lng":-71.056967},{"line":"red","station":"Andrew","lat":42.330154,"lng":-71.057655},{"line":"red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"line":"red","station":"North Quincy","lat":42.275275,"lng":-71.029583},{"line":"red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"line":"red","station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"line":"red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"line":"red","station":"Braintree","lat":42.2078543,"lng":-71.0011385},{"line":"red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"line":"red","station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"line":"red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"line":"red","station":"North Quincy","lat":42.275275,"lng":-71.029583},{"line":"red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"line":"red","station":"Savin Hill","lat":42.31129,"lng":-71.053331},{"line":"red","station":"Fields Corner","lat":42.300093,"lng":-71.061667},{"line":"red","station":"Shawmut","lat":42.29312583,"lng":-71.06573796000001},{"line":"red","station":"Ashmont","lat":42.284652,"lng":-71.06448899999999}]';

var myLat = 42.418333;
var myLng =  -71.106667;
var me = new google.maps.LatLng(myLat, myLng);
var mapOptions = {
    zoom: 12, // The larger the zoom number, the bigger the zoom
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var meMarker;
var infowindow = new google.maps.InfoWindow();
var meInfowindow = new google.maps.InfoWindow();
var xhr;
var lineColor;
var markers = new Array();
var stations;
var SHORTEST_DIST = 100000000000;
var shortest_dist = SHORTEST_DIST;
var nearestStation;
var polylineCoords = new Array();
var image = {
    url: "beijingtrain.png",
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(40, 40),
    // The origin for this image is 0,0.
    //origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    //anchor: new google.maps.Point(50, 50)
}

function initialize() {
    //creating the map
    map = new google.maps.Map(document.getElementById("map-canvas"),
                                  mapOptions);
    
    initStations();
    getMyLocation();
}

function initStations() {
    stations = JSON.parse(stations_str);
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                                                 myLat = position.coords.latitude;
                                                 myLng = position.coords.longitude;
                                                 renderMap();
                                                 });
    } else {
        alert("Geolocation is not supported by your web browser!");
    }
}

function renderMap() {
    me = new google.maps.LatLng(myLat, myLng);
    
    map.panTo(me);
    
    meMarker = new google.maps.Marker({
                                    position: me,
                                      title: "I am here!"
                                    });
    meMarker.setMap(map);
    
    xhr = new XMLHttpRequest();
    xhr.open("get","http://mbtamap.herokuapp.com/mapper/rodeo.json",true);
    xhr.onreadystatechange = dataReady;
    xhr.send(null);
}

function dataReady() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        renderGraphics();
    }
    else if (xhr.readyState == 4 && xhr.status == 500) {
        meInfowindow.setOptions({
                               content: "So much fail!",
                               position: me
        })
        meInfowindow.open(map,meMarker);
    }
}

function renderGraphics() {
    data = JSON.parse(xhr.responseText);
    
    lineColor = data["line"];
    
    //looping through the stations in the list
    stations.forEach(function(station){

        //checking whether it is the right line color
        if (station.line == lineColor) {
            var staLoc = new google.maps.LatLng(station.lat,station.lng);

            //setting up markers
            var marker = new google.maps.Marker({
                                            position: staLoc,
                                            icon: image,
                                            map: map
            });

            //setting infowindow for trains timing
            //first prepare the TABLE!
            var table = "<span id=tableName>" + station.station + "</span></br>" +
                        '<table id="schedule"><tr>' +
                        '<th>Line</th><th>Trip Number</th>' +
                        '<th>Direction</th>' +
                        '<th>Time Remaining</th></tr>';
            data.schedule.forEach(function(train){
                train.Predictions.forEach(function(predicted){
                    if (predicted.Stop == station.station){
                        table += '<tr><td>' + lineColor + '</td>' +
                                '<td>' + train.TripID + '</td>' +
                                '<td>' + train.Destination + '</td>';
                        minutes = Math.floor(predicted.Seconds/60);
                        seconds = predicted.Seconds - (minutes*60);
                        if (minutes < 10) {minutes += "0";}
                        if (seconds < 10) {seconds += "0";}
                        table += '<td>' + minutes + ':' + seconds + '</td></tr>';
                    }
                })
            })
            //now add infowindow 
            google.maps.event.addListener(marker,'click',function() {
                infowindow.close();
                meInfowindow.close();
                infowindow.setContent(table);
                infowindow.open(map, this);
            })
        
            //pusing to polyline array
            polylineCoords.push(staLoc);

            //lastly, we need to determine the nearest station
            var distance = dist(station.lat, station.lng);
            if (distance < shortest_dist) {
                shortest_dist = distance;
                nearestStation = station.station;
            }
            shortest_dist = Math.round(shortest_dist*100)/100;
            //setting the infowindow for me! Yay!!!
            meInfowindow.setOptions({
                content: '<span id=eureka>Eureka! I am here!</span>' + 
                         ' <br> The closest station is: ' +
                         nearestStation + '<br> And the distance is: ' +
                         shortest_dist + 'miles',
                position: me,
            })
            meInfowindow.open(map,meMarker);
            //in case user wants to know the closest station again
            google.maps.event.addListener(meMarker,'click',function() {
                meInfowindow.close();
                //meInfowindow.setContent(table);
                meInfowindow.open(map, this);
            })
    
        }
    });
    drawPolyline();
}

function drawPolyline() {

    //set color
    var polylineColor = '#FFA500';
    if (lineColor == "red") {
        polylineColor = '#FF0000';
    }
    else if (lineColor == "blue") {
        polylineColor = '#0000FF';
    }
    var polyline = new google.maps.Polyline({
        path: polylineCoords,
        geodesign: true,
        strokeColor: polylineColor,
        strokeWeight: 3
    })
    polyline.setMap(map);
}

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

function dist(lat,lng) {
    var R = 6371; // km 
    var x1 = myLat - lat;
    var dLat = x1.toRad();  
    var x2 = myLng - lng;
    var dLon = x2.toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat.toRad()) * Math.cos(myLat.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

    return d;
}



























