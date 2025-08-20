// 
// vectors.js
// Code for Generating sample test case
// Tanner Finken <finken@arizona.edu>
//
// This file provides the code for 
//



////////////////////////////////////////////////////////////////////////
// Global variables for the dataset 

vector1 = [-1.5,-1.5]
vector2 = [1,1]
topLocation = [0, 1]
bottomLocation = [0, -1]
topVector = [1,0]
bottomVector = [1, 0]



////////////////////////////////////////////////////////////////////////
// Global variables for the svg

let width = 1000;
let height = 1000;
let padding = 50;

let svg = d3.select("#mainplot")
  .append("svg")
  .attr("width", width).attr("height", height);


////////////////////////////////////////////////////////////////////////
// Initialize the x and y scales.  
//  - xScale stores a mapping from scalar value to x-position on svg
//  - yScale stores a mapping from scalar value to y-position on svg

let xScale = d3.scaleLinear()
  .domain([-4,4])
  .range([padding, width-padding]);

let yScale = d3.scaleLinear()
  .domain([-4,4])
  .range([height-padding, padding]);

let colorLineScale = d3.scaleDiverging([-1, 0, 1], ["red","white","blue"]);

//Scale for magnitude size in pixels, would need to adjust if changed x or y scale
let magScale = d3.scaleLinear()
  .domain([0,4])
  .range([0, width/2]);

//INitialize components of the svg

svg.append("circle")
  .attr("cx", xScale(-1))
  .attr("cy", yScale(0))
  .attr("r", 12)
  .attr("fill", "blue");

svg.append("circle")
  .attr("cx", xScale(1))
  .attr("cy", yScale(0))
  .attr("r", 12)
  .attr("fill", "red");

let centerLine = svg.append("line")
  .attr("x1",xScale(-1))
  .attr("y1",yScale(0))
  .attr("x2", xScale(1))
  .attr("y2", yScale(0))
  .attr("stroke", "red")
  .attr("style", "stroke-width:10px;");

let centerText = svg.append("text")
  .attr("transform",`translate(${xScale(0)},${yScale(-0.2)})`)
  .text("0.00");



svg.append("line")
  .attr("x1",xScale(0))
  .attr("y1",yScale(-4))
  .attr("x2",xScale(0))
  .attr("y2",yScale(4))
  .attr("stroke-dasharray","10")
  .attr("stroke", "grey")
  .attr("style", "stroke-width:2px;");

function dragStart(d) {
  d3.select(this).attr("stroke", "green");
}

function dragEnd(d) {
  d3.select(this).attr("stroke", null);
}
function dragged(d) {
  // console.log(d);
  d3.select(this).attr("cx",d.x).attr("cy",d.y);
  updateVectors();
  clearVectors();
  drawVectors();
}

function draggedAdjacent(d) {
  // console.log(d.sourceEvent.target.id);
  // d3.select(this).attr("cx", d.x).attr("cy", d.y);
  if(d.sourceEvent.target.id=="topCircle" && d.y < yScale(0))
    d3.select(this).attr("cx", d.x).attr("cy", d.y);
  else if(d.sourceEvent.target.id=="bottomCircle" && d.y > yScale(0))
    d3.select(this).attr("cx", d.x).attr("cy", d.y);
  updateAdjacent();
  drawAdjacent();
}

svg.append("circle")
  .attr("cx", xScale(topLocation[0]))
  .attr("cy", yScale(topLocation[1]))
  .attr("r", 15)
  .attr("style", "stroke-width:6px;")
  .attr("id","topCircle")
  .call(d3.drag().on("drag", draggedAdjacent).on("start", dragStart).on("end",dragEnd));

  svg.append("circle")
  .attr("cx", xScale(bottomLocation[0]))
  .attr("cy", yScale(bottomLocation[1]))
  .attr("r", 15)
  .attr("style", "stroke-width:6px;")
  .attr("id","bottomCircle")
  .call(d3.drag().on("drag", draggedAdjacent).on("start", dragStart).on("end",dragEnd));

let leftVectorCircle = svg.append("circle")
  .attr("cx", xScale(-1+vector1[0]))
  .attr("cy", yScale(vector1[1]))
  .attr("r", 20)
  .attr("style", "stroke-width:6px;")
  .attr("id","leftVector")
  .call(d3.drag().on("drag", dragged).on("start", dragStart).on("end",dragEnd));

let rightVectorCircle = svg.append("circle")
  .attr("cx", xScale(1+vector2[0]))
  .attr("cy", yScale(vector2[1]))
  .attr("r", 20)
  .attr("style", "stroke-width:6px;")
  .attr("id","rightVector")
  .call(d3.drag().on("drag", dragged).on("start", dragStart).on("end",dragEnd));

