
// Create the map object
const myMap = L.map("map", {
    center: [28.304381, -196.526448],
    zoom: 2.5
  });
  
  // Adding the tile layer for Open Street Map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Definite URL variable of geoJSON link
  const baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson?";
  
  // Create a function for the radius of markers related to magnitude
  function calculateRadius(magnitude) {
    return magnitude * 3;
  }
  
  // Create a function for coloring the markers according to depth
  function getColor(depth) {
    if (depth > 90) {
      return "darkred";
    }
    if (depth > 70) {
      return "red";
    }
    if (depth > 50) {
      return "orange";
    }
    if (depth > 30) {
      return "yellow";
    }
    if (depth > 10) {
      return "green";
    }
    return "blue";
  }
  
  // Call in the data and visualize on map
  d3.json(baseURL).then(function (data) {
    L.geoJSON(data, {
      pointToLayer: function (feature, latLng) {
        return L.circleMarker(latLng);
      },
  
      // Bind Popups to each feature
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p><p>Depth: " + feature.geometry.coordinates[2]);
      },
  
      // Style markers
      style: function (feature, layer) {
        return {
          radius: calculateRadius(feature.properties.mag),
          opacity: 1, // Increase the marker opacity
          fillOpacity: 0.8, // Increase the fill opacity
          color: getColor(feature.geometry.coordinates[2]), // Set the stroke color based on depth
          weight: 1.5 // Increase the stroke width
        };
      }
  
    }).addTo(myMap);
  
    // Create a legend control object for depth
    const depthLegend = L.control({ position: "bottomright" });
    depthLegend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [-10, 10, 30, 50, 70, 90];
      const colors = [
        "blue",
        "green",
        "yellow",
        "orange",
        "red",
        "darkred"
      ];
      div.innerHTML += "<h4>Depth Legend</h4>";
      // Loop through our intervals and generate a label with a colored square for each interval.
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    depthLegend.addTo(myMap);
  
  });
  
  

  