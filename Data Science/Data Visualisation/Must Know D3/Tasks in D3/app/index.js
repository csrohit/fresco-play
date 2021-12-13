function d3update() {
  // add your code here

  d3.selectAll("li:nth-child(3n)")
    .classed("big", true)
    .style("color", "blue")
    .html("Hello World")
};

d3update();