let topVectorCircle = svg.append("circle")
  .attr("cx", xScale(0+topVector[0]))
  .attr("cy", yScale(1+topVector[1]))
  .attr("r", 15)
  .attr("style", "stroke-width:6px;")
  .attr("id","topVector")
  .call(d3.drag().on("drag", dragged).on("start", dragStart).on("end",dragEnd));

let bottomVectorCircle = svg.append("circle")
  .attr("cx", xScale(0+bottomVector[0]))
  .attr("cy", yScale(-1+bottomVector[1]))
  .attr("r", 15)
  .attr("style", "stroke-width:6px;")
  .attr("id","bottomVector")
  .call(d3.drag().on("drag", dragged).on("start", dragStart).on("end",dragEnd));

function updateVectors() {
  left = d3.select("#leftVector")
  vector1[0] = xScale.invert(left.attr("cx"))+1
  vector1[1] = yScale.invert(left.attr("cy"))
  right = d3.select("#rightVector")
  vector2[0] = xScale.invert(right.attr("cx"))-1
  vector2[1] = yScale.invert(right.attr("cy"))
  topVec = d3.select("#topVector")
  topVector[0] = xScale.invert(topVec.attr("cx"))-topLocation[0]
  topVector[1] = yScale.invert(topVec.attr("cy"))-topLocation[1]
  bottomVec = d3.select("#bottomVector")
  bottomVector[0] = xScale.invert(bottomVec.attr("cx"))-bottomLocation[0]
  bottomVector[1] = yScale.invert(bottomVec.attr("cy"))-bottomLocation[1]
}

function clearVectors() {
  d3.select("#leftArrow").remove()
  d3.select("#middleArrow").remove()
  d3.select("#rightArrow").remove()
  d3.select("#topArrow").remove()
  d3.select("#bottomArrow").remove()
}

function updateAdjacent() {
  topCircle = d3.select("#topCircle");
  topLocation[0] = xScale.invert(topCircle.attr("cx"));
  topLocation[1] = yScale.invert(topCircle.attr("cy"));
  bottomCircle = d3.select("#bottomCircle");
  bottomLocation[0] = xScale.invert(bottomCircle.attr("cx"));
  bottomLocation[1] = yScale.invert(bottomCircle.attr("cy"));
}

function drawAdjacent() {
  d3.select("#topLeftLine").remove();
  d3.select("#topRightLine").remove();
  svg.append("line")
    .attr("x1", xScale(-1))
    .attr("y1", yScale(0))
    .attr("x2", xScale(topLocation[0]))
    .attr("y2", yScale(topLocation[1]))
    .attr("stroke", "black")
    .attr("id", "topLeftLine")
    .attr("style", "stroke-width:8px;");
  svg.append("line")
  .attr("x1", xScale(1))
  .attr("y1", yScale(0))
  .attr("x2", xScale(topLocation[0]))
  .attr("y2", yScale(topLocation[1]))
  .attr("stroke", "black")
  .attr("id", "topRightLine")
  .attr("style", "stroke-width:8px;");
  d3.select("#bottomLeftLine").remove();
  d3.select("#bottomRightLine").remove();
  svg.append("line")
    .attr("x1", xScale(-1))
    .attr("y1", yScale(0))
    .attr("x2", xScale(bottomLocation[0]))
    .attr("y2", yScale(bottomLocation[1]))
    .attr("stroke", "black")
    .attr("id", "bottomLeftLine")
    .attr("style", "stroke-width:8px;");
  svg.append("line")
  .attr("x1", xScale(1))
  .attr("y1", yScale(0))
  .attr("x2", xScale(bottomLocation[0]))
  .attr("y2", yScale(bottomLocation[1]))
  .attr("stroke", "black")
  .attr("id", "bottomRightLine")
  .attr("style", "stroke-width:8px;");
}

