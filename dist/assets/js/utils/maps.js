<script>
function initAutocomplete(){const e=new google.maps.Map(document.getElementById("map"),{center:{lat:-33.8688,lng:151.2195},zoom:13,mapTypeId:"roadmap"}),o=document.getElementById("pac_input"),n=new google.maps.places.SearchBox(o);e.controls[google.maps.ControlPosition.TOP_LEFT].push(o),e.addListener("bounds_changed",(()=>{n.setBounds(e.getBounds())}));let t=[];n.addListener("places_changed",(()=>{const o=n.getPlaces();if(0==o.length)return;t.forEach((e=>{e.setMap(null)})),t=[];const a=new google.maps.LatLngBounds;o.forEach((o=>{if(!o.geometry||!o.geometry.location)return void console.log("Returned place contains no geometry");const n={url:o.icon,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)};t.push(new google.maps.Marker({map:e,icon:n,title:o.name,position:o.geometry.location})),o.geometry.viewport?a.union(o.geometry.viewport):a.extend(o.geometry.location)})),e.fitBounds(a)}))}google.maps.event.addDomListener(window,"load",initAutocomplete);
//# sourceMappingURL=maps.js.map
</script>