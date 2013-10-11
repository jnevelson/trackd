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
	map = new google.maps.Map($("#map")[0], mapOptions);
	set_dimensions();
}

function set_dimensions()
{
	var height = $(window).height() - 50;
	var width = height * (4/3);
	$('#map').css({width: width, height: height});
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

function queryHash()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
