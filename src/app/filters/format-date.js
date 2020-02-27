import Vue from 'vue'
import Moment from 'moment'

/**
 * @param {string} date the date you want to format
 * @param {string} fmt the moment format code
 * @reference https://devhints.io/moment
 *
 */
Vue.filter('formatDate', (date, fmt) => {
  if (!date) return null
  return Moment(date).format(fmt)
})
