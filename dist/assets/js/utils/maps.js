<script>
function initAutocomplete(){const e=new google.maps.Map(document.getElementById("map"),{center:{lat:-33.8688,lng:151.2195},zoom:13,mapTypeId:"roadmap"}),o=document.getElementById("pac_input").value;e.controls[google.maps.ControlPosition.TOP_LEFT].push(o),e.addListener("bounds_changed",(()=>{searchBox.setBounds(e.getBounds())}));let n=[];searchBox.addListener("places_changed",(()=>{const o=searchBox.getPlaces();if(0==o.length)return;n.forEach((e=>{e.setMap(null)})),n=[];const t=new google.maps.LatLngBounds;o.forEach((o=>{if(!o.geometry||!o.geometry.location)return void console.log("Returned place contains no geometry");const a={url:o.icon,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)};n.push(new google.maps.Marker({map:e,icon:a,title:o.name,position:o.geometry.location})),o.geometry.viewport?t.union(o.geometry.viewport):t.extend(o.geometry.location)})),e.fitBounds(t)}))}google.maps.event.addDomListener(window,"load",initAutocomplete);
//# sourceMappingURL=maps.js.map
</script>