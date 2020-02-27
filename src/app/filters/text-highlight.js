import Vue from 'vue'

Vue.filter('textHighlight', (data, term) => {
  if (data && term) {
    return data.replace(new RegExp(term, 'gi'), match => {
      return `<strong class="highlight">${match}</strong>`
    })
  }
  return data
})
