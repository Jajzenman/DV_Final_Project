/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 60 },
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
          FB_MARITAL_pctNeverMarried15plusYears: d.S0502_C01_038E, 
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
          FB_Naturalized: d3.format("r")((d.S0502_C01_002E/100) * (d.S0502_C01_001E)), 
          FB_NotCitizen: d3.format("r")((d.S0502_C01_003E/100) * (d.S0502_C01_001E)), 
          WR_Europe: d3.format("r")((d.S0502_C01_005E/100) * (d.S0502_C01_004E)), 
          WR_Asia: d3.format("r")((d.S0502_C01_006E/100) * (d.S0502_C01_004E)), 
          WR_Africa: d3.format("r")((d.S0502_C01_007E/100) * (d.S0502_C01_004E)), 
          WR_Oceania: d3.format("r")((d.S0502_C01_008E/100) * (d.S0502_C01_004E)), 
          WR_SouthAmerica: d3.format("r")((d.S0502_C01_009E/100) * (d.S0502_C01_004E)), 
          WR_NorthAmerica: d3.format("r")((d.S0502_C01_010E/100) * (d.S0502_C01_004E)), 
          SEX_Male: d3.format("r")((d.S0502_C01_011E/100) * (d.S0502_C01_001E)), 
          SEX_Female: d3.format("r")((d.S0502_C01_012E/100) * (d.S0502_C01_001E)), 
          SEX_0_5_years: d3.format("r")((d.S0502_C01_013E/100) * (d.S0502_C01_001E)), 
          SEX_5_17_years: d3.format("r")((d.S0502_C01_014E/100) * (d.S0502_C01_001E)), 
          SEX_18_24_years: d3.format("r")((d.S0502_C01_015E/100) * (d.S0502_C01_001E)), 
          SEX_25_44_years: d3.format("r")((d.S0502_C01_016E/100) * (d.S0502_C01_001E)), 
          SEX_45_54_years: d3.format("r")((d.S0502_C01_017E/100) * (d.S0502_C01_001E)), 
          SEX_55_64_years: d3.format("r")((d.S0502_C01_018E/100) * (d.S0502_C01_001E)), 
          SEX_65_74_years: d3.format("r")((d.S0502_C01_019E/100) * (d.S0502_C01_001E)), 
          SEX_75_84_years: d3.format("r")((d.S0502_C01_020E/100) * (d.S0502_C01_001E)), 
          SEX_over_85_years: d3.format("r")((d.S0502_C01_021E/100) * (d.S0502_C01_001E)), 
          FB_RACE: d3.format("r")((d.S0502_C01_023E/100) * (d.S0502_C01_001E)), 
          FB_RACE_white: d3.format("r")((d.S0502_C01_024E/100) * (d.S0502_C01_001E)), 
          FB_RACE_black: d3.format("r")((d.S0502_C01_025E/100) * (d.S0502_C01_001E)), 
          FB_RACE_AmerIndian: d3.format("r")((d.S0502_C01_026E/100) * (d.S0502_C01_001E)), 
          FB_RACE_Asian: d3.format("r")((d.S0502_C01_027E/100) * (d.S0502_C01_001E)), 
          FB_RACE_Hawaiian: d3.format("r")((d.S0502_C01_028E/100) * (d.S0502_C01_001E)), 
          FB_RACE_OtherRace: d3.format("r")((d.S0502_C01_029E/100) * (d.S0502_C01_001E)), 
          FB_RACE_MixedRace: d3.format("r")((d.S0502_C01_030E/100) * (d.S0502_C01_001E)), 
          FB_RACE_Latino: d3.format("r")((d.S0502_C01_031E/100) * (d.S0502_C01_001E)), 
          FB_RACE_White_NonLatino: d3.format("r")((d.S0502_C01_032E/100) * (d.S0502_C01_001E)), 
          FB_HOUSEHOLD_Married: d3.format("r")((d.S0502_C01_033E/100) * (d.S0502_C01_001E)), 
          FB_HOUSEHOLD_Other: d3.format("r")((d.S0502_C01_034E/100) * (d.S0502_C01_001E)), 
          FB_MARITAL_NowMarried: d3.format("r")((d.S0502_C01_039E/100) * (d.S0502_C01_037E)), 
          FB_MARITAL_Divorced: d3.format("r")((d.S0502_C01_040E/100) * (d.S0502_C01_037E)), 
          FB_MARITAL_Widowed: d3.format("r")((d.S0502_C01_041E/100) * (d.S0502_C01_037E)), 
          FB_SCHOOL_Nursery: d3.format("r")((d.S0502_C01_043E/100) * (d.S0502_C01_042E)), 
          FB_SCHOOL_ElementarySchool: d3.format("r")((d.S0502_C01_043E/100) * (d.S0502_C01_042E)), 
          FB_SCHOOL_HighSchool: d3.format("r")((d.S0502_C01_044E/100) * (d.S0502_C01_042E)), 
          FB_SCHOOL_College: d3.format("r")((d.S0502_C01_045E/100) * (d.S0502_C01_042E)), 
          FB_ED_COMPLETED_LessThan_HS: d3.format("r")((d.S0502_C01_048E/100) * (d.S0502_C01_047E)), 
          FB_ED_COMPLETED_HighSchool: d3.format("r")((d.S0502_C01_049E/100) * (d.S0502_C01_047E)), 
          FB_ED_COMPLETED_SomeCollege: d3.format("r")((d.S0502_C01_050E/100) * (d.S0502_C01_047E)), 
          FB_ED_COMPLETED_Bachelor: d3.format("r")((d.S0502_C01_051E/100) * (d.S0502_C01_047E)), 
          FB_ED_COMPLETED_GradSchool: d3.format("r")((d.S0502_C01_052E/100) * (d.S0502_C01_047E)) 
        
        
          
         
        

          // FB_Naturalized: Math.round((d.FB_pctNaturalized) * (d.FB_Population))
         //
        }
      
      }).then(data => {
        console.log("loaded data:", data);
        state.data = data;
        myFirstState = state.data[0]
        firstStateNaturalized = myFirstState.FB_Naturalized
        console.log("Naturalized:", firstStateNaturalized)
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
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.FB_pctNaturalized))
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
  console.log('xAxis: ', xAxis)
  
  
  yAxis = d3.axisLeft(yScale)
    .ticks(8)
  console.log('yAxis: ', yAxis.domain())
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
    
    draw(); // re-draw the graph based on this new selection
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

  xAxisGroup.append("text")
    .attr("class", 'xLabel')
    .attr("transform", `translate(${width / 2}, ${35})`)
    .text("Naturalized")

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
  const filteredData = state.data
    .filter(d => d.NAME === state.selection)

  // + UPDATE SCALE(S), if needed
  xScale.domain([0, d3.max(filteredData, d => d.FB_pctNaturalized)])
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
    .x(d => xScale(d.FB_pctNaturalized))
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