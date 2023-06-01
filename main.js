/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.9,
  margin = { top: 20, bottom: 125, left: 60, right: 60 },
  radius = 3;
  const color = d3.scaleOrdinal()
  .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"])
 
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
let FB_FieldList = [
  [1,'Population','d.FB_Population'],
  [2,'Naturalized','d.FB_pctNaturalized'],
  [3,'Not A Citizen', 'd.FB_pctNotCitizen'],
  [4,'Foreign Born','d.FB_WR_Population'],
  [5,'Male','d.FB_SEX_pctMale'],
  [6,'Female','d.FB_SEX_pctFemale'],
  [7,'Median age','d.FB_SEX_Median_age_years'],
  [8,'Household-Avg Family Size','d.FB_HOUSEHOLD_AvgFamilySize'],
  [9,'MARITAL-Married','d.FB_MARITAL_pctNow_married'],
  [10,'SCHOOL-In School','d.FB_SCHOOL_PopulationInSchool']
];
let StartingField ="Population";
let ChosenField = 1;
let filteredData = [];
let unFilteredData = [];
let clone;
console.log(FB_FieldList)
/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All States", // + YOUR FILTER SELECTION
  selectedStates: []
};
/* LOAD DATA */
// + SET YOUR DATA PATH

    /* LOAD DATA */
    d3.csv('data/Cleaned Data by State.csv', d=> {
        return {
          GEO_LOC_ID: d.GEO_ID,
          State: d.NAME,
          FB_Population: +d.S0502_C01_001E,
        // FB_Population: Number(d.S0502_C01_001E),
          FB_pctNaturalized: d.S0502_C01_002E,
          FB_pctNotCitizen: d.S0502_C01_003E,
          FB_WR_Population: d.S0502_C01_004E, 
          FB_WR_pctEurope: d.S0502_C01_005E, 
          FB_WR_pctAsia: d.S0502_C01_006E, 
          FB_WR_pctAfrica: d.S0502_C01_007E, 
          FB_WR_pctOceania: d.S0502_C01_008E, 
          FB_WR_pctSouthAmer: d.S0502_C01_009E, 
          FB_WR_pctNorthAmer: d.S0502_C01_010E, 
          FB_SEX_pctMale: d.S0502_C01_011E, 
          FB_SEX_pctFemale: d.S0502_C01_012E, 
          FB_SEX_pct0_5_years: d.S0502_C01_013E, 
          FB_SEX_pct5_to_17_years: d.S0502_C01_014E, 
          FB_SEX_pct18_to_24_years: d.S0502_C01_015E, 
          FB_SEX_pct25_to_44_years: d.S0502_C01_016E, 
          FB_SEX_pct45_to_54_years: d.S0502_C01_017E, 
          FB_SEX_pct55_to_64_years: d.S0502_C01_018E, 
          FB_SEX_pct65_to_74_years: d.S0502_C01_019E, 
          FB_SEX_pct75_to_84_years: d.S0502_C01_020E, 
          FB_SEX_pct85_over: d.S0502_C01_021E, 
          FB_SEX_Median_age_years: d.S0502_C01_022E, 
          FB_RACE_pct: d.S0502_C01_023E, 
          FB_RACE_pctWhite: d.S0502_C01_024E, 
          FB_RACE_pctBlack: d.S0502_C01_025E, 
          FB_RACE_pctAmerIndian: d.S0502_C01_026E, 
          FB_RACE_pctAsian: d.S0502_C01_027E, 
          FB_RACE_pctHawaiian: d.S0502_C01_028E, 
          FB_RACE_pctOtherRace: d.S0502_C01_029E, 
          FB_RACE_pctMixedRace: d.S0502_C01_030E, 
          FB_RACE_pctLatino: d.S0502_C01_031E, 
          FB_RACE_pctWhite_NotLatino: d.S0502_C01_032E, 
          FB_HOUSEHOLD_pctMarried: d.S0502_C01_033E, 
          FB_HOUSEHOLD_pctOther: d.S0502_C01_034E, 
          FB_HOUSEHOLD_Avg_Size: d.S0502_C01_035E, 
          FB_HOUSEHOLD_AvgFamilySize: d.S0502_C01_036E, 
          FB_MARITAL_Married15plusYears: d.S0502_C01_037E, 
          FB_MARITAL_pctNeverMarried: d.S0502_C01_038E, 
          FB_MARITAL_pctNow_married: d.S0502_C01_039E, 
          FB_MARITAL_pctDivorced: d.S0502_C01_040E, 
          FB_MARITAL_pctWidowed: d.S0502_C01_041E, 
          FB_SCHOOL_PopulationInSchool: d.S0502_C01_042E, 
          FB_SCHOOL_pctNursery: d.S0502_C01_043E, 
          FB_SCHOOL_pctElementarySchool: d.S0502_C01_044E, 
          FB_SCHOOL_pctHighSchool: d.S0502_C01_045E, 
          FB_SCHOOL_pctCollege: d.S0502_C01_046E, 
          FB_ED_COMPLETED_Population_25_yrPlus: d.S0502_C01_047E, 
          FB_ED_COMPLETED_pctLessThan_HS: d.S0502_C01_048E, 
          FB_ED_COMPLETED_pctHighSchool: d.S0502_C01_049E, 
          FB_ED_COMPLETED_pctSomeCollege: d.S0502_C01_050E, 
          FB_ED_COMPLETED_pctBachelor: d.S0502_C01_051E, 
          FB_ED_COMPLETED_pctGraduate: d.S0502_C01_052E,
          FB_Naturalized: d3.format("r")((d.FB_pctNaturalized) * (d.FB_Population))
        // FB_Naturalized: Math.round((d.FB_pctNaturalized) * (d.FB_Population))
   //

        }

      }).then(data => {
        state.data = data;
        myFirstState = state.data[0]
        firstStateNaturalized = myFirstState.FB_Naturalized
        typeof myFirstState.FB_Population


    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.State))
    .range([margin.right, width - margin.left])
  yScale = d3.scaleLinear()
    .domain([0,d3.max(filteredData, d => d.FB_Population)])
    .range([height - margin.bottom, margin.top])

  // + AXES
  xAxis = d3.axisBottom(xScale)
    .ticks(8) // limit the number of tick marks showing -- note: this is approximate

  yAxis = d3.axisLeft(yScale)
    .ticks(8)


