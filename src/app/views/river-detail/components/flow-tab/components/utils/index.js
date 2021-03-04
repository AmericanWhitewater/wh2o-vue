import { humanReadable } from "@/app/global/services";
import { formatReadingWithFormat } from "@/app/global/lib/gages";

export function formatReading(reading, metricID) {
  console.log(this.getMetric(metricID)?.format);
  return formatReadingWithFormat(
    reading,
    this.getMetric(metricID)?.format || ""
  );
}
export function getMetric(metricID) {
  if (metricID && this.metrics?.length) {
    return this.metrics.find((m) => m.id.toString() === metricID.toString());
  }
  return null;
}

export function formatTime(epoch) {
  return humanReadable(new Date().valueOf() - epoch * 1000);
}
export function formatFlowRange(min, max, metricID) {
  console.log(min, max, metricID);
  if (min && max) {
    return `${this.formatReading(min, metricID)} – ${this.formatReading(
      max,
      metricID
    )} ${this.formatMetric(metricID)}`;
  }
  return "n/a";
}
export function formatMetric(metricId) {
  if (this.metrics) {
    return this.getMetric(metricId)?.unit || "n/a";
  }
  return "n/a";
}
