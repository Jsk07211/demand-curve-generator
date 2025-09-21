import { errorCalculations, linearRegression } from './regression.js';

export function updateScatter(scatter, dataset, x, y) {
    const dots = scatter.selectAll("circle")                                // Rebinds latest state of dataset to circle
        .data(dataset);

    // Add dots to the svg
    dots.enter()                                                            // New selection of dots with no existing DOM element
        .append("circle")
        .merge(dots)                                                        // Combines new selection with old selection
        .attr("cx", data => x(data.price))                                  // Use x scale function for x values (data values => pixel positions)
        .attr("cy", data => y(data.quantity))                               // Use y scale function for y values (data values => pixel positions)
        .attr("r", 5)
        .style("fill", "black");

    // No need to call .exit() since dataset size is fixed
}
export function updateBestFit(bestFit, dataset, x, y) {
    // Calculate best fit line
    const pricesActual = dataset.map(data => data.price);
    const quantitiesActual = dataset.map(data => data.quantity);

    const bestFitPoints = linearRegression(pricesActual, quantitiesActual);
    const quantitiesPredicted = bestFitPoints.map(data => data.quantity);

    const bestFitLine = d3.line()
        .x(data => x(data.price))
        .y(data => y(data.quantity));

    bestFit
        .selectAll("path.best-fit")
        .data([bestFitPoints])                                              // bind one array to the path
        .join("path")
        .attr("class", "best-fit")
        .attr("stroke", "black")
        .attr("d", bestFitLine);

    return errorCalculations(quantitiesActual, quantitiesPredicted);
}

function updateMetric(id, value) {
    const valSpan = document.getElementById(id).querySelector('.value');
    valSpan.textContent = value.toFixed(2);
}

export function updateErrorCalculations(mse, rmse, rSquared) {
    updateMetric('mse', mse);
    updateMetric('rmse', rmse);
    updateMetric('r2', rSquared);
}

export function setupGraph(ranges) {
    // Set dimensions and margins for the chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Set up the x and y scales
    // Range of pixels where the scale can live 
    const x = d3.scaleLinear()                                              // x-axis: Quantity
        .range([0, width])
        .domain([0, ranges.xMax + 0.1 * ranges.xMax]);

    const y = d3.scaleLinear()                                              // y-axis: Price
        .range([height, 0])                                                 // svg coordinates for y-axis are reversed
        .domain([0, ranges.yMax + 0.1 * ranges.yMax]);

    // Create the svg element and append it to the chart                
    const graph = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")                                                        // Append group element (<g> SVG element is a container used to group other SVG elements)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);     // Image sits nicely in container

    // Define the x and y domains (What data goes into the range we declared earlier)
    x.domain([0, ranges.xMax + 0.1 * ranges.xMax]);
    y.domain([0, ranges.yMax + 0.1 * ranges.yMax]);

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

    const bestFit = graph.append("g");
    const scatter = graph.append("g");

    return { scatter, bestFit, x, y };
}