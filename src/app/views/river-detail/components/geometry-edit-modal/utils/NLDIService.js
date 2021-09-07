import lineSlice from '@turf/line-slice'
import { lineString } from '@turf/helpers'


// most of the NLDI logic here is reproduced from
// https://github.com/sdl60660/river-runner

export default {
  async calculateGeom(reachStart, reachEnd) {
    let slicedReach;
    // attempt to use the NLDI to get the flowline matching the requested points
    try {
      let closestFeature;
      closestFeature = await this.findClosestFeature(reachStart);
      let flowlinesData;
      flowlinesData = await this.fetchNLDI(closestFeature);
      const combinedFlowlines = flowlinesData.features[0];
      combinedFlowlines.geometry.coordinates = flowlinesData.features
        .map((a) => a.geometry.coordinates)
        .flat();
      slicedReach = lineSlice(reachStart, reachEnd, combinedFlowlines);
    } catch {
      // if NLDI doesn't work for whatever reason, just return a straight line
      slicedReach = lineString([
        reachStart.geometry.coordinates,
        reachEnd.geometry.coordinates,
      ]);
    }
    return slicedReach;
  },
  async findClosestFeature(point) {
    let closestFeature;
    let resultFound = false;
    let roundingDigits = 6;
    while (resultFound === false && roundingDigits >= 0) {
      roundingDigits -= 1;
      const closestFeatureURL = `https://labs.waterdata.usgs.gov/api/nldi/linked-data/comid/position?coords=POINT%28${point.geometry.coordinates[0].toFixed(
        roundingDigits
      )}%20${point.geometry.coordinates[1].toFixed(roundingDigits)}%29`;
      const coordinateResponse = await fetch(closestFeatureURL);
      const data = await coordinateResponse.json();
      closestFeature = data.features[0];
      resultFound = true;
    }
    return closestFeature;
  },
  async fetchNLDI(closestFeature) {
    const siteURL =
      closestFeature.properties.navigation +
      "/DM/flowlines" +
      "?f=json&distance=6000";
    const response = await fetch(siteURL);
    try {
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  },
};