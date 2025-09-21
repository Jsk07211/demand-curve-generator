import { dataset } from './dataset.js';
import { setupTable, updateTable } from './table.js';
import { setupGraph, updateScatter, updateBestFit, updateErrorCalculations } from './graph.js';


const ranges = {
    "xMin": d3.min(dataset, data => data.price),
    "xMax": d3.max(dataset, data => data.price),
    "yMin": d3.min(dataset, data => data.quantity),
    "yMax": d3.max(dataset, data => data.quantity),
}

// TODO: Add residuals lines
const { scatter, bestFit, x, y } = setupGraph(ranges);
const { tbody, columns } = setupTable();

updateTable(tbody, columns, dataset, ranges);
updateScatter(scatter, dataset, x, y);
const { mse, rmse, rSquared } = updateBestFit(bestFit, dataset, x, y);
updateErrorCalculations(mse, rmse, rSquared);

const generate = document.querySelector("#generate");

console.log(generate);

generate.addEventListener("click", () => {
    console.log(dataset);
    updateScatter(scatter, dataset, x, y);
    const { mse, rmse, rSquared } = updateBestFit(bestFit, dataset, x, y);
    updateErrorCalculations(mse, rmse, rSquared);
});
