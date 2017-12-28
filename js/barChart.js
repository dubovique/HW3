/** Class implementing the bar chart view. */
class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {
   

	  	 var svg = d3.select("#barChart"),
	  	 margin = {top: 0, right: 0, bottom: 0, left: 0},
         width = +svg.attr("width") - margin.left - margin.right,
         height = +svg.attr("height") - margin.top - margin.bottom,
         padding = 60;
         var prev_selection = -1
         var infoPanel = this.infoPanel
         var worldMap = this.worldMap
         
       
        // define the y scale  (vertical)
        var yScale = d3.scaleLinear()
	        .domain([0, d3.max(this.allData, function(d) { return d[selectedDimension]; })])    
		.range([height - padding,0]);   // map these to the chart height, less padding.  
                 //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.
		    
        // define the x scale (horizontal)
        var mindate = d3.min(this.allData,function(d) { return d.year; }),
            maxdate = d3.max(this.allData,function(d) { return d.year; });
        var xDomain = this.allData.map(function(d) { return d.year; }).sort() ;
        
        
       var colorScale = d3.scaleSequential(d3.interpolateBlues)
       	   .domain([0, d3.max(this.allData, function(d) { return d[selectedDimension]; })]);
        
        
       var xScale = d3.scaleBand()
       .domain(xDomain)
       .range([padding, width])
       .paddingInner(0.1);
   
	
        // define the y axis
        var yAxis = d3.axisLeft()
            .scale(yScale);
        
        // define the x axis
        var xAxis = d3.axisBottom()
            .scale(xScale);
		
	
	   svg.select("#xAxis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(15," + (25) + "), rotate(90)");

  	   svg.select("#yAxis")
  	  .attr("transform", "translate("+padding+",0)")
  	  .transition().duration(500)
      .call(yAxis);
  
      
      
       var vis = d3.select("#bars")
       var my_bar  = vis.selectAll("rect").data(this.allData);
       my_bar.exit().remove();             
       my_bar.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("width", xScale.bandwidth())
      .attr("x", function(d) { return xScale(d.year); })
      .merge(my_bar)
      .on("click", function(d,i){ d3.select(this).style("fill", "red");
       							  infoPanel.updateInfo(d); 
       							  worldMap.updateMap(d);	 
                                  if (prev_selection != -1) 
                                  { 
                                  	d3.selectAll("rect").each(function(d1,j) 
                                  	{
                                    	if (j === prev_selection)
                                    	{
                                    		d3.select(this).style("fill",colorScale(d1[selectedDimension]));
                                    	}
                                  	});
                                   console.log(i)
                                  }
                                  prev_selection=i;
                                 })	
      .transition()
      .duration(500)
      .attr("y", function(d) { return yScale(d[selectedDimension]); })
      .attr("height", function(d) { return height - padding - yScale(d[selectedDimension]); })
      .style("fill", function(d) { return colorScale(d[selectedDimension]); });
      

    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    chooseData() {

        var currentPlot = d3.select("#dataset").property("value");
        this.updateBarChart(currentPlot);
        

    }
   

}