// + UI ELEMENT SETUP FOR CHOOSING THE FIELD TO BE USED IN yAxis
const selectElement2 = d3.select("#dropdown2")

// add in dropdown options from the unique values in the data
selectElement2.selectAll("option")
  .data([
    // manually add the first value
    //"Property",
    //"",
    // add in all the unique values from the dataset
    ...new Set(FB_FieldList)])
  .enter()
  .append('option')
  .attr('value', (d) => d[2])
  .text((d) => d[1]);

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
selectElement2.on("change", event => {
    FB_FieldList.selection = event.target.value
});

  // + UI ELEMENT SETUP FOR STATE
  const selectElement = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  selectElement.selectAll("option")
    .data([
      // manually add the first value
      "All States",
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.State))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

  selectElement.on("change", event => {
    state.selectedStates = []
    let options = event.target.selectedOptions
    for(let i = 0; i < options.length; ++i) {
      let attr = options[i].getAttribute('attr')
      state.selectedStates.push(attr)
    }

   draw(); // re-draw the graph based on this new selection
  });

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  // xAxis has a type scaleBand which can't be updated
  // it needs to be re-drawn evey time in the draw() function
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.State))
    .range([margin.right, width - margin.left])

  xAxis = d3.axisBottom(xScale)
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
    
  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Population")


 draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  filteredData = state.data
  unFilteredData = state.data

  // create an if ondition that only filters data if state.selection <> 'All'
  if (!state.selectedStates.includes('All States') && 
      state.selectedStates.length>0) {
        filteredData = state.data.filter((d) => state.selectedStates.includes(d.State))
  } else {
    filteredData = state.data
  }

  // + UPDATE SCALE(S), if needed
 // xScale.domain(filteredData.map(d => d.State))

 // Redraw the x axis
 // If a previous xAxis exists it is removced
 // New xAxis is based on the xAxis class we had assigned to its svg Group


  // + UPDATE AXIS/AXES, if needed
  xScale.domain(filteredData.map(d => d.State))
  xAxisGroup
    .transition()
    .duration(1000)
    .call(xAxis.scale(xScale))

   // Rotate and style the state labels
  xAxisGroup.selectAll("text")
    .style("text-anchor","end")
    .style("fill", "blue")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")


  yScale.domain([0,d3.max(filteredData, d => d.FB_Population)])
 
 // + UPDATE AXIS/AXES, if needed

 // Update the yAxis, wih 1-second transition
 yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale))// need to udpate the scale


 const rect = svg
    .selectAll("rect.bar")
     //.data(state.data)
    .data(filteredData)
    .join("rect")
    .attr("class","bar")
    .attr("width", xScale.bandwidth())
    .attr("x", d=> xScale(d.State))
    .attr("y", d=> yScale(d.FB_Population))
    .attr("height",  d => height - margin.bottom - yScale(d.FB_Population))
    .attr("fill", function(d, i) {
        return color(i);
      } )
    .transition()
    .duration(1000)



    }
