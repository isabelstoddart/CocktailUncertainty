// Size ?
var width = 460
var height = 400

// The svg
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// Map and projection
var projection = d3.geoMercator()
    .center([-102, 24])                // GPS of location to zoom on
    .scale(790)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Create data for circles:
var markers = [
  {long: -106.4245, lat: 31.6904, name: "Juarez, MX", year: 1944, text: "Legend says the first margarita was served during the presale of tickets for the Jaurez Indians baseball game in 1944."}, // Juarez1
  {long: -106, lat: 32, name: "Juarez, MX", year: 1942, text: "Fransisco “Pancho” Morales invented the margarita while working at Tommy’s Bar in 1942. Story says a woman came into the bar asking for a magnolia. Morales forgot how to make it and gave the woman something he deemed close enough. When she said it didn't taste like a magnolia, Morales claimed he thought she said margarita and the margarita was born."}, // Juarez2
  {long: -94.7797, lat: 29.3013, name: "Galveston,TX", year: 1948, text: "Santos Cruz invented the margarita while he was bartending at The Balinese Room for the singer Peggy Lee in 1948. He made a sidecar with tequila instead of the traditional brandy and named it a Margarita after Peggy (short for Margaret)."}, // Galveston
  {long: -99.8237, lat: 16.8531, name: "Acapulco, MX", year: 1948, text: "Dallas socialite Margarita Sames claims she invented the margarita while vacationing in Acapulco in 1948."}, // Acapulco
  {long: -117.0382, lat: 32.5149, name: "Tijuana, MX", year: 1938, text: "Carlos “Danny” Herrera invented the margarita at his restaurant, Rancho La Gloria, in 1938. Legend says, Herrera made the cocktail for Marjorie King who was allergic to all hard alcohol other than tequila. He combined the ingredients of a traditional tequila shot to create the margarita."}, // Tijuana
];

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Filter data
    data.features = data.features.filter( function(d){return d.properties.name=="Mexico"} )

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#c6f460")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("stroke-width", "4px")
        //.style("opacity", .3)

    // create a tooltip
    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      // .style("background-color", "white")
      // .style("border", "solid")
      // .style("border-width", "2px")
      // .style("border-radius", "5px")
      // .style("padding", "5px")

    // Add circles:
    svg
      .selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 10)
        .attr("class", "circle")
        .style("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        //.attr("fill-opacity", .4)
        .on("mouseover", function(d) {
          Tooltip
            .style("opacity",1)
            .html(d.name + "<br><br>" + d.text)
            .style('transform', `translate(${d3.event.layerX-75}px, ${d3.event.layerY-400}px)`)
            // .style("left", (d3.event.PageX + 100) + 'px')
            // .style("top", (d3.event.PageY) + 'px')
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 3)
            .style("opacity",1)

      })
      .on("mouseout", function(d) {
          Tooltip
            .style("opacity",0)
          d3.select(this).style("stroke","black")
                        .style("stroke-width", 3);
      });

})