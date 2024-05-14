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
    }
  }
}