function drawVectors() {
  x1 = vector1[0]
  y1 = vector1[1]
  let vec1Mag = Math.sqrt(x1 * x1 + y1 * y1);
  let lineMag = magScale(vec1Mag);
  let lineColor = "blue";
  let lineAngle;
  if(x1!=0) {
    if(x1>0) {
      lineAngle = Math.atan(y1/x1) / Math.PI * 180;
    } else {
      lineAngle = 180 + (Math.atan(y1/x1) / Math.PI * 180);
    }
  } else {
    if(y1>0) {
      lineAngle = 90;
    } else {
      lineAngle = 270;
    }
  }
  //Generate the arrow glyph based on vector magnitude
  let arrowGroup = svg.append("g").attr("id","leftArrow");
  arrowGroup.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", lineMag)
            .attr("y2", 0)
            .attr("stroke", lineColor);
  arrowGroup.append("line")
            .attr("x1",lineMag)
            .attr("y1",0)
            .attr("x2", lineMag/1.5)
            .attr("y2", +lineMag/5)
            .attr("stroke", lineColor);
  arrowGroup.append("line")
            .attr("x1",lineMag)
            .attr("y1",0)
            .attr("x2", lineMag/1.5)
            .attr("y2", -lineMag/5)
            .attr("stroke", lineColor);
  // Then translate and rotate the arrow to the correct position and direction
  arrowGroup.attr("transform",`translate(${xScale(-1)},${yScale(0)}) rotate(${-lineAngle})`);

  //Draw the second and then middle vectors
  x2 = vector2[0]
  y2 = vector2[1]
  let vec2Mag = Math.sqrt(x2 * x2 + y2 * y2);
  let line2Mag = magScale(vec2Mag);
  let line2Color = "red";
  let line2Angle;
  if(x2!=0) {
    if(x2>0) {
      line2Angle = Math.atan(y2/x2) / Math.PI * 180;
    } else {
      line2Angle = 180 + (Math.atan(y2/x2) / Math.PI * 180);
    }
  } else {
    if(y2>0) {
      line2Angle = 90;
    } else {
      line2Angle = 270;
    }
  }
  //Generate the arrow glyph based on vector magnitude
  let arrowGroup2 = svg.append("g").attr("id","rightArrow");
  arrowGroup2.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", line2Mag)
            .attr("y2", 0)
            .attr("stroke", line2Color);
  arrowGroup2.append("line")
            .attr("x1",line2Mag)
            .attr("y1",0)
            .attr("x2", line2Mag/1.5)
            .attr("y2", +line2Mag/5)
            .attr("stroke", line2Color);
  arrowGroup2.append("line")
            .attr("x1",line2Mag)
            .attr("y1",0)
            .attr("x2", line2Mag/1.5)
            .attr("y2", -line2Mag/5)
            .attr("stroke", line2Color);
  // Then translate and rotate the arrow to the correct position and direction
  arrowGroup2.attr("transform",`translate(${xScale(1)},${yScale(0)}) rotate(${-line2Angle})`);

  //Draw the second and then middle vectors
  x3 = (x1 + x2) / 2
  y3 = (y1 + y2) / 2
  // Check dot product (1,0) * (x3,y3)
  centerText.text(x3);
  centerLine.attr("stroke",colorLineScale(x3));
  // if(x3>=0) {
  //   centerLine.attr("stroke", "blue");
  // } else {
  //   centerLine.attr("stroke", "red");
  // }
  let vec3Mag = Math.sqrt(x3 * x3 + y3 * y3);
  let line3Mag = magScale(vec3Mag);
  let line3Color = "purple";
  let line3Angle;
  if(x3!=0) {
    if(x3>0) {
      line3Angle = Math.atan(y3/x3) / Math.PI * 180;
    } else {
      line3Angle = 180 + (Math.atan(y3/x3) / Math.PI * 180);
    }
  } else {
    if(y3>0) {
      line3Angle = 90;
    } else {
      line3Angle = 270;
    }
  }
  //Generate the arrow glyph based on vector magnitude
  let arrowGroup3 = svg.append("g").attr("id","middleArrow");
  arrowGroup3.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", line3Mag)
            .attr("y2", 0)
            .attr("stroke", line3Color);
  arrowGroup3.append("line")
            .attr("x1",line3Mag)
            .attr("y1",0)
            .attr("x2", line3Mag/1.5)
            .attr("y2", +line3Mag/5)
            .attr("stroke", line3Color);
  arrowGroup3.append("line")
            .attr("x1",line3Mag)
            .attr("y1",0)
            .attr("x2", line3Mag/1.5)
            .attr("y2", -line3Mag/5)
            .attr("stroke", line3Color);
  // Then translate and rotate the arrow to the correct position and direction
  arrowGroup3.attr("transform",`translate(${xScale(0)},${yScale(0)}) rotate(${-line3Angle})`);

  x4 = topVector[0]
  y4 = topVector[1]
  let vec4Mag = Math.sqrt(x4 * x4 + y4 * y4);
  let lineMag4 = magScale(vec4Mag);
  let lineColor4 = "rgb(139, 128, 0)"; //A dark yellow color
  let lineAngle4;
  if(x4!=0) {
    if(x4>0) {
      lineAngle4 = Math.atan(y4/x4) / Math.PI * 180;
    } else {
      lineAngle4 = 180 + (Math.atan(y4/x4) / Math.PI * 180);
    }
  } else {
    if(y4>0) {
      lineAngle4 = 90;
    } else {
      lineAngle4 = 270;
    }
  }
  //Generate the arrow glyph based on vector magnitude
  let arrowGroup4 = svg.append("g").attr("id","topArrow");
  arrowGroup4.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", lineMag4)
            .attr("y2", 0)
            .attr("stroke", lineColor4);
  arrowGroup4.append("line")
            .attr("x1",lineMag4)
            .attr("y1",0)
            .attr("x2", lineMag4/1.5)
            .attr("y2", +lineMag4/5)
            .attr("stroke", lineColor4);
  arrowGroup4.append("line")
            .attr("x1",lineMag4)
            .attr("y1",0)
            .attr("x2", lineMag4/1.5)
            .attr("y2", -lineMag4/5)
            .attr("stroke", lineColor4);
  // Then translate and rotate the arrow to the correct position and direction
  arrowGroup4.attr("transform",`translate(${xScale(topLocation[0])},${yScale(topLocation[1])}) rotate(${-lineAngle4})`);

  //Adjust for top left line
  topLeftX = (x1 + x4) / 2;
  topLeftY = (y1 + y4) / 2;
  //Dot with (x,y) with edge (top-(-1), top-0)
  topLeftResult = topLeftX * (topLocation[0]+1) + topLeftY * (topLocation[1]);
  d3.select("#topLeftLine").attr("stroke", colorLineScale(topLeftResult));
  topRightX = (x4+x2) / 2;
  topRightY = (y4+y2) / 2;
  //Dot with (x,y) with edge{left-to-right} (1-top, 0-top)
  topRightResult = topRightX * (1-topLocation[0]) + topRightY * (0-topLocation[1]);
  d3.select("#topRightLine").attr("stroke", colorLineScale(topRightResult));
  //Draw the second and then middle vectors
  x5 = bottomVector[0]
  y5 = bottomVector[1]
  let vec5Mag = Math.sqrt(x5 * x5 + y5 * y5);
  let lineMag5 = magScale(vec5Mag);
  let lineColor5 = "green";
  let lineAngle5;
  if(x5!=0) {
    if(x5>0) {
      lineAngle5 = Math.atan(y5/x5) / Math.PI * 180;
    } else {
      lineAngle5 = 180 + (Math.atan(y5/x5) / Math.PI * 180);
    }
  } else {
    if(y5>0) {
      lineAngle5 = 90;
    } else {
      lineAngle5 = 270;
    }
  }
  //Generate the arrow glyph based on vector magnitude
  let arrowGroup5 = svg.append("g").attr("id","bottomArrow");
  arrowGroup5.append("line")
            .attr("x1",0)
            .attr("y1",0)
            .attr("x2", lineMag5)
            .attr("y2", 0)
            .attr("stroke", lineColor5);
  arrowGroup5.append("line")
            .attr("x1",lineMag5)
            .attr("y1",0)
            .attr("x2", lineMag5/1.5)
            .attr("y2", +lineMag5/5)
            .attr("stroke", lineColor5);
  arrowGroup5.append("line")
            .attr("x1",lineMag5)
            .attr("y1",0)
            .attr("x2", lineMag5/1.5)
            .attr("y2", -lineMag5/5)
            .attr("stroke", lineColor5);
  // Then translate and rotate the arrow to the correct position and direction
  arrowGroup5.attr("transform",`translate(${xScale(bottomLocation[0])},${yScale(bottomLocation[1])}) rotate(${-lineAngle5})`);

  //Adjust for bottom left line
  bottomLeftX = (x1 + x5) / 2;
  bottomLeftY = (y1 + y5) / 2;
  //Dot with (x,y) with edge (bottom-(-1), bottom-0)
  bottomLeftResult = bottomLeftX * (bottomLocation[0]+1) + bottomLeftY * (bottomLocation[1]);
  d3.select("#bottomLeftLine").attr("stroke", colorLineScale(bottomLeftResult));
  bottomRightX = (x5+x2) / 2;
  bottomRightY = (y5+y2) / 2;
  //Dot with (x,y) with edge{left-to-right} (1-bottom, 0-botom)
  bottomRightResult = bottomRightX * (1-bottomLocation[0]) + bottomRightY * (0-bottomLocation[1]);
  d3.select("#bottomRightLine").attr("stroke", colorLineScale(bottomRightResult));

}
drawVectors();
drawAdjacent();

