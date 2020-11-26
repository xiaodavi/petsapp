console.log("test");

const stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.034084142948,
          38.909671288923
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 15th St NW",
        "postalCode": "20005",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.049766,
          38.900772
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 507-8357",
        "phone": "2025078357",
        "address": "2221 I St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 22nd St NW",
        "postalCode": "20037",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043929,
          38.910525
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 387-9338",
        "phone": "2023879338",
        "address": "1512 Connecticut Ave NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at Dupont Circle",
        "postalCode": "20036",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.0672,
          38.90516896
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 337-9338",
        "phone": "2023379338",
        "address": "3333 M St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 34th St NW",
        "postalCode": "20007",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.002583742142,
          38.887041080933
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 547-9338",
        "phone": "2025479338",
        "address": "221 Pennsylvania Ave SE",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "btwn 2nd & 3rd Sts. SE",
        "postalCode": "20003",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.933492720127,
          38.99225245786
        ]
      },
      "properties": {
        "address": "8204 Baltimore Ave",
        "city": "College Park",
        "country": "United States",
        "postalCode": "20740",
        "state": "MD"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.097083330154,
          38.980979
        ]
      },
      "properties": {
        "phoneFormatted": "(301) 654-7336",
        "phone": "3016547336",
        "address": "4831 Bethesda Ave",
        "cc": "US",
        "city": "Bethesda",
        "country": "United States",
        "postalCode": "20814",
        "state": "MD"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.359425054188,
          38.958058116661
        ]
      },
      "properties": {
        "phoneFormatted": "(571) 203-0082",
        "phone": "5712030082",
        "address": "11935 Democracy Dr",
        "city": "Reston",
        "country": "United States",
        "crossStreet": "btw Explorer & Library",
        "postalCode": "20190",
        "state": "VA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.10853099823,
          38.880100922392
        ]
      },
      "properties": {
        "phoneFormatted": "(703) 522-2016",
        "phone": "7035222016",
        "address": "4075 Wilson Blvd",
        "city": "Arlington",
        "country": "United States",
        "crossStreet": "at N Randolph St.",
        "postalCode": "22203",
        "state": "VA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.28784,
          40.008008
        ]
      },
      "properties": {
        "phoneFormatted": "(610) 642-9400",
        "phone": "6106429400",
        "address": "68 Coulter Ave",
        "city": "Ardmore",
        "country": "United States",
        "postalCode": "19003",
        "state": "PA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.20121216774,
          39.954030175164
        ]
      },
      "properties": {
        "phoneFormatted": "(215) 386-1365",
        "phone": "2153861365",
        "address": "3925 Walnut St",
        "city": "Philadelphia",
        "country": "United States",
        "postalCode": "19104",
        "state": "PA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043959498405,
          38.903883387232
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 331-3355",
        "phone": "2023313355",
        "address": "1901 L St. NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 19th St",
        "postalCode": "20036",
        "state": "D.C."
      }
    }
  ]
};

// add some arbitrary coords
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
      "data": "stores"
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
    const prop = store.properties;

    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById('listings');
    const listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = "link-" + prop.id;
    link.innerHTML = prop.address;

    /* Add details to the individual listing. */
    const details = listing.appendChild(document.createElement('div'));
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
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>Sweetgreen</h3>' +
      '<h4>' + currentFeature.properties.address + '</h4>')
    .addTo(map);
}

// eventlistener
link.addEventListener('click', function(e){
  for (let i=0; i < data.features.length; i++) {
    if (this.id === "link-" + data.features[i].properties.id) {
      var clickedListing = data.features[i];
      flyToStore(clickedListing);
      createPopUp(clickedListing);
    }
  }  
  const activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  this.parentNode.classList.add('active');
});

map.on('click', function(e) {
  /* Determine if a feature in the "locations" layer exists at that point. */
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['locations']
  });
  
  /* If yes, then: */
  if (features.length) {
    const clickedPoint = features[0];
    
    /* Fly to the point */
    flyToStore(clickedPoint);
    
    /* Close all other popups and display popup for clicked store */
    createPopUp(clickedPoint);
    
    /* Highlight listing in sidebar (and remove highlight for all other listings) */
    const activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    const listing = document.getElementById('listing-' + clickedPoint.properties.id);
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
    const el = document.createElement('div');
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
  const activeItem = document.getElementsByClassName('active');
  e.stopPropagation();
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  const listing = document.getElementById('listing-' + marker.properties.id);
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