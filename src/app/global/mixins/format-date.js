import moment from 'moment'
export const formatDate = {
  methods: {
    formatDate: (date, format) => {
      let momDate;
      if (!moment.isMoment(date)) {
        momDate = moment(date)
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
