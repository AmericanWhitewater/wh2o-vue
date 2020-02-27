import Vue from 'vue'

/**
 * NL2BR = New Line to Br
 * takes \n\n from json response and converts to <br /> tag
 * @param {string} str string you want to filter
 */
Vue.filter('nl2br', (str) => {
  if (!str) return ''
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
})