//Make dragging feature
// drag = {

//   function dragstarted(d) {
//     d3.select(this).raise().attr("stroke", "black");
//   }

//   function dragged(event, d) {
//     d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
//   }

//   function dragended(event, d) {
//     d3.select(this).attr("stroke", null);
//   }

//   return d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
// }

////////////////////////////////////////////////////////////////////////
// Make the plot
//Code pulled from https://d3-graph-gallery.com/graph/parallel_custom.html to help generate path lines
// The path function take a row of the data as input, and return x and y coordinates of the line to draw for this row.
// Passing over each dimension to map the points of the line
// Param: d - datapoint that needs to be translated to a line
// Returns: Poly line values mapped based on the data values and scales.
// function path(d) {
//   return d3.line()(dims.map(function(p) { return [xScale(p), yScales[p](d[p])]; }));
// }

// // add the actual polylines for data elements, each with class "datapath"
// svg.append("g")
//   .selectAll(".datapath")
//   .data(data)
//   .enter()
//   .append("path")
//   .attr("class", "datapath")
//   .attr("d", path)
//   .style("fill","none")
//   .style("stroke", function(d) { return colorScales[colorDim](d[colorDim])})
//   .style("opacity", 0.75);


// // add the axis groups, each with class "axis"
// svg.selectAll(".axis")
//   .data(dims)
//   .enter()
//   .append("g")
//   .attr("class", "axis")
//   .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })
//   .each(function(d) { d3.select(this).call(axes[d]); });


