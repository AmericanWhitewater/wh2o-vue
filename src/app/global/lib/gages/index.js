/**
 * Returns the reading with the precision specified by the gauge format.
 * @param reading {number}
 * @param metric_format {string} - value from metrics
 * @return number with the specified precision
 */

export function formatReading(reading, metric_format) {
  if (metric_format) {
    const m = metric_format.match(/%([0-9]+)\.([0-9]+)f/);

    if (m.length) {
      return reading.toFixed(Number.parseInt(m[2]));
    }
  }
  if (typeof reading === "number") {
    return reading.toFixed(2);
  }
  return "";
}
