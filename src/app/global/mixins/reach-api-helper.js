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

const apiGradeEnum = {
  "I": "I",
 "IstandoutII":             "I(II)",
 "IstandoutIII":            "I(III)",
 "IstandoutIV":             "I(IV)",
 "IstandoutV":              "I(V)",
 "IstandoutVplus":          "I(V+)",
 "ItoII":                   "I-II",
 "ItoIIstandoutIII":        "I-II(III)",
 "ItoIIstandoutIV":         "I-II(IV)",
 "ItoIIstandoutV":          "I-II(V)",
 "ItoIIstandoutVplus":      "I-II(V+)",
 "II":                      "II",
 "IIstandoutIII":           "II(III)",
 "IIstandoutIV":            "II(IV)",
 "IIstandoutV":             "II(V)",
 "IIstandoutVplus":         "II(V+)",
 "ItoIIplusstandoutIII":    "I-II+(III)",
 "ItoIIplusstandoutIV":     "I-II+(IV)",
 "ItoIIplusstandoutV":      "I-II+(V)",
 "ItoIIplusstandoutVplus":  "I-II+(V+)",
 "IIplus":                  "II+",
 "IIplusstandoutIII":       "II+(III)",
 "IIplusstandoutIV":        "II+(IV)",
 "IIplusstandoutV":         "II+(V)",
 "IIplusstandoutVplus":     "II+(V+)",
 "ItoIII":                  "I-III",
 "ItoIIIstandoutIV":        "I-III(IV)",
 "ItoIIIstandoutV":         "I-III(V)",
 "ItoIIIstandoutVplus":     "I-III(V+)",
 "IItoIII":                 "II-III",
 "IItoIIIstandoutIV":       "II-III(IV)",
 "IItoIIIstandoutV":        "II-III(V)",
 "IItoIIIstandoutVplus":    "II-III(V+)",
 "III":                     "III",
 "ItoIIIplus":              "I-III+",
 "ItoIIIplusstandoutIV":    "I-III+(IV)",
 "ItoIIIplusstandoutV":     "I-III+(V)",
 "ItoIIIplusstandoutVplus": "I-III+(V+)",
 "IItoIIIplus":             "II-III+",
 "IItoIIIplusstandoutIV":   "II-III+(IV)",
 "IItoIIIplusstandoutV":    "II-III+(V)",
 "IItoIIIplusstandoutVplus":"II-III+(V+)",
 "IIIplus":                 "III+",
 "IIIplusstandoutIV":       "III+(IV)",
 "IIIplusstandoutV":        "III+(V)",
 "IIIplusstandoutVplus":    "III+(V+)",
 "ItoIV":                   "I-IV",
 "ItoIVstandoutV":          "I-IV(V)",
 "ItoIVstandoutVplus":      "I-IV(V+)",
 "IItoIV":                  "II-IV",
 "IItoIVstandoutV":         "II-IV(V)",
 "IItoIVstandoutVplus":     "II-IV(V+)",
 "IIItoIV":                 "III-IV",
 "IIItoIVstandoutV":        "III-IV(V)",
 "IIItoIVstandoutVplus":    "III-IV(V+)",
 "IV":                      "IV",
 "IVstandoutV":             "IV(V)",
 "IVstandoutVplus":         "IV(V+)",
 "ItoIVplus":               "I-IV+",
 "ItoIVplusstandoutV":      "I-IV+(V)",
 "ItoIVplusstandoutVplus":  "I-IV+(V+)",
 "IItoIVplus":              "II-IV+",
 "IItoIVplusstandoutV":     "II-IV+(V)",
 "IItoIVplusstandoutVplus": "II-IV+(V+)",
 "IIItoIVplus":             "III-IV+",
 "IIItoIVplusstandoutV":    "III-IV+(V)",
 "IIItoIVplusstandoutVplus":"III-IV+(V+)",
 "IVplus":                  "IV+",
 "ItoV":                    "I-V",
 "ItoVstandoutVplus":       "I-V(V+)",
 "IItoV":                   "II-V",
 "IItoVstandoutVplus":      "II-V(V+)",
 "IIItoV":                  "III-V",
 "IIItoVstandoutVplus":     "III-V(V+)",
 "IVtoV":                   "IV-V",
 "IVtoVstandoutVplus":      "IV-V(V+)",
 "V":                       "V",
 "IItoVplus":               "II-V+",
 "IIItoVplus":              "III-V+",
 "IVtoVplus":               "IV-V+",
 "Vplus":                   "V+",
}

export const reachApiHelper = {
  data: () => ({
    correlationMetrics,
    apiGradeEnum,
  }),
  methods: {
    renderLegacyDifficulty(difficulty) {
      return this.apiGradeEnum[difficulty];
    },
    renderModernDifficultySchema(difficulty) {
      if (!difficulty) {
        return '';
      } else if (typeof(difficulty) === 'string') {
        return difficulty;
      }

      return gradeMap[difficulty.grade] + (difficulty.adjustment || "");
    },
    // these take a full correlation object with correlationDetails
    adjustedReachDifficulty(correlation) {
      // accounting for both null and undefined status
      if (correlation && correlation.status && correlation.correlationDetails) {
        const adjustedDifficultyKey = correlation.status.status.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return apiGradeEnum[correlation.correlationDetails[`${adjustedDifficultyKey}AdjustedDifficulty`]];
      }
      return null;
    },
    adjustedReachComment(correlation) {
      // accounting for both null and undefined status
      if (correlation && correlation.status && correlation.correlationDetails) {
        const adjustedKey = correlation.status.status.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return correlation.correlationDetails[`${adjustedKey}RangeComment`];
      }
      return null;
    },
    // these take just the correlation status object
    displayGaugeCorrelationLatestReadingTime(status) {
      if (status && status.latestReading) {
        const now = new Date();
        const readingTime = new Date(status.latestReading.dateTime);
        return humanReadable(now.getTime() - readingTime.getTime())
      }
      return '';
    },
    cssClassForGaugeCorrelation(status) {
      if (status && status.status) {
        return status.status; // TODO: not 100% sure if this works atm
      }
      return 'unk';
    },
  }
}