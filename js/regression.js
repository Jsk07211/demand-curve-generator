/**
 * Self-implemented regression functions and error calculations
 * to understand what goes under the hood
 */

export function linear_regression(prices, quantities) {
    /**
     * Calculate the best fit line using Ordinary Least Squares (OLS) Method.
     * Very common in Econometrics!
     */

    const equation = {};

    const x_mean = quantities.reduce((q1, q2) => q1 + q2, 0) / quantities.length;   // Sum of quantities / length, accumulator init 0
    const y_mean = prices.reduce((p1, p2) => p1 + p2, 0) / prices.length;           // Sum of prices / length, accumulator init 0
}

function mean_squared_error() {

}

function root_mean_square_error() {

}

function coefficient_of_determination() {
}

export function error_calculations() {
    const mse = mean_squared_error();
    const rmse = root_mean_square_error();
    const r_squared = coefficient_of_determination();

    // Update respective labels
}