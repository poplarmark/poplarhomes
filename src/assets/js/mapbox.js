// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken =
  "pk.eyJ1IjoicG9wbGFybWFyayIsImEiOiJjbGJ6eml2ZGQwbmhtNDJvY2k5dXlwdGdzIn0.BxQDkr7j7Z7QY0uw-pMWFA";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-79.4512, 43.6568],
  zoom: 13,
});

// Add the control to the map.
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  // Limit seach results to Australia.
  countries: "us",
  mapboxgl: mapboxgl,
});

document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

// Geocode placeholder override
window.addEventListener("load", function() {
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].placeholder='Address';
});