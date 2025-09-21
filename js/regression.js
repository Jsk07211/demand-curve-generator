/**
 * Self-implemented regression functions and error calculations
 * to understand what goes under the hood
 */

export function linear_regression(prices, quantities) {
    /**
     * Calculate the best fit line using Ordinary Least Squares (OLS) Method.
     * Very common in Econometrics!
     */
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;

    // For faster access
    var x = 0;
    var y = 0;
    var length = prices.length;

    if (length != quantities.length) {
        throw new Error('Each price (y) should be associated to a quantity (x)!');
    }

    if (length === 0) {
        return [[], []];
    }

    // Calculate the sums (We want to predict quantities based on price)
    for (var i = 0; i < length; i++) {
        x = prices[i];
        y = quantities[i];
        sum_x += x;
        sum_y += y;
        sum_xx += x * x;
        sum_xy += x * y;
    }

    const gradient = (length * sum_xy - sum_x * sum_y) / (length * sum_xx - sum_x * sum_x);
    const intercept = (sum_y / length) - (gradient * sum_x) / length;

    const fitted = [];

    for (var i = 0; i < length; i++) {
        x = prices[i];
        y = x * gradient + intercept;

        fitted.push({ price: x, quantity: y });
    }

    return fitted;
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