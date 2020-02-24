import Vue from 'vue'

/**
 *
 * @param {string} data input string where you want to replace text
 * @param {string} term the term you want to change
 * @param {string} newTerm the term replacement
 * @usage
 *
 *
 */

Vue.filter('replaceText', (data, term, newTerm) => {
  if (data && term) {
    return data.replace(new RegExp(term, 'gi'), match => {
      return `${newTerm}`
    })
  }
  return data
})
