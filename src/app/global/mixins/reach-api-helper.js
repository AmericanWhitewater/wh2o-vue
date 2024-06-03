// if we had typescript this might not be so necessary
// but as is, we need some helper functions to deal
// with our TRPC reach API

import { humanReadable } from '@/app/global/services/human-readable';

const gradeMap = ['N/A', 'I', 'II', 'III', 'IV', 'V', 'VI']

// this is duped from API because of our lack of typescript:
// https://github.com/AmericanWhitewater/aw-components/blob/main/js-packages/flobot/src/history/reader.ts
const correlationMetrics = {
  cfs: {
    name: "cfs",
    unit: "cfs",
    key: "cfs"
  },
  levelFT: {
    name: "stage (ft)",
    unit: "ft",
    key: "levelFT"
  }
//  cm3: {
//       name: "cms",
//       unit: "cms",
//       key: "cms"
//  } TODO: support cumecs - not currently considered a "FlowMetric" in backend
};

// TODO: support *all* gauge metrics by querying for what metrics a gauge has available
// const gaugeMetrics = {
//   ...correlationMetrics,
//   "temp-c": {
      //   name: "Temp (C)",
      //   unit: "ºC",
      //   key: "temp-c"
      // },
//   "temp-f": {
      //   name: "Temp (F)",
      //   unit: "ºF",
      //   key: "temp-f"
      // }
// };

export const reachApiHelper = {
  computed: {
    correlationMetrics() {
      return correlationMetrics;
    }
  },
  methods: {
    renderCombinedDifficultyGradeSchema(difficulty) {
      if (!difficulty) {
        return "unknown";
      }
      let gradeString = `${gradeMap[difficulty.defaultGrade.grade]}`;
      if (difficulty.defaultGrade.adjustment) {
        gradeString += difficulty.defaultGrade.adjustment;
      }
      if (difficulty.standoutGrade) {
        gradeString += ` (${gradeMap[difficulty.standoutGrade.grade]}`;
        if (difficulty.standoutGrade.adjustment) {
          gradeString += difficulty.standoutGrade.adjustment;
        }
        gradeString += ")";
      }
      return gradeString;
    },
    classForGaugeCorrelation(correlation) {
      if (correlation && correlation.status && correlation.status.status) {
        return correlation.status.status; // TODO: not 100% sure if this works atm
      }
      return 'unk';
    },
    adjustedReachGrade(correlation) {
      if (correlation && correlation.status && correlation.correlationDetails) {
        const adjustedGradeKey = correlation.status.status.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return correlation.correlationDetails.data[`${adjustedGradeKey}AdjustedGrade`];
      }
      return null;
    },
    adjustedReachComment(correlation) {
      if (correlation && correlation.status && correlation.correlationDetails) {
        const adjustedKey = correlation.status.status.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return correlation.correlationDetails.data[`${adjustedKey}RangeComment`];
      }
      return null;
    },
    displayGaugeCorrelationLatestReadingTime(correlation) {
      if (correlation && correlation.status && correlation.status.latestReading) {
        const now = new Date();
        const readingTime = new Date(correlation.status.latestReading.dateTime);
        return humanReadable(now.getTime() - readingTime.getTime())
      }
      return '';
    }
  }
}