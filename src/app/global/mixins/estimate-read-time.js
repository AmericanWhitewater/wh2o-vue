import Vue from 'vue'
Vue.mixin({
  methods: {
    estReadingTime (content) {
      if (content) {
        const wordsPerMinute = 200 // Average case.
        let result

        const textLength = content.split(' ').length // Split by words
        if (textLength > 0) {
          const value = Math.ceil(textLength / wordsPerMinute)
          result = `${value} min read`
          return result
        }
      }
      return ''
    }
  }
})
