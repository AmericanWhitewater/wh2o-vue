import Vue from 'vue'
Vue.filter('fileSize', (str) => {
  const byteUnits = [
    ' KB',
    ' MB',
    ' GB',
    ' TB',
    ' PB',
    ' EB',
    ' ZB',
    ' YB'
  ]
  let i = -1
  do {
    str = str / 1024
    i++
  } while (str > 1024)
  return Math.max(str, 0.1)
    .toFixed(1) + byteUnits[i]
})
