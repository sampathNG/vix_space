const Polygon = require("polygon")
// var Vec2 = require('vec2');
// const turf = require("@turf/line-to-polygon").default()

var {a,b,c,d,e,f,g,h,x} = require("./routes/routes")



// This example creates a simple polygon representing the Bermuda Triangle.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain",
    });
    // Define the LatLng coordinates for the polygon's path.
    // const triangleCoords = [
    //   { lat: 25.774, lng: -80.19 },
    //   { lat: 18.466, lng: -66.118 },
    //   { lat: 32.321, lng: -64.757 },
    //   { lat: 25.774, lng: -80.19 },
    // ];

    // const triangleCoords =  x

    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
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

    bermudaTriangle.setMap(map);
  }
