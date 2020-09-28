import moment from 'moment'
export const formatDate = {
  methods: {
    parseDate: (date) => {
      return moment(date, 'YYYY-MM-DD HH:mm:ss')
    },
    formatDate: (date, format) => {
      if (moment.isMoment(date)) {
        return date.format(format || 'll')
      }
      return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format || 'll')
    }
  }
}
