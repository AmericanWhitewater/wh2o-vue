import Vue from 'vue'
Vue.filter('fileName', (str) => {
  if (!str) return ''
  const fileArr = str.split('/')
  return fileArr[fileArr.length - 1]
})
