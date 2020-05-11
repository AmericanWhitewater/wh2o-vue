import Vue from 'vue'
import Moment from 'moment'

Vue.mixin({
  methods: {
    formatDate: (date, format) => {
      const timestamp = Date.parse(date)
      return Moment(timestamp).format(format || 'll')
    }
  }
})
