import Vue from 'vue'
import Moment from 'moment'

Vue.mixin({
  methods: {
    formatDate: (date, format) => Moment(date).format(format)
  }
})
