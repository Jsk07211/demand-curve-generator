export function setupGraph(dataset) {
    // Set dimensions and margins for the chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const max_x = d3.max(dataset, data => data.price);
    const max_y = d3.max(dataset, data => data.quantity);

    // Set up the x and y scales
    // Range of pixels where the scale can live 
    const x = d3.scaleLinear()                                              // x-axis: Price
        .range([0, width])
        .domain([0, max_x + 0.1 * max_x]);

    const y = d3.scaleLinear()                                              // y-axis: Quantity
        .range([height, 0])                                                 // svg coordinates for y-axis are reversed
        .domain([0, max_y + 0.1 * max_y]);

    // Create the svg element and append it to the chart                
    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")                                                        // Append group element (<g> SVG element is a container used to group other SVG elements)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);     // Image sits nicely in container

    // Define the x and y domains (What data goes into the range we declared earlier)
    x.domain([0, max_x + 0.1 * max_x]);
    y.domain([0, max_y + 0.1 * max_y]);

    // Add the x-axis
    svg.append("g")                                                         // Append new group element to svg
        .attr("transform", `translate(0, ${height})`)                       // translating element by height (move it to the bottom)
        .call(d3.axisBottom(x));                                            // Creates bottom horizontal axis

    // Add the y-axis
    svg.append("g")                                                         // Append new group element to svg
        .call(d3.axisLeft(y));                                              // Creates left vertical axis

    // Add dots to the svg
    svg.append("g")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", data => x(data.price))                                  // Use x scale function for x values (data values => pixel positions)
        .attr("cy", data => y(data.quantity))                               // Use y scale function for y values (data values => pixel positions)
        .attr("r", 5)
        .style("fill", "#000");
}