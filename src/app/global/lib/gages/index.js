/**
 * Returns the reading with the precision specified by the gauge format.
 * @param reading {number|string}
 * @param metric_format {string} - value from metrics
 * @param insertCommas - commas for thousands separator
 * @return number with the specified precision
 */

export function formatReadingWithFormat(
  reading,
  metric_format,
  insertCommas = true
) {
  const floatReading = parseFloat(reading);
  if (!isNaN(floatReading)) {
    let fractionDigits = 2;
    if (metric_format) {
      const m = metric_format.match(/%([0-9]+)\.([0-9]+)f/);
      fractionDigits = parseInt(m[2]);
    }

    if (insertCommas) {
      return floatReading.toLocaleString("en", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
    } else {
      return floatReading.toFixed(fractionDigits);
    }
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
    gauge_id: 0,
    id: 0,
    metric: 0,
    nv: 0,
    reading: "0",
    updated: "0",
  };
}

export function rangeToClass(minRange, maxRange) {
  // this could be *way* simpler but the backend defines duplicate ranges with different "R" values
  // so we need to try to match them here
  switch (minRange[0]) {
    case "R":
      switch (minRange[1]) {
        case "0":
          if (maxRange[1] === "9") {
            return "runnable";
          } else {
            return "low-runnable";
          }
        case "4":
          return "runnable";
        case "5":
        case "6":
          return "high-runnable";
      }
      return "runnable";
    case "H":
      return "above-recommended";
    case "L":
      return "below-recommended";
  }
}