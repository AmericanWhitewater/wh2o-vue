import Vue from 'vue'

/**
 * @param {string} str the string you want to capitalize.
 *
 */
Vue.filter('capitalize', (str) => {
  if (!str) return ''
  str = str.toString()
  return str.charAt(0).toUpperCase() + str.slice(1)
})
