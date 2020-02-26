import Vue from 'vue'

/**
 * @param {string} data input string where you want to replace text
 * @param {string} term the term you want to change
 * @param {string} newTerm the term replacement
 * @todo this needs to be reorganized, as it is not a custom filter
 */

Vue.prototype.$replaceText = function (data, term, newTerm) {
  if (data && term) {
    return data.replace(new RegExp(term, 'gi'), () => {
      return `${newTerm}`
    })
  }
  return data
}
