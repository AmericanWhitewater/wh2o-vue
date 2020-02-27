import Vue from 'vue'
Vue.filter('phoneNumber', (str) => {
  if (!str) return ''
  const s2 = `${str}`.replace(/\D/g, '')
  const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/)
  return !m ? null : `(${m[1]}) ${m[2]}-${m[3]}`
})
