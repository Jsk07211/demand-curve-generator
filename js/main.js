import { initial_data } from './initial_data.js';
import { setupTable, updateTable } from './table.js';
import { setupGraph, updateGraph } from './graph.js';


const ranges = {
    "min_x": d3.min(initial_data, data => data.price),
    "max_x": d3.max(initial_data, data => data.price),
    "min_y": d3.min(initial_data, data => data.quantity),
    "max_y": d3.max(initial_data, data => data.quantity),
}

const { graph, x, y } = setupGraph(ranges);
const { tbody, columns } = setupTable();

updateTable(tbody, columns, initial_data, ranges);
updateGraph(graph, initial_data, x, y);

const generate = document.querySelector("#generate");

console.log(generate);

generate.addEventListener("click", () => {
    console.log(initial_data);
    updateGraph(graph, initial_data, x, y);
});
