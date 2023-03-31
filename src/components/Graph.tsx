import * as d3 from "d3";
import { useRef } from "react";

export function Graph() {
  const svgRef = useRef(null),
        width = 1200,
        height = 700;
  
  d3.csv("songs_with_value.csv", function(d) {
    return {
      source: d.source,
      target: d.target,
      value: Number(d.value)
    }
  }).then(function(data) {
  
    var links = data;
  
    // var nodes = {};
    const nodes: Record<string, any> = {}
  
    // compute the distinct nodes from the links.
    links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });
  
    var force = d3.forceSimulation()
        .nodes(d3.values(nodes))
        .force("link", d3.forceLink(links).distance(100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody().strength(-250))
        .alphaTarget(1)
        .on("tick", tick);
  
    // var svg = d3.select("#Target")
    //     .attr("width", width)
    //     .attr("height", height);

    const svg = d3.select(svgRef.current);
  
    // add the links
    var path = svg.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("class", function(d: any) { return "link " + d.type; })
        .style("stroke", function(d) {if (d.value < 1) {return 'grey';} else {return 'green';}})
        .style("stroke-width", function(d) {if (d.value < 1) {return '3px';}})
        .style("stroke-dasharray", function(d) {if (d.value > 0) {return '3 3';}});
  
    // define the nodes
    var call: any = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(call)
            .on("dblclick", drag_doubleclick); //d3.1
  
  
    // c2) The degree of each node should be represented by varying colors
    var min_degree=d3.min(force.nodes(), function(d: any) {return d.weight = path.filter(function(l: any) {return l.source.index == d.index || l.target.index == d.index}).size();});
    var max_degree=d3.max(force.nodes(), function(d: any) { return d.weight = path.filter(function(l: any) {return l.source.index == d.index || l.target.index == d.index}).size();});
    var rang: any = [d3.rgb("#fde0dd"),d3.rgb("#c51b8a")];
    var rang2: any = d3.interpolateHcl;
    var colors = d3.scaleLinear()
        .domain([min_degree,max_degree])
        .range(rang)
        .interpolate(rang2);
  
    // add the nodes
    var fill: any = d3.rgb("#bfd3e6");
    node.append("circle")
        .attr("id", function(d: any){return (d.name.replace(/\s+/g,'').toLowerCase());})
        .attr("r", function(d: any) { d.weight = path.filter(function(l: any) {return l.source.index == d.index || l.target.index == d.index}).size(); var minRadius =3;
       return minRadius + (d.weight * 2);}) //c1) 
      .style("fill", function(d) { return colors(d.index); })
      .on("dblclick", function(d) {
        d3.select(this).style("fill", fill);}); //d3.2
  
  
    //a) Adding node labels:  Modify  submission.html  to show  the  node label  (the node name, e.g., the source)  at the  top  right  of each node in  bold. If  a node is  dragged, its  label  must move with it. 
    node.append("text")
    .attr("x", function(d) { return (d.index) +7; })
    .attr("y", "0.35em")
    .text(function(d: any){return (d.name)});   
  
  
    // add the curvy lines
    function tick() {
        path.attr("d", function(d: any) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        });
  
        node.attr("transform", function(d) {
            return "translate(" + validate_width(d.x)  + "," + validate_height(d.y) + ")"; 
        });
    };
  
    function dragstarted(d: any) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = validate_width(d.x);
        d.fy = validate_height(d.y);
    };
  
    function dragged(d: any) {
        d.fx = validate_width(d3.event.x);
        d.fy = validate_height(d3.event.y);
    };
  
    function dragended(d: any) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fixed=true;
        if (d.fixed == true) {
            d.fx = validate_width(d.x);
            d.fy = validate_height(d.y);
        }
        else {
            d.fx = null;
            d.fy = null;
        }
        // @ts-ignore
        d3.select(this).select("circle").style("fill", "grey");
    };
  
    function drag_doubleclick(d: any) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fixed=false;
        if (d.fixed == true) {
            d.fx = validate_width(d.x);
            d.fy = validate_height(d.y);
        }
        else {
            d.fx = null;
            d.fy = null;
        }
        };

    function validate_height(x: any) {
      if (x < 0) x = 0 + 10;
      if (x > height) x = height - 10;
      return x;
    }

    function validate_width(x: any) {
      if (x < 0) x = 0 + 10;
      if (x > width) x = width - 10;
      return x;
    }
    
  }).catch(function(error) {
    console.log(error);
  });
  return (
    <svg ref={svgRef} width={width} height={height} className="border-solid border-2 border-sky-500"/>
  );
}