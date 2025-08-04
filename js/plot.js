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

// Create a fake dataset
const dataset = [
    { price: 10, quantity: 90 },
    { price: 20, quantity: 80 },
    { price: 30, quantity: 70 },
    { price: 40, quantity: 60 },
    { price: 50, quantity: 50 },
    { price: 60, quantity: 40 },
    { price: 70, quantity: 30 },
    { price: 80, quantity: 20 },
    { price: 90, quantity: 10 },
];

const max_x = d3.max(dataset, data => data.price);
const max_y = d3.max(dataset, data => data.quantity);

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

// Creating HTML table
const table = d3.select("#table-container").append("table");
const thead = table.append("thead");
const tbody = table.append("tbody");

// Add new row and append the headers
const columns = [
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
]

thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .text(data => data.label);                                          // Choose what gets displayed on table

// Select all rows and input our data
const rows = tbody.selectAll("tr")                                      // Initially, no rows to select
    .data(dataset)                                                      // Bind our data to the rows
    .enter()
    .append("tr");

// Create editable cells
rows.selectAll("td")
    .data((row, index) => columns.map(column => ({                      // Return object literal directly, can wrap in () instead of { return x; }
        column: column.toLowerCase(),                                   // Which column the cell is from
        value: row[column.toLowerCase()],                               // Value of cell
        rowData: row,                                                   // Reference to row data object
        rowIndex: index,                                                // Tracks position of row in the data
    })))
    .enter()
    .append("td")                                                       // Add td element into DOM for each datapoint
    .each(data => {
        // Can only edit quantity not at start or end of table (fixed endpoints)
        const isEditable = data.column === "quantity"
            && data.rowIndex != 0
            && data.rowIndex !== dataset.length - 1;

        if (isEditable) {
            d3.select()
                .append("input")
                .attr("type", "number")
                .attr("min", 0)
                .attr("max", max_y)
                .attr("value", data.value)
                .on("input", () => {
                    data.rowData[data.column] = +this.value;            // Unary `+` converts string into a number
                })
        } else {
            d3.select().text(data.value);
        }
    });