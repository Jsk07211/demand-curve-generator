import { dataset } from './dataset.js';
import { setupTable, updateTable } from './table.js';
import { setupGraph, updateGraph } from './graph.js';


const ranges = {
    "min_x": d3.min(dataset, data => data.price),
    "max_x": d3.max(dataset, data => data.price),
    "min_y": d3.min(dataset, data => data.quantity),
    "max_y": d3.max(dataset, data => data.quantity),
}

const { scatter, x, y } = setupGraph(ranges);
const { tbody, columns } = setupTable();

updateTable(tbody, columns, dataset, ranges);
updateGraph(scatter, dataset, x, y);

const generate = document.querySelector("#generate");

console.log(generate);

generate.addEventListener("click", () => {
    console.log(dataset);
    updateGraph(scatter, dataset, x, y);
});
