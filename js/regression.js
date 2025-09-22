/**
 * Self-implemented regression functions and error calculations
 * to understand what goes under the hood
 */

export function linearRegression(prices, quantities) {
    /**
     * Calculate the best fit line using Ordinary Least Squares (OLS) Method.
     * Very common in Econometrics!
     */
    var xSum = 0;
    var ySum = 0;
    var xySum = 0;
    var xxSum = 0;

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
        xSum += x;
        ySum += y;
        xxSum += x * x;
        xySum += x * y;
    }

    const gradient = (length * xySum - xSum * ySum) / (length * xxSum - Math.pow(xSum, 2));
    const intercept = (ySum / length) - (gradient * xSum) / length;

    const fitted = [];

    for (var i = 0; i < length; i++) {
        x = prices[i];
        y = x * gradient + intercept;

        fitted.push({ price: x, quantity: y });
    }

    return fitted;
}

function meanSquaredError(actual, predicted) {
    const length = actual.length;

    if (length != predicted.length) {
        throw new Error("Each actual value must have a corresponding predicted value");
    }

    let sumSquaredError = 0;

    for (var i = 0; i < length; i++) {
        sumSquaredError += Math.pow(actual[i] - predicted[i], 2);
    }

    return sumSquaredError / length;
}

function rootMeanSquareError(mse) {
    return Math.pow(mse, 0.5);
}

function coefficientOfDetermination() {
    return 0;
}

export function errorCalculations(actual, predicted) {
    const mse = meanSquaredError(actual, predicted);
    const rmse = rootMeanSquareError(mse);
    const rSquared = coefficientOfDetermination();

    return { mse, rmse, rSquared };
}