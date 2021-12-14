function getTree() {
  var data = [{
    "name": "A",
    "children": [
      {
        "name": "B",
        "children": [
          {
            "name": "C"
          },
          {
            "name": "E"
          }
        ]
      },
      {
        "name": "P",
        "children": [
          {
            "name": "Q"
          },
          {
            "name": "R"
          }
        ]
      }
    ]
  }];
  const svg = d3.select("#tree")
                .append("svg")
                .attr("height", 500)
                .attr("width", 500);

  const tree = d3.layout.tree()
                        .size([400, 400]);

  const diagonal = d3.svg.diagonal();

  var that = {};
  that.render = function () {
    //add your code here
    const nodes = tree.nodes(data[0]);
    const links = tree.links(nodes);
    console.log(nodes)
    console.log(links);

    const node = svg.selectAll(".node")
                    .data(nodes)
                    .enter()
                    .append("g")
                    .attr("class", "node")
                    .attr("transform", d => {
                      console.log(d)
                      return `translate(${d.x}, ${d.y})`
                    })

    node.append("circle")
        .attr("r", 10)
        .attr("fill", "steelblue")

  };
  return that;
}

var c = getTree();
c.render();
