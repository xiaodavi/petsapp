console.log("test");

// add some arbitrary co ords
let coords = [
	[15.32962, 48.2271],
	[7.749117, 46.020714],
];

// drawing the map. show the documentation and how to navigate it

// generate the access token from mapbox.com
mapboxgl.accessToken =
	"pk.eyJ1IjoieGlhb21hb3ppIiwiYSI6ImNraHFjZ2RueTA3eTIyeXQwdWhlbmZ2dHcifQ.PXe3zD3g4W9dx0H-houtbg";
//   identify the div the map will be drawn in
const map = new mapboxgl.Map({
	container: "map",
	//   styles can be generated from mapbox.com
	style: 'mapbox://styles/mapbox/streets-v11',
	// center: where the map loads first
	center: [13.404954, 52.520008],// Berlin
	doubleClickZoom: true,
	zoom: 10,
	pitch: 100,
	// this is in the markers and controls section
	options: {
		anchor: "top-left",
	},
});

stores.features.forEach(function(store, i){
  store.properties.id = i;
});

map.on('load', function (e) {
  /* Add the data to your map as a layer */
  map.addLayer({
    "id": "locations",
    "type": "symbol",
    /* Add a GeoJSON source containing place coordinates and information. */
    "source": {
      "type": "geojson",
      "data": "/neighborhood.geojson"
    },
    "layout": {
      "icon-image": "/images/marker.png",
      "icon-allow-overlap": true,
    }
  });
  buildLocationList(stores);
});

function buildLocationList(data) {
  data.features.forEach(function(store, i){
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
    **/
    var prop = store.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = "link-" + prop.id;
    link.innerHTML = prop.address;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ' · ' + prop.phoneFormatted;
    }
  });
}


// interactively functions

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>Sweetgreen</h3>' +
      '<h4>' + currentFeature.properties.address + '</h4>')
    .addTo(map);
}

// eventlistener
link.addEventListener('click', function(e){
  for (var i=0; i < data.features.length; i++) {
    if (this.id === "link-" + data.features[i].properties.id) {
      var clickedListing = data.features[i];
      flyToStore(clickedListing);
      createPopUp(clickedListing);
    }
  }  
  var activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  this.parentNode.classList.add('active');
});

map.on('click', function(e) {
  /* Determine if a feature in the "locations" layer exists at that point. */
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['locations']
  });
  
  /* If yes, then: */
  if (features.length) {
    var clickedPoint = features[0];
    
    /* Fly to the point */
    flyToStore(clickedPoint);
    
    /* Close all other popups and display popup for clicked store */
    createPopUp(clickedPoint);
    
    /* Highlight listing in sidebar (and remove highlight for all other listings) */
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    var listing = document.getElementById('listing-' + clickedPoint.properties.id);
    listing.classList.add('active');
  }
  // custom maker
  map.addSource('places', {
    type: 'geojson',
    data: stores
  });

  addMarkers();
});



// add maker to map
function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach(function(marker) {
    /* Create a div element for the marker. */
    var el = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    el.id = "marker-" + marker.properties.id;
    /* Assign the `marker` class to each marker for styling. */
    el.className = 'marker';
    
    /**
     * Create a marker using the div element
     * defined above and add it to the map.
    **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });
}

// add new event listener
el.addEventListener('click', function(e){
  /* Fly to the point */
  flyToStore(marker);
  /* Close all other popups and display popup for clicked store */
  createPopUp(marker);
  /* Highlight listing in sidebar */
  var activeItem = document.getElementsByClassName('active');
  e.stopPropagation();
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  var listing = document.getElementById('listing-' + marker.properties.id);
  listing.classList.add('active');
});

// // a cat sit on the map
// map.on('load', function () {
//   map.loadImage(
//   '/images/201408_cat.png',
//   function (error, image) {
//   if (error) throw error;
//   map.addImage('cat', image);
//   map.addSource('point', {
//   'type': 'geojson',
//   'data': {
//   'type': 'FeatureCollection',
//   'features': [
//   {
//   'type': 'Feature',
//   'geometry': {
//   'type': 'Point',
//   'coordinates': [0, 0]
//   }
//   }
//   ]
//   }
//   });
//   map.addLayer({
//   'id': 'points',
//   'type': 'symbol',
//   'source': 'point',
//   'layout': {
//   'icon-image': 'cat',
//   'icon-size': 0.25
//   }
//   });
//   }
//   );
//   });


// // demo adding a pop up
// const popup = new mapboxgl.Popup({ closeButton: true });
// popup.addTo(map);
// popup.setLngLat([13.405, 52.52]);
// popup.setMaxWidth("200px");
// popup.setHTML(
// 	`<h2>Choose a Cafe to meet</h2>`
// );

// coords.forEach((location) => {
// 	console.log(location);
// 	// https://docs.mapbox.com/mapbox-gl-js/api/markers/
// 	let marker = new mapboxgl.Marker({
// 		scale: 1,
// 		draggable: true,
// 		color: "red",
// 		rotation: 10,
// 	});
// 	marker.setLngLat(location);
// 	marker.addTo(map);
// 	// first do the console.log and then do the rest of the stuff
// 	marker.on("dragend", (data) => {
// 		console.log("hello? Is it data?", data.target.getLngLat());
// 		popup.addTo(map);
// 		popup.setLngLat(data.target.getLngLat());
// 		popup.setMaxWidth("200px");
// 		popup.setHTML(
// 			`<h2>What a location</h2> <h3>location: ${data.target.getLngLat()} </h3>`
// 		);
// 	});
// });