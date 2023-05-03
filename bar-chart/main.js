/* 2-1 quantities and amounts */


var ab2 = Math.round(17.2)

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = window.innerHeight * .8;
const margin = 50;
var yTextPadding = 20;
const red =    "#FF0000";
const yellow = "#FFFF00";
const green =  "#00FF00";
const blue =   "#0000FF";
const purple = "#A020F0";

/* LOAD DATA */


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
    FB_Naturalized: d3.format("r")((d.FB_pctNaturalized) * (d.FB_Population))
   // FB_Naturalized: Math.round((d.FB_pctNaturalized) * (d.FB_Population))
   //
  }

}).then(data => {

  console.log("data", data)

     // List of groups (here I have one group per column)
//     var allGroup = d3.map(data, d=>d.State)
var  allGroup="Select State"    
 allGroup = d3.map(data, d=>d.State)

 /*   FB_Naturalized = d3.map(data, d=>Math.round((d.FB_pctNaturalized) * (d.FB_Population))),
    FB_NotCitizen  = d3.map(data, d=>Math.round((d.FB_pctNotCitizen) * (d.FB_Population))),
    FB_WR_Europe      = d3.map(data, d=>Math.round((d.FB_WR_pctEurope) * (d.FB_WR_Population))),
    FB_WR_Asia        = d3.map(data, d=>Math.round((d.FB_WR_pctAsia) * (d.FB_WR_Population))),
    FB_WR_Africa      = d3.map(data, d=>Math.round((d.FB_WR_pctAfrica) * (d.FB_WR_Population))),
    FB_WR_Oceania     = d3.map(data, d=>Math.round((d.FB_WR_pctOceania) * (d.FB_WR_Population))),
    FB_WR_SouthAmer   = d3.map(data, d=>Math.round((d.FB_WR_pctSouthAmer) * (d.FB_WR_Population))),
    FB_WR_NorthAmer   = d3.map(data, d=>Math.round((d.FB_WR_pctNorthAmer) * (d.FB_WR_Population)))
 */     
  
 
console.log("allGroup",allGroup)
// add the options to the button
     d3.select("#selectButton")
       .selectAll('myOptions')
       .data(allGroup)
       .enter()
       .append('option')
       .text(d=> d.State ) // text showed in the menu
    //   .html(d=> d.State.textContent)
       .attr("value", d=> d.State) // corresponding value returned by the button
    //   .text(function (d) { return d.State; }) // text showed in the menu
     //  .attr("value", function (d) { return d; }) // corresponding value returned by the button
 
    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear()
    .domain([0,d3.max(data, d=> d.FB_WR_Population)])
    .range([margin,width - margin])
    //.text("Population")
    
    const yScale = d3.scaleBand()
      .domain([0,data.map(d=> d.FB_pctNaturalized)])
      .range([margin, height - margin]) //visual variable
      .paddingInner(.2) 
    //  .text("% Naturalized")
    
       console.log("count", data)
    
     //   console.log("d.FB_WR_Population", d.FB_WR_Population)

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // const color = d3.scale.ordinal().range(["red","yellow","green","blue","purple"])
    

  color = d3.scaleOrdinal()
  .range(["#FF0000","#FFFF00","#00FF00","#0000FF","#A020F0"])
   
    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    //svg
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // bars
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class","bar")
      .attr("x", margin)
      .attr("y", d=>yScale(d.FB_WR_Population))
      .attr("height", yScale.bandwidth()) 
      .attr("width", d=>xScale(d.FB_pctNaturalized*d.FB_WR_Population)-margin)
      .attr("fill", function(d, i) {
        return color(i);
      })
      .text(function(d,i) {
        return data[i].FB_WR_Population;
      });
    
    // append xAxis
    svg
      .append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px, ${height - margin}px)`)
      .call(xAxis)
  
 // append yAxis
 svg
 .append("g")
 .attr("class", "y-axis")
 .style("transform", `translate(${margin}px, 0px)`)
 .call(yAxis)
 
 svg
 .append("g")
 .attr("class", "#selectButton")
 //.style("transform", `translate(${margin}px, 0px)`)
 .attr("width", 150)
 .attr("height", 150)

     // Initialize bar with first group of the list
     //var line = svg
     .append('g')
     .append("rect")
       .datum(data.filter(function(d){return d.State==allGroup[0]}))
       //.attr("d", d3.line()
       //  .x(function(d) { return x(d.FB_WR_Population) })
       //  .y(function(d) { return y(d.FB_WR_pctEurope) })
       //.attr("stroke", function(d){ return myColor("valueA") })
       .style("stroke-width", 4)
       .style("fill", "none")

   // A function that update the chart
   function update(selectedGroup) {
          // Create new data with the selection?
          var dataFilter = data.filter(function(d){return d.State==selectedGroup})

          // Give these new data to update line
 /*         line
              .datum(dataFilter)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(+d.n) })
              )
              //.attr("stroke", function(d){ return myColor(selectedGroup) })
   */       }
    
    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      update(selectedOption)
  //    .html(selectedOption.textContent);
      
      console.log(selectedOption)

    })

  // ADD CHART TITLE
  svg
  .append("text")
  .attr("class", "title")
  .attr("x", width / 2)
  .attr("y", height / 20) //higher the denominator, higher the text moves up pg
  .attr("text-anchor", "middle")
  .text('Where Immigrants came from') 
  .attr("font-family", "Cursive")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .attr("fill", "blue")
      });
