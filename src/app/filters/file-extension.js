import Vue from 'vue'
Vue.filter('fileExtension', (str) => {
  if (!str) return ''
  const fileArr = str.split('.')
  return fileArr[fileArr.length - 1]
})
