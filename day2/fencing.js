const Polygon = require("polygon")

var {a,b,c,d,e,f,g,h,x} = require("./routes/routes")



// This example creates a simple polygon representing the Bermuda Triangle.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: x[2],
      mapTypeId: "terrain",
    });

    // Construct the geofencing
    const geofencing = new google.maps.Polygon({
      paths: x,
      strokeColor: a,
      strokeOpacity: b,
      strokeWeight: c,
      fillColor: d,
      fillOpacity: e,
      draggable:f,
      editable: g,
      visible: h
    });

    geofencing.setMap(map);
  }
