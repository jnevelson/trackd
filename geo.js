function setupMap() {
	L.tileLayer(cloudmade, { maxZoom: 18 }).addTo(map);
	$('#map').css({ height: $(window).height() - 50 });
}

function userAdded(child) {
	$('#connected-count').html(++count);
	if (!markers.hasOwnProperty(child.id)) {
		var marker = L.marker([child.latitude, child.longitude]).addTo(map);
		markers[child.id] = marker;
		marker.addTo(map);
	}
}

function userLeft(child) {
	var marker = markers[child.id];
	delete markers[child.id];
	map.removeLayer(marker);
	$('#connected-count').html(--count);
}

function userUpdated(child) {
	userLeft(child);
	userAdded(child);
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

