/** Class implementing the infoPanel view. */
class InfoPanel {
    /**
     * Creates a infoPanel Object
     */
    constructor() {
    }

    /**
     * Update the info panel to show info about the currently selected world cup
     * @param oneWorldCup the currently selected world cup
     */
    updateInfo(oneWorldCup) {

	   var details = d3.select('body')
       .select('#details');
       
       var host= details.select("#host").text(oneWorldCup.host);
       var winner = details.select("#winner").text(oneWorldCup.winner);
       var silver= details.select("#silver").text(oneWorldCup.runner_up);
       
       var teams = details.select('#teams')
       .selectAll("span")
       .data(oneWorldCup.teams_names);

       teams.text(function(d){
      	return d;
    	})
    	.append('br');
    teams.enter()
         .append('span')
         .text(function(d){
      	       return d;
    	          })
    	.append('br');
    teams.exit().remove();   
       


    }

}