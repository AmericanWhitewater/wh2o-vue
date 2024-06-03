import { humanReadable } from '@/app/global/services/human-readable';

// if we had typescript this might not be so necessary
// but as is, we need some helper functions to deal
// with our TRPC reach API
const gradeMap = ['N/A', 'I', 'II', 'III', 'IV', 'V', 'VI']

export const reachApiHelper = {
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