// // add the axes labels, each with class "label"
// svg.selectAll(".label")
//   .data(dims)
//   .enter()
//   .append("g")
//   .attr("class", "label")
//   .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })
//   .attr("font-weight", function(d) { if(d==colorDim) return "bold"; else return "normal"; })
//   .append("text")
//       .style("text-anchor", "middle")
//       .attr("y", padding/2)
//       .text(function(d) { return d; })
//       .style("fill", "black")
//       .on("click", onClick)
//       .on("mouseover", onMouseOver);


// // add the brush groups, each with class ".brush" 
//   svg.selectAll(".brush")
//     .data(dims)
//     .enter()
//     .append("g")
//     .attr("class", "brush")
//     .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })
//     .each(function(d) { d3.select(this).call(brushes[d]); });




// ////////////////////////////////////////////////////////////////////////
// // Interaction Callbacks

// // Callback for swaping axes when a text label is clicked.
// // Params: event - the event object that caused the function call
// //         dim   - which dimension was clicked (as a string)
// function onClick(event, dim) {
//   //Function to change/ swap to the right unless rightmost, then left swap with animation
//   let dimIndex = dims.indexOf(dim);
//   let swapIndex = (dimIndex +1 >= dims.length) ? dimIndex -1 : dimIndex + 1;
//   let currentDim = dims[dimIndex];
//   let swapDim    = dims[swapIndex];
//   dims[swapIndex] = currentDim;
//   dims[dimIndex]  = swapDim;
//   //Then update the visual with 1 sec animations
//   xScale.domain(dims);
//   svg.selectAll(".axis")
//     .transition()
//     .duration(1000)
//     .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })

//   svg.selectAll(".label")
//     .transition("moveLabel")
//     .duration(1000)
//     .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })

//   svg.selectAll(".brush")
//     .transition()
//     .duration(1000)
//     .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })

//   svg.selectAll(".datapath")
//     .transition()
//     .duration(1000)
//     .attr("d", path);

// }

// // Callback for updating color scale
// // Params: event - the event object that called the function
// //         dim   - which dimension was hovered over (string)
// function onMouseOver(event, dim) {
//   //Function to handle changing the color scale and updating the text to show which attribute is being used
//   colorDim = dim;
//   svg.selectAll(".label").transition().duration(1000)
//     .attr("font-weight", function(d) { if(d==colorDim) return "bold"; else return "normal"; } );
//   svg.selectAll(".datapath").transition().duration(1000)
//     .style("stroke", function(d) { return colorScales[colorDim](d[colorDim]); });
// }

// // Returns a callback function that calls onBrush() for the brush
// // associated with each dimension, updates data structure then updates the poly lines with onBrush()
// // Params: dim - which dimension is being brushed over
// //         event - (implicit) the event object for the brush
// function updateBrush(dim) {
//   return function(event) {
//     brushRanges[dim] = event.selection;
//     onBrush();
//   };
// }

// // Callback when brushing to select elements in the PC plot
// // and updates the lines with desired opacity
// function onBrush() {
//   let allLines = d3.selectAll(".datapath");

//   // Function to determine if a datapoint is in the current selection
//   function isSelected(d) {
//     let selected = true;
//     for(var i=0; i<dims.length; i++) {
//       let curDim = dims[i];
//       if(brushRanges[curDim]==null) continue;
//       let [y0, y1] = brushRanges[curDim];
//       if(y0 > yScales[curDim](d[curDim])
//         || y1 < yScales[curDim](d[curDim])) selected = false;
//     }
//     return selected;
//   }
  
//   //Update the opacity of the selected and not selected data
//   let selected = allLines
//     .filter(isSelected)
//     .style("opacity", 0.75);
//   let notSelected = allLines
//     .filter(function(d) { return !isSelected(d); })
//     .style("opacity", 0.1);

// }

// // 
// // a06.js
// // Code for CSC544 Assignment 06, Fall 2023
// // Tanner Finken <finkent@arizona.edu>
// //
// // This implements vector field visualization techniques and relies on
// // flowvis.js to perform the data loading of vector fields in VTK's .vti
// // format.
// //
// // It expects a a div with id 'vfplot' to where the vector field will be
// // visualized and two input handlers for glyph type and glyph distribution 
// // under ids 'glyphType' and 'glyphDistribution'
// // 
// // The glyphs are encoded as arrows with direction and magnitude encoded 
// // into the visual along with color again for magnitude with a blue meaning
// // a higher magnitude, with similar encoding for streamlines as streamlines
// // will be encoded as lines which follow the direction of the flow. 
// //




