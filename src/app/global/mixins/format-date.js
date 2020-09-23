import moment from 'moment'
export const formatDate = {
  methods: {
    formatDate: (date, format) => {
      return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format || 'll')
    }
  }
}
