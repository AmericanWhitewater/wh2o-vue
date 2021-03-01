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
  if (!isNaN(parseFloat(reading))) {
    if (metric_format) {
      const m = metric_format.match(/%([0-9]+)\.([0-9]+)f/);

      if (m.length) {
        return insertCommas
          ? numberWithCommas(parseFloat(reading).toFixed(Number.parseInt(m[2])))
          : parseFloat(reading).toFixed(Number.parseInt(m[2]));
      }
    }

    return insertCommas
      ? numberWithCommas(reading.toFixed(2))
      : reading.toFixed(2);
  }
  return "";
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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

export function rangeToClass(range) {
  switch (range[0]) {
    case "R":
      switch (range[1]) {
        case "0":
        case "1":
        case "2":
          return "low-runnable";
        case "3":
        case "4":
        case "5":
          return "runnable";
        case "6":
        case "7":
        case "8":
          return "high-runnable";
      }
      return "runnable";
    case "H":
      return "above-recommended";
    case "L":
      return "below-recommended";
  }
}
// copied from scss file :(
export function classToColor(c) {
  switch (c) {
    case "below-recommended":
      return "#FF8785";
    case "low-runnable":
      return "#59E78D";
    case "runnable":
      return "#59E78D";
    case "high-runnable":
      return "#59E78D";
    case "above-recommended":
      return "#68DFE9";
  }
  return "";
}
