import moment from 'moment'
export const formatDate = {
  methods: {
    parseDate: (date) => {
      return moment(date, 'YYYY-MM-DD HH:mm:ss')
    },
    formatDate: (date, format) => {
      let momDate;
      if (!moment.isMoment(date)) {
        momDate = moment(date, 'YYYY-MM-DD HH:mm:ss')
      } else {
        momDate = date;
      }

      // we have bad data that we've assigned 1900-01-01 to in order
      // to differentiate it.
      if (momDate.isBefore('1910-01-01', 'day')) {
        return 'Unknown Date'
      }
      return momDate.format(format || 'll')
    }
  }
}
