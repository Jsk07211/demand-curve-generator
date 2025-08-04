export function setupGraph(dataset, max_x, max_y) {
    // Set dimensions and margins for the chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const padding = 10;

    // Set up the x and y scales
    // Range of pixels where the scale can live 
    const x = d3.scaleLinear()                                              // x-axis: Price
        .range([0, width]);

    const y = d3.scaleLinear()                                              // y-axis: Quantity
        .range([height, 0]);                                                // svg coordinates for y-axis are reversed

    // Create the svg element and append it to the chart                
    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")                                                        // Append group element (<g> SVG element is a container used to group other SVG elements)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);     // Image sits nicely in container

    // Define the x and y domains (What data goes into the range we declared earlier)
    x.domain([0, max_x + padding]);
    y.domain([0, max_y + padding]);

    // Add the x-axis
    svg.append("g")                                                         // Append new group element to svg
        .attr("transform", `translate(0, ${height})`)                       // translating element by height (move it to the bottom)
        .call(d3.axisBottom(x));                                            // Creates bottom horizontal axis

    // Add the y-axis
    svg.append("g")                                                         // Append new group element to svg
        .call(d3.axisLeft(y));                                              // Creates left vertical axis

    // Create the line generator
    const line = d3.line()
        .x(data => x(data.price))
        .y(data => y(data.quantity));

    // Add the line path to the SVG element
    svg.append("path")
        .datum(dataset)                                                     // data is for a list of elements, datum only specifies one element
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-wdith", 1)
        .attr("d", line);                                                   // Call line generator that we created in Line 48
}