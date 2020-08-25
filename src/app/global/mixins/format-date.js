import Moment from 'moment'

export const formatDate = {
  methods: {
    formatDate: (date, format) => {
      const timestamp = Date.parse(date)
      return Moment(timestamp).format(format || 'll')
    }
  }
}