// ////////////////////////////////////////////////////////////////////////
// // Global variables and helper functions


// //this variable will hold the vector field upon loading
// let vf = null;

// //variables for the svg canvas
// let svg = null;
// let width = 800;
// let height = 800;

// //Variables for user selection
// var glyphType = "glyph";
// var distribution = "uniform";





// ////////////////////////////////////////////////////////////////////////
// // Visual Encoding portion that handles the d3 aspects

// // Function to create the d3 objects
// function initializeSVG() {
//   //Since we will call this function multiple times, we'll clear out the
//   //svg if it exists
//   if (svg != null) {
//     svg.remove()
//   }

//   //vf.bounds will report the units of the vector field
//   //use aspect ratio to update width/height
//   let aspectRatio = (vf.bounds[3]-vf.bounds[2]) / (vf.bounds[1]-vf.bounds[0]);
//   height = width * aspectRatio;
//   let padding = 50;

//   //Initialize the SVG canvas
//   svg = d3.select("#vfplot")
//     .append("svg")
//     .attr("width", width).attr("height", height+padding)
//     .attr("viewBox", [-padding, 0, width, height+padding]); //See the axes
//   //Shouldn't be null but just in case:
//   if(vf==null) { console.log("*****ERR: vector field is NULL, not loaded in"); return;}

//   // Create scales for x, y, color and magnitude
//   //vf.range will report the minimum/maximum magnitude
//   let xScale = d3.scaleLinear().domain([vf.bounds[0],vf.bounds[1]]).range([0,width]);
//   let yScale = d3.scaleLinear().domain([vf.bounds[2], vf.bounds[3]]).range([height, 0]);
//   let magMin = 1;
//   let magMax = 30;
//   let magScale = d3.scaleLinear().domain([0,vf.range[1]]).range([magMin, magMax]); //Set 0 as min to show dir even if the min vec of the field
//   let magColorScale = d3.scaleLinear().domain([vf.range[0], vf.range[1]]).range(["grey","blue"]);


//   //append axes
//   var xAxis = d3.axisBottom(xScale),
//       yAxis = d3.axisLeft(yScale);
//   // Translate xAxis to bottom
//   svg.append("g").attr("id", "x-axis").attr("transform", `translate(0,${height})`).call(xAxis);
//   svg.append("g").attr("id", "y-axis").call(yAxis);

