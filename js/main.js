import { initial_data } from './initial_data.js';
import { setupTable, updateTable } from './table.js';
import { setupGraph } from './graph.js';

const ranges = {
    "min_x": d3.min(initial_data, data => data.price),
    "max_x": d3.max(initial_data, data => data.price),
    "min_y": d3.min(initial_data, data => data.quantity),
    "max_y": d3.max(initial_data, data => data.quantity),
}

setupGraph(initial_data);
const { tbody, columns } = setupTable();

updateTable(tbody, columns, initial_data, ranges);
