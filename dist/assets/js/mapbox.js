<script>
mapboxgl.accessToken="pk.eyJ1IjoicG9wbGFybWFyayIsImEiOiJjbGJ6eml2ZGQwbmhtNDJvY2k5dXlwdGdzIn0.BxQDkr7j7Z7QY0uw-pMWFA";const map=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v12",center:[-79.4512,43.6568],zoom:13}),geocoder=new MapboxGeocoder({accessToken:mapboxgl.accessToken,countries:"us",mapboxgl:mapboxgl});document.getElementById("geocoder").appendChild(geocoder.onAdd(map)),window.addEventListener("load",(function(){document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].placeholder="Address"}));
//# sourceMappingURL=mapbox.js.map
</script>