function barChart() {
    var that = {};
    const data = [10, 32,21,55,26];
    const svg = d3.select("#pieChart").append("svg").attr("height", 500).attr("width", 500);
    const group = svg.append("g")
                      .attr("transform", "translate(250, 250)")
    const pie = d3.layout.pie().value(d => (d));
    that.render = function() {
      const arc = d3.svg.arc()
                          .innerRadius(0)
                          .outerRadius(200)

      const arcs = group.selectAll(".arc")
                      .data(pie(data))
                      .enter()
                      .append("g")
                      .attr("class", "arc")

                      arcs.append("path")
                          .attr("d", arc)
      };

        return that;
}

var c=barChart();
c.render();
