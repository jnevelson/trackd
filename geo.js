function geoSuccess(loc)
{
  myself.set({ id: id, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  $('#lat').html(loc.coords.latitude);
  $('#lon').html(loc.coords.longitude);

  set_center(loc.coords);
}

function show_map()
{
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(35, -120),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($("#geo-wrapper")[0], mapOptions);

  $('#geo-wrapper').css({width: $(window).width(), height: $(window).height()});
}

function add_user(child)
{
  $('#connected-count').html(++count);
  if (!markers.hasOwnProperty(child.id)) {
    var ll = new google.maps.LatLng(child.latitude, child.longitude);
    var marker = new google.maps.Marker({ id: id, position: ll });
    markers[child.id] = marker;
    marker.setMap(map);

    set_center(child);
  }
}

function remove_user(id)
{
  var marker = markers[id];
  delete markers[id];
  marker.setMap(null);
  $('#connected-count').html(--count);
}

function set_center(loc)
{
  map.setCenter(new google.maps.LatLng(loc.latitude, loc.longitude));
}
