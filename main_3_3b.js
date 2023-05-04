/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 75, left: 60, right: 60 },
  radius = 3;

/*
this extrapolated function allows us to replace the "G" with "B" min the case of billions.
we cannot do this in the .tickFormat() because we need to pass a function as an argument,
and replace needs to act on the text (result of the function).
*/
const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')
const formatDate = d3.timeFormat("%Y")

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let xAxis;
let yAxis;
let xAxisGroup;
let yAxisGroup;
let myFirstState = [];
let firstStateNaturalized = 0;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH

    /* LOAD DATA */
    d3.csv('../data/Cleaned Data by State.csv', d=> {
        return {
          GEO_LOC_ID: d.GEO_ID,
          State: d.NAME,
          FB_Population: d.S0502_C01_001E, 
          FB_pctNaturalized: d.S0502_C01_002E, 
          FB_pctNotCitizen: d.S0502_C01_003E
        
          
         
        

          // FB_Naturalized: Math.round((d.FB_pctNaturalized) * (d.FB_Population))
         //
        }
      
      }).then(data => {
        console.log("loaded data:", data);
        state.data = data;
        myFirstState = state.data[0]
        firstStateNaturalized = myFirstState.FB_Naturalized
       /* console.log("Naturalized state:", state=> state.FB_Naturalized)
        console.log("Population:", d.FB_Population)
        console.log("Population state:", state.FB_Population)
*/
    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
    // console.log("Naturalized:", firstStateNaturalized)
    // // + SCALES
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.State))
    //.range([0,1])
    .range([margin.right, width - margin.left])
    console.log('xScale: ' ,xScale.domain())

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.FB_Population))
    .range([height - margin.bottom, margin.top])
    console.log('yScale: ' ,yScale.domain())
    //.range([0,20000000])
    // console.log("Pop:", d.FB_Population)

  // + AXES
  xAxis = d3.axisBottom(xScale)
    .ticks(8) // limit the number of tick marks showing -- note: this is approximate
 
  
  
  yAxis = d3.axisLeft(yScale)
    .ticks(8)

    //  console.log(yAxis.domain)
  //  .tickFormat(formatBillions)

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  selectElement.selectAll("option")
    .data([
      // manually add the first value
      "Select a state",
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.State))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
  selectElement.on("change", event => {
    state.selection = event.target.value
    console.log('state has been updated to: ', state)
    // console.log("Naturalized:", firstStateNaturalized)
    // console.log("Population:", state.FB_Population[0])
    
//    draw(); // re-draw the graph based on this new selection
  });

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
      .selectAll("text")
      .style("text-anchor","end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
  

  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Population")

 // draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => d.NAME === state.selection)

  // + UPDATE SCALE(S), if needed
  xScale.domain([0, d3.max(filteredData, d => d.State)])
  // + UPDATE AXIS/AXES, if needed
  xAxisGroup
    .transition()
    .duration(1000)
    .call(xAxis.scale(xScale))// need to udpate the scale

  yScale.domain([0, d3.max(filteredData, d => d.FB_Population)])
  // + UPDATE AXIS/AXES, if needed
  yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale))// need to udpate the scale

  // specify line generator function
  const lineGen = d3.line()
    .x(d => xScale(d.myFirstState))
    .y(d => yScale(d.FB_Population))

  // + DRAW LINE AND/OR AREA
  svg.selectAll(".line")
    .data([filteredData]) // data needs to take an []
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke", "black")
    .transition()
    .duration(1000)
    .attr("d", d => lineGen(d))
}
