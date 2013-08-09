function geoSuccess(loc)
{
  fb.child(id).set({ id: id, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  $('#lat').html(loc.coords.latitude);
  $('#lon').html(loc.coords.longitude);
}

function show_map()
{
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(35, -120),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($("#geo-wrapper")[0], mapOptions);
}

function add_user(child)
{
  if (!markers.hasOwnProperty(child.id)) {
    var ll = new google.maps.LatLng(child.latitude, child.longitude);
    var marker = new google.maps.Marker({ id: id, position: ll });
    markers[child.id] = marker;
    marker.setMap(map);
    $('#connected-count').html(count++);
  }
}

function remove_user(id)
{
  var marker = markers[id];
  delete markers[id];
  marker.setMap(null);
  $('#connected-count').html(count--);
}

