function setupMap() {
	L.tileLayer('http://{s}.tile.cloudmade.com/35641192757b4ae989dff7e2104f3f7d/997/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);

	var height = $(window).height() - 50;
	var width = height * (4/3);
	$('#map').css({ width: width, height: height });
}

function userAdded(child) {
	$('#connected-count').html(++count);
	if (!markers.hasOwnProperty(child.id)) {
		var marker = L.marker([child.latitude, child.longitude]).addTo(map);
		markers[child.id] = marker;
		marker.addTo(map);
	}
}

function userLeft(id) {
	var marker = markers[id];
	delete markers[id];
	map.removeLayer(marker);
	$('#connected-count').html(--count);
}

function queryHash() {
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

