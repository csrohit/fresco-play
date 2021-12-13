function barChart() {
    var that = {};



    that.render = function() {
        // add your code here 
        var data = [22,34,65,12,39,28];

		var tooltip = d3.select('body').append('div')
			.style('position', 'absolute')
			.style('background', '#f4f4f4')
			.style('padding', '5 15px')
			.style('border', '1px #333 solid')
			.style('border-radius', '5px')
			.style('opacity', '0')

        d3.select("#chart")
          .append("svg")
            .attr("height", 500)
            .attr("width", 500)
            .style("background", "#f4f4f4")
            .selectAll("rect")
              .data(data)
              .enter().append("rect")
                      .attr("height", (d) => {
                        return d + "px";
                      })
                      .attr("width", "50px")
                      .attr("fill", "#00FF00")
                      .attr("y", 50)
                      .attr('x', function(d, i){
                        return 50*i;
                      })
                      
              .on('mouseover', function(d){
                tooltip.transition()
                  .style('opacity', 1)

                tooltip.html(d)
                  .style('left', (d3.event.pageX)+'px')
                  .style('top', (d3.event.pageY+'px'))
                d3.select(this).style('opacity', 0.5)

              })
              .on('mouseout', function(d){
                tooltip.transition()
                  .style('opacity', 0)
                d3.select(this).style('opacity', 1)
              })
      };

        return that;
}

var c=barChart();
c.render();
