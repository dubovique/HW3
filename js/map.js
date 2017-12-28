/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    }

    /**
     * Function that clears the map
     */
    clearMap() {

        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes on and off here.
    	    var svg = d3.select("#svgMap");
        var map = svg.select("#map");
        var points = svg.select("#points");
    	    map.selectAll("path.countries").
         each(function(d,i)
         		{
         			d3.select(this).attr("class", "countries");
         			         			
         		}
         		)
         points.selectAll("circle").remove().exit();		
         

    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();
        var svg = d3.select("#svgMap"),
        width = +svg.attr("width"),
        height = +svg.attr("height") ;
        var map = svg.select("#map");
        var points = svg.select("#points");
        var teams = worldcupData.teams_iso
        var host_county = worldcupData.host_country_code;

        map.selectAll("path.countries").
        each(function(d,i)
        		{
        			if(teams.indexOf(d.id)!=-1)
        				{
        				if (d.id != host_county)
        					{
        					d3.select(this).classed("team",true);
        					}
        				else
        					{
        					d3.select(this).classed("host", true);
        					}
        				}
        				
        		}
        		)
        
        		
        	points
        	.append("circle")
        	.attr("cx",this.projection(worldcupData.win_pos)[0])
        	.attr("cy",this.projection(worldcupData.win_pos)[1])
        	.attr("r", "8px")
        	.attr("class", "gold")
        	
        	 points
        	.append("circle")
        	.attr("cx",this.projection(worldcupData.ru_pos)[0])
        	.attr("cy",this.projection(worldcupData.ru_pos)[1])
        	.attr("r", "8px")
        	.attr("class", "silver")
       	
        // ******* TODO: PART V *******

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.


        // Select the host country and change it's color accordingly.

        // Iterate through all participating teams and change their color as well.

        // We strongly suggest using CSS classes to style the selected countries.


        // Add a marker for gold/silver medalists
        
        
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******
    	    var graticule = d3.geoGraticule();
    	    var svg = d3.select("#svgMap"),
	    margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    	    
    	    var map = svg.select("#map").style("fill","white");
    	
        
		var projection = this.projection;
						  
						
    		var path = d3.geoPath().projection(projection);
    		var line  =map.append("path")
    		.datum(graticule())
    		.attr("class","grat")
    		.attr("d",path);
    		
		map.selectAll("path.countries")
		.data(topojson.feature(world, world.objects.countries).features)
		.enter().append("path")
		.attr("d",path)
		.attr("id", function(d, i) {
					return d.properties.id;
		})
		.classed("countries",true);
		
		 
		
		
		
		
		 
        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

    }


}
