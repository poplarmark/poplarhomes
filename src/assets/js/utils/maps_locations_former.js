// Locations map 
var locations_geocoder;
var locations_map;
var locations_address = "{{wf {&quot;path&quot;:&quot;address-details&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}";
var locations_image = "https://uploads-ssl.webflow.com/631ada5b454cce3ae6474e07/63e3d8d5782ef44764b93261_icon_map-pin.svg";

locations_geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(44.85767897439299, -93.40209113112228);
var locations_map_options = {
  zoom: 15,
  center: latlng,
  mapId: "df2547a6ba8c2b01",
  zoomControl: true,
  scaleControl: true,
  streetViewControl: true,
  fullscreenControl: false,
  mapTypeControl: false,
  navigationControl: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
locations_map = new google.maps.Map(document.getElementById("locations_map"), locations_map_options);
if (locations_geocoder) {
  locations_geocoder.geocode(
    {
      address: locations_address,
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          locations_map.setCenter(results[0].geometry.location);
          var infowindow = new google.maps.InfoWindow({
            content:
              "<p><b>" +
              "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}" +
              "</b></p><br><p>" +
              "{{wf {&quot;path&quot;:&quot;address-details&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}" +
              '</p><div style="border-top: 1px solid rgb(204, 204, 204); margin-top: 9px; padding: 6px; font-size: 13px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-family: Roboto, Arial;"><a href="https://www.google.com/maps/search/?api=1&query={{wf {&quot;path&quot;:&quot;address-details&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}" target="_blank" rel="noopener" style="cursor: pointer; color: rgb(66, 127, 237); text-decoration: none;">View on Google Maps</a></div>',
          });

          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: locations_map,
            title: locations_address,
            icon: locations_image,
          });
          google.maps.event.addListener(marker, "click", function () {
            infowindow.open(locations_map, marker);
          });
        } else {
          alert("No results found");
        }
      } else {
        alert(
          "Geocode was not successful for the following reason: " + status
        );
      }
    }
  );
}