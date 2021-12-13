function barChart() {
    var that = {};
    that.render = function() {
      //add your code here
      const svg =       d3.select("#chart")
        .append("svg")
          .attr("height", 500)
          .attr("width", 500)
          .style("background", "#f4f4f4");
      const data = d3.json("api/name.json", data => {
        		var tooltip = d3.select('body').append('div')
			.style('position', 'absolute')
			.style('background', '#f4f4f4')
			.style('padding', '5 15px')
			.style('border', '1px #333 solid')
			.style('border-radius', '5px')
			.style('opacity', '0')


            svg.selectAll("rect")
              .data(data)
              .enter().append("rect")
                      .attr("height", "200px")
                      .attr("width", "50px")
                      .attr("fill", "#00FF00")
                      .attr("y", 50)
                      .attr('x', function(d, i){
                        return 60*i;
                      })
                      .on('mouseover', function(d){
                        tooltip.transition()
                          .style('opacity', 1)

                        tooltip.html(d.name)
                          .style('left', (d3.event.pageX)+'px')
                          .style('top', (d3.event.pageY+'px'))
                        d3.select(this).style('opacity', 0.5)

                      })
                      .on('mouseout', function(d){
                        tooltip.transition()
                          .style('opacity', 0)
                        d3.select(this).style('opacity', 1)
                      })
           
        d3.select("#chart")
                      .append("svg")
      });

      };

        return that;
}

var c=barChart();
c.render();
