

mapboxgl.accessToken =
"pk.eyJ1Ijoic2hpdmFua2FyIiwiYSI6ImNraTcyeTh2ZDA5ZXkyeXMwaGpmZGRsem8ifQ.idNjDwRAFx05a34AVj_99A"




navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
enableHighAccuracy: true
})



function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
  }
  
  function errorLocation() {
    setupMap([77,28])
  }
  
  function setupMap(center) {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 18
    })
  
    map.addControl(new mapboxgl.NavigationControl());
    //map.addControl(directions, "top-left")
  }


/*
const nav = new mapboxgl.NavigationControl()
map.addControl(nav)

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken
})

var marker = new mapboxgl.Marker()
.setLngLat([long, lat])
.addTo(map);
*/