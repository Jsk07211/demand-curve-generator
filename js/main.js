import { initial_data } from './initial_data.js';
import { setupTable } from './table.js';
import { setupGraph } from './graph.js';

const max_x = d3.max(initial_data, data => data.price);
const max_y = d3.max(initial_data, data => data.quantity);

setupTable(initial_data, max_y);
setupGraph(initial_data, max_x, max_y);