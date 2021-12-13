function d3update() {
// add your code here
const numArray = [10,20,30,40,50];

  d3.selectAll(".list_items li")
    .data(numArray)
    .style('font-size', d => {
      return d + 'px';
    })

};
d3update();
