<script>
var map;function initMap(){console.log("initMap call"),map=new google.maps.Map(document.getElementById("map"),{center:{lat:-33.8688,lng:151.2195},zoom:13});var e=document.getElementById("pac_input"),o=new google.maps.places.Autocomplete(e,{componentRestrictions:{country:"us"}});o.bindTo("bounds",map);var n=new google.maps.Marker({map:map,anchorPoint:new google.maps.Point(0,-29)});o.addListener("place_changed",(function(){n.setVisible(!1);var e=o.getPlace(),t=e.formatted_address;if(console.log(t),$(document).ready((function(){$('input[name="location"]').val(t)})),e.geometry){e.geometry.viewport?map.setCenter(e.geometry.location):map.fitBounds(e.geometry.viewport),n.setPosition(e.geometry.location),n.setVisible(!0);e.address_components&&[e.address_components[0]&&e.address_components[0].short_name||"",e.address_components[1]&&e.address_components[1].short_name||"",e.address_components[2]&&e.address_components[2].short_name||""].join(" ")}else window.alert("No details available for input: '"+e.name+"'")}))}window.initMap=initMap;
//# sourceMappingURL=maps.js.map
</script>