//   //Draw either glyphs or streamlines, based on user selection, also uniform or random
//   if(glyphType=="glyph" && distribution=="uniform") {
//     let sampleXRate = 30; //How many times we sample across the width
//     let sampleYRate = 60;
//     let startX = vf.bounds[0],
//         endX   = vf.bounds[1],
//         startY = vf.bounds[2],
//         endY   = vf.bounds[3];
//     let changeXRate = (endX - startX) / sampleXRate;
//     let changeYRate = (endY - startY) / sampleYRate;
//     for(let i=startX; i<=endX; i+=changeXRate) { //Loop over the columns to generate
//       //Make a column of arrows for each row
//       for(let j=startY; j<=endY; j+=changeYRate) {
//         let [x1, y1] = vf.interpolate(i,j);
//         let vecMag = Math.sqrt(x1 * x1 + y1 *y1);
//         let lineMag = magScale(vecMag);
//         let lineColor = magColorScale(vecMag);
//         let lineAngle;
//         if(x1!=0) {
//           if(x1>0) {
//             lineAngle = Math.atan(y1/x1) / Math.PI * 180;
//           } else {
//             lineAngle = 180 + (Math.atan(y1/x1) / Math.PI * 180);
//           }
//         } else {
//           if(y1>0) {
//             lineAngle = 90;
//           } else {
//             lineAngle = 270;
//           }
//         }
//         //Generate the arrow glyph based on vector magnitude
//         let arrowGroup = svg.append("g");
//         arrowGroup.append("line")
//                   .attr("x1",0)
//                   .attr("y1",0)
//                   .attr("x2", lineMag)
//                   .attr("y2", 0)
//                   .attr("stroke", lineColor);
//         arrowGroup.append("line")
//                   .attr("x1",lineMag)
//                   .attr("y1",0)
//                   .attr("x2", lineMag/1.5)
//                   .attr("y2", +lineMag/5)
//                   .attr("stroke", lineColor);
//         arrowGroup.append("line")
//                   .attr("x1",lineMag)
//                   .attr("y1",0)
//                   .attr("x2", lineMag/1.5)
//                   .attr("y2", -lineMag/5)
//                   .attr("stroke", lineColor);
//         // Then translate and rotate the arrow to the correct position and direction
//         arrowGroup.attr("transform",`translate(${xScale(i)},${yScale(j)}) rotate(${-lineAngle})`);
//         // Drawn the arrow based on the value of [x,y] vector at position i,j on the svg
//       }
//     }
//   }
//   else if(glyphType=="glyph" && distribution=="random") {
//     let sampleRate = width * height / 225; //How many times we sample (avg every 15x15 box)
//     let startX = vf.bounds[0],
//         endX   = vf.bounds[1],
//         startY = vf.bounds[2],
//         endY   = vf.bounds[3];
//     let changeXRate = (endX - startX);
//     let changeYRate = (endY - startY);
//     for(let x=0; x<=sampleRate; x+=1) {
//       //Pick randomly in the space of available options
//       let i = (Math.random() * changeXRate) + startX;
//       let j = (Math.random() * changeYRate) + startY;
//       let [x1, y1] = vf.interpolate(i,j);
//       let vecMag = Math.sqrt(x1 * x1 + y1 *y1);
//       let lineMag = magScale(vecMag);
//       let lineColor = magColorScale(vecMag);
//       let lineAngle;
//       // Figure out the angle of the vector
//       if(x1!=0) {
//         if(x1>0) {
//           lineAngle = Math.atan(y1/x1) / Math.PI * 180;
//         } else {
//           lineAngle = 180 + (Math.atan(y1/x1) / Math.PI * 180);
//         }
//       } else {
//         if(y1>0) {
//           lineAngle = 90;
//         } else {
//           lineAngle = 270;
//         }
//       }
//       //Draw the arrow based on the vector magnitude
//       let arrowGroup = svg.append("g");
//       arrowGroup.append("line")
//                 .attr("x1",0)
//                 .attr("y1",0)
//                 .attr("x2", lineMag)
//                 .attr("y2", 0)
//                 .attr("stroke", lineColor);
//       arrowGroup.append("line")
//                 .attr("x1",lineMag)
//                 .attr("y1",0)
//                 .attr("x2", lineMag/1.5)
//                 .attr("y2", +lineMag/5)
//                 .attr("stroke", lineColor);
//       arrowGroup.append("line")
//                 .attr("x1",lineMag)
//                 .attr("y1",0)
//                 .attr("x2", lineMag/1.5)
//                 .attr("y2", -lineMag/5)
//                 .attr("stroke", lineColor);
//       //Then adjust the aarrow to the correct position and direction
//       arrowGroup.attr("transform",`translate(${xScale(i)},${yScale(j)}) rotate(${-lineAngle})`);
//       // Drawn the arrow based on the value of [x,y] vector at position i,j on the svg
//     }
//   }
//   else if(glyphType=="streamline" && distribution=="uniform") {
//     let sampleXRate = 30; //How many times we sample across the width
//     let sampleYRate = 60;
//     let startX = vf.bounds[0],
//         endX   = vf.bounds[1],
//         startY = vf.bounds[2],
//         endY   = vf.bounds[3];
//     let changeXRate = (endX - startX) / sampleXRate;
//     let changeYRate = (endY - startY) / sampleYRate;
//     for(let i=startX; i<=endX; i+=changeXRate) {
//       //Make a column of arrows for each space
//       for(let j=startY; j<=endY; j+=changeYRate) {
//         let avgSpeed = (vf.range[1] - vf.range[0]) / 2;
//         let avgDistance = ((vf.bounds[1]-vf.bounds[0]) + (vf.bounds[3]-vf.bounds[2])) /2;
//         let dt = avgDistance / avgSpeed / 100; // Split the domain in 100 step sizes of avg speed
//         let steps = 40; // A little under half the steps possibly needed to cross the domain
//         let valList = rk4Integrate([i,j],dt, steps);
//         let [x1, y1] = vf.interpolate(i,j);
//         let vecMag = Math.sqrt(x1 * x1 + y1 *y1);
//         let lineColor = magColorScale(vecMag);
//         let streamGroup = svg.append("g")
//                             .attr("class", "sLine");
//         streamGroup.append("circle")
//             .attr("cx", xScale(i))
//             .attr("cy", yScale(j))
//             .attr("r", 1);
//         let pathList = valList.map((d) => [xScale(d[0]), yScale(d[1])]);
//         let pathLine = d3.line()(pathList);
//         //Draw line based on path list
//         streamGroup.append("path")
//             .attr("d", pathLine)
//             .attr("fill", "none")
//             .attr("stroke",lineColor)
//             .attr("opacity", 0.75);
//       }
//     }
//   }
//   else if(glyphType=="streamline" && distribution=="random") {
//     let sampleRate = width * height / 225; //How many times we sample (avg every 15x15 box)
//     let startX = vf.bounds[0],
//         endX   = vf.bounds[1],
//         startY = vf.bounds[2],
//         endY   = vf.bounds[3];
//     let changeXRate = (endX - startX);
//     let changeYRate = (endY - startY);
//     for(let x=0; x<sampleRate; x++) {
//       //Pick random point
//       let i = (Math.random() * changeXRate) + startX;
//       let j = (Math.random() * changeYRate) + startY;
//       let avgSpeed = (vf.range[1] - vf.range[0]) / 2;
//       let avgDistance = ((vf.bounds[1]-vf.bounds[0]) + (vf.bounds[3]-vf.bounds[2])) /2;
//       let dt = avgDistance / avgSpeed / 100; // Split the domain in 100 step sizes of avg speed
//       let steps = 40; // A little under half the steps possibly needed to cross the domain
//       let valList = rk4Integrate([i,j],dt, steps);

