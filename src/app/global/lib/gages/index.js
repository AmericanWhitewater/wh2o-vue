/**
 * Returns the reading with the precision specified by the gauge format.
 * @param reading {number}
 * @param metric_format {string} - value from metrics
 * @return number with the specified precision
 */

export function formatReadingWithFormat(reading, metric_format) {
  if (typeof reading === "number") {
    if (metric_format) {
      const m = metric_format.match(/%([0-9]+)\.([0-9]+)f/);

      if (m.length) {
        return reading.toFixed(Number.parseInt(m[2]));
      }
    }

    return reading.toFixed(2);
  }
  return "";
}

export function getEmptyMetric() {
  return { name: "n/a", unit: "n/a", format: "%3.2f", id: "0", shortkey: "" };
}

export function getEmptyRange() {
  return {
    range_min: "R0",
    range_max: "R9",
    min: 0,
    max: 0,
    time_adjustment: 0,
    range_comment: "",
    gauge_perfect: false,
    gauge_estimated: false,
    gauge_important: false,
    gauge_metric: 0,
    gauge_id: 0,
  };
}

export function getEmptyReading() {
  return {
    data: null,
    gauge_id: 310,
    id: 1331641570661,
    metric: 8,
    nv: 74706,
    reading: "3.8399999141693115",
    updated: "1613670272.00000000",
  };
}
