/* 2-2 distributions */

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 70, left: 60, right: 40 },
  
  radius = 4;

/* LOAD DATA */
d3.csv("../data/organizations-100.csv", d=> {
  return {
    year: new Date(+d.Founded, 0, 1),
    employees: d.Number_of_employees,
    IndustryCode: d.Industry_Code,
    SectorCnt: d.CntSector,
    Sector: d.Ind_Desc
  }

}).then(data => {
  console.log(data)
 
  var GroupedBy = d3.rollup(data, v => v.length, d => d.Sector)
  console.log([GroupedBy])

  /* SCALES */
  // xscale  - linear,count
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right])

    // yscale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.employees)])
    .range([height - margin.bottom, margin.top])

  const colorScale = d3.scaleOrdinal()
  .domain(["C", "F", "G", "I", "M", "N", "S"])
  .range(["gold", "blue", "green", "yellow", "red", "purple", "orange"])
  
  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // axis scales
  const xAxis = d3.axisBottom(xScale)
   // .tickFormat(d3.timeFormat("%Y"))

  svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);
  
  const sizeScale = d3.scaleSqrt()
    .domain([1,  d3.max(data, d => d.SectorCnt)])
    .range([1.75, 4])
console.log(sizeScale)

  // circles
  const dot = svg
    .selectAll("circle")
    .data(data, d => d.BioID) // second argument is the unique key for that row
    .join("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.employees))
    //.attr("r", d => (d.SectorCnt/5))
    .attr("r", d => sizeScale(d.SectorCnt))
    .attr("fill", d => colorScale(d.IndustryCode))
  console.log(data)
// Subtitle for top of chart
    svg
  .append("text")
  .attr("class", "title")
  .attr("x", width / 2)
  .attr("y", height / 50) //higher the denominator, higher the text moves up pg
  .attr("text-anchor", "middle")
  .text('100 Companies by the year they were founded and the number of employees') 
  .attr("font-family", "Cursive")
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("fill", "blue")
 
    
 
  const colorLegend = (selection, props) => {
    const {
      colorScaleLegend,
      circleRadius,
      spacing,
      textOffset
    } = props;

    const groups = selection.selectAll('g')
      .data(colorScaleLegend.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(${i * spacing},0)`
        );
    groups.exit().remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScaleLegend);

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  };

  const sizeLegend = (selection, props) => {
    const {
      sizeScaleLegend,
      spacing,
      textOffset,
      numTicks,
      circleFill
    } = props;
    
    const ticks = sizeScale.ticks(numTicks)
      .filter(d => d !== 0)
      .reverse();

    const groups = selection.selectAll('g').data(ticks);
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(${i * spacing},0)`
        );
    groups.exit().remove();
    
    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', sizeScaleLegend)
        .attr('fill', circleFill);
    
    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', d => sizeScale(d) + textOffset);
    
  };

 
  const colorScaleLegend = d3.scaleOrdinal()
    .domain(["Consumer", "Finance", "Govt.", "Industry", "Media", "NonProfit", "Services"])
    .range(["gold", "blue", "green", "yellow", "red", "purple", "orange"])
  
    svg.append('g')
        // puts legend under x-axis, near bottom of container
      .attr('transform', `translate(100,570)`) 
  /*  .attr("width", width)
      .attr("height", 0)
  */   .call(colorLegend, {
        colorScaleLegend,
   //     circleRadius: function(d) {return sizeScale(d);},
        circleRadius: 8,
        spacing: 100,
        textOffset: 10
      });



/*
  svg.append('g')
    
      .call(sizeLegend, {
        sizeScale,
        spacing: 80,
        textOffset: 10,
        numTicks: 5,
        circleFill: 'rgba(0, 0, 0, 0.5)'
          }
       
    ; */


});

