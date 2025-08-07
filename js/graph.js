export function updateGraph(scatter, dataset, x, y) {
    console.log(scatter);

    const dots = scatter.selectAll("circle")                                // Rebinds latest state of dataset to circle
        .data(dataset);

    // Add dots to the svg
    dots.enter()                                                            // New selection of dots with no existing DOM element
        .append("circle")
        .merge(dots)                                                        // Combines new selection with old selection
        .attr("cx", data => x(data.price))                                  // Use x scale function for x values (data values => pixel positions)
        .attr("cy", data => y(data.quantity))                               // Use y scale function for y values (data values => pixel positions)
        .attr("r", 5)
        .style("fill", "#000");

    // No need to call .exit() since dataset size is fixed
}

export function setupGraph(ranges) {
    // Set dimensions and margins for the chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Set up the x and y scales
    // Range of pixels where the scale can live 
    const x = d3.scaleLinear()                                              // x-axis: Price
        .range([0, width])
        .domain([0, ranges.max_x + 0.1 * ranges.max_x]);

    const y = d3.scaleLinear()                                              // y-axis: Quantity
        .range([height, 0])                                                 // svg coordinates for y-axis are reversed
        .domain([0, ranges.max_y + 0.1 * ranges.max_y]);

    // Create the svg element and append it to the chart                
    const graph = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")                                                        // Append group element (<g> SVG element is a container used to group other SVG elements)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);     // Image sits nicely in container

    // Define the x and y domains (What data goes into the range we declared earlier)
    x.domain([0, ranges.max_x + 0.1 * ranges.max_x]);
    y.domain([0, ranges.max_y + 0.1 * ranges.max_y]);

    // Add the x-axis
    graph.append("g")                                                       // Append new group element to graph
        .attr("transform", `translate(0, ${height})`)                       // translating element by height (move it to the bottom)
        .call(d3.axisBottom(x));                                            // Creates bottom horizontal axis

    // Add the y-axis
    graph.append("g")                                                       // Append new group element to graph
        .call(d3.axisLeft(y));                                              // Creates left vertical axis

    // Create x-axis label
    graph.append("text")
        .attr("class", "x_label")
        .attr("text-anchor", "end")
        .attr("x", width / 1.75)
        .attr("y", height + margin.bottom - 5)
        .text("Quantity (Units)");

    // Create y-axis label
    graph.append("text")
        .attr("class", "y_label")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2.5)                                           // x-axis uses height because of rotate
        .attr("y", -margin.left / 1.5)                                      // y-axis uses width because of rotate
        .attr("dy", ".75em")
        .text("Price ($)");

    const scatter = graph.append("g");

    return { scatter, x, y };
}