//       let [x1, y1] = vf.interpolate(i,j);
//       let vecMag = Math.sqrt(x1 * x1 + y1 *y1);
//       let lineColor = magColorScale(vecMag);
//       //Make group to 'house' the sample point and the streamline
//       let streamGroup = svg.append("g")
//                           .attr("class", "sLine");
//       streamGroup.append("circle")
//           .attr("cx", xScale(i))
//           .attr("cy", yScale(j))
//           .attr("r", 1);
//       let pathList = valList.map((d) => [xScale(d[0]), yScale(d[1])]);
//       let pathLine = d3.line()(pathList);
//       //Draw line based on path list
//       streamGroup.append("path")
//           .attr("d", pathLine)
//           .attr("fill", "none")
//           .attr("stroke",lineColor)
//           .attr("opacity", 0.75);
//     }
//   }
// }

// // Function to integrate the path for Runge-Kutta 4
// // Given a start ([x,y]), dt (step size), numSteps (how many times to integrate)
// function rk4Integrate(start, dt, numSteps) {
//   list = [];
//   let clone1 = Object.assign({}, start);
//   list.push(clone1);
//   let current = start;
//   for(let i=0; i<numSteps; i++) {
//     let curVec = vf.interpolate(current[0], current[1]);
//     let k1 = [];
//     k1[0] = dt * curVec[0];
//     k1[1] = dt * curVec[1];
//     let k2 = [];
//     let nextVec = vf.interpolate(current[0] + (k1[0]/2), current[1] + (k1[1]/2));
//     k2[0] = dt * nextVec[0];
//     k2[1] = dt * nextVec[1];
//     let k3 = [];
//     let nextVec3 = vf.interpolate(current[0] + (k2[0]/2), current[1] + (k2[1]/2));
//     k3[0] = dt * nextVec[0];
//     k3[1] = dt * nextVec[1];
//     let k4 = [];
//     let nextVec4 = vf.interpolate(current[0] + (k3[0]), current[1] + (k3[1]));
//     if(nextVec4[0]==0 && nextVec4[1]==0) return list;
//     k4[0] = dt * nextVec[0];
//     k4[1] = dt * nextVec[1];
//     let addX = 1/6*(k1[0] + (2*k2[0]) + (2*k3[0]) + k4[0]);
//     let addY = 1/6*(k1[1] + (2*k2[1]) + (2*k3[1]) + k4[1]);
//     current[0] = current[0] + addX;
//     current[1] = current[1] + addY;
//     let clone = Object.assign({}, current);
//     list.push(clone);
//     if(addX==0 && addY==0) {
//       return list;
//     }
//   }
//   return list;
// }



// ////////////////////////////////////////////////////////////////////////
// // Function to read data

// // Function to process the upload
// function upload() {
//   if (input.files.length > 0) {
//     let file = input.files[0];
//     console.log("You chose", file.name);

//     let fReader = new FileReader();
//     fReader.readAsArrayBuffer(file);

//     fReader.onload = function(e) {
//       let fileData = fReader.result;

//       //load the .vti data and initialize volren
//       vf = parseVTKFile(fileData);

//       initializeSVG();
//     }
//   }
// }
// glyphType = d3.select("#glyphType").property("value");

// distribution = d3.select("#glyphDistribution").property("value");
// // Attach upload process to the loadData button
// var input = document.getElementById("loadData");
// input.addEventListener("change", upload);
// if (input.files.length > 0) { // Automatically load from cache
//   upload();
// }


// ////////////////////////////////////////////////////////////////////////
// // Functions to respond to selections

// //Functions depending on user input mechanism
// d3.select("#glyphType")
//   .on("change", function() {
//     glyphType = d3.select(this).property("value");
//     // console.log(glyphType);
//     if(vf!=null) initializeSVG();
//   });

// d3.select("#glyphDistribution")
//   .on("change", function() {
//     distribution = d3.select(this).property("value");
//     // console.log(distribution);
//     if(vf!=null) initializeSVG();
//   });
