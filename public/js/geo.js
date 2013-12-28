$(document).ready(function() {
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

	var key = queryHash().q;
	if (key === undefined) {
		key = Math.random().toString(36).substr(2, 8);
		window.location.href += ("?q=" + key);
	}

	var fb = new Firebase('https://trackd.firebaseIO.com/' + key);
	var cloudmade = 'https://ssl_tiles.cloudmade.com/35641192757b4ae989dff7e2104f3f7d/997/256/{z}/{x}/{y}.png';
	var myself = fb.push();
	var id = myself.name();
	var markers = {};
	var count = 0;
	var	map = L.map('map');
	var first = true;

	myself.onDisconnect().remove();

	fb.on('child_added', function(child) {
		userAdded(child.val());
	});

	fb.on('child_removed', function(child) {
		userLeft(child.val());
	});

	fb.on('child_changed', function(child) {
		userUpdated(child.val());
	});

	setupMap();
	map.locate({ watch: true, enableHighAccuracy: true });

	map.on('locationfound', function(e) {
		if (first) {
			map.setView([e.latitude, e.longitude], 16);
			first = false;
		}

		myself.set({ id: id, latitude: e.latitude, longitude: e.longitude, updatedAt: +new Date });
	});
});
