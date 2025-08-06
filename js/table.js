function cellRange(value, min, max) {
    /**
     * Clamp the values to be in range.
     * 
     * If user goes below the min, set the value to min.
     * If user exceeds the max, set the value to max.
     */
    if (value < min) {
        return min;
    }

    return value > max ? max : value;
}

export function updateTable(tbody, columns, dataset, ranges) {
    // Select all rows and input our data
    const rows = tbody.selectAll("tr")                                      // Initially, no rows to select
        .data(dataset)                                                      // Bind our data to the rows
        .enter()
        .append("tr");

    // TODO: Precompute the cells that are interactable; maybe create a function for that?
    // Create editable cells
    rows.selectAll("td")
        .data((row, index) => columns.map(column => ({                      // Return object literal directly, can wrap in () instead of { return x; }
            column: column.key,                                             // Which column the cell is from
            value: row[column.key],                                         // Value of cell
            rowData: row,                                                   // Reference to row data object
            rowIndex: index,                                                // Tracks position of row in the data
        })))
        .enter()
        .append("td")                                                       // Add td element into DOM for each datapoint
        .each(function (data) {                                             // Cannot use arrow functions since they don't bind on `this` (they get it from surrounding scope)
            // Can only edit quantity not at start or end of table (fixed endpoints)
            const isEditable = data.column === "quantity"
                && data.rowIndex != 0
                && data.rowIndex !== dataset.length - 1;

            if (isEditable) {
                d3.select(this)
                    .append("input")
                    .attr("type", "number")
                    .attr("min", 0)
                    .attr("max", ranges.max_y)
                    .attr("value", data.value)
                    .on("keydown", function (event) {                         // Cannot use arrow function since it doesn't bind on `this`
                        if (event.key == "Enter") {                           // Explicitly passing event; global windows.event is deprecated
                            this.value = cellRange(this.value, ranges.min_y, ranges.max_y);
                            data.rowData[data.column] = this.value;           // Unary `+` converts string into a number
                            this.blur();                                      // Remove focus from input field
                        }
                    })
            } else {
                d3.select(this).text(data.value);
            }
        });
}

export function setupTable() {
    // Creating HTML table
    const table = d3.select("#table-container").append("table");
    const thead = table.append("thead");
    const tbody = table.append("tbody");

    // Add new row and append the headers
    const columns = [
        { label: "Price ($)", key: "price" },
        { label: "Quantity (Units)", key: "quantity" },
    ]

    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(data => data.label);                                          // Choose what gets displayed on table

    return { tbody, columns };
}
