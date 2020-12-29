import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

/**
 * @note can set global configuration here:
 * @reference https://github.com/daichirata/vue-sanitize
 *
 */

// options = {
//     allowedTags: ['a', 'b'],
//     allowedAttributes: {
//       'a': [ 'href' ]
//     }
// };
// Vue.use(VueSanitize, options);

Vue.use(VueSanitize)

/**
 * @description strips out inline style attribute.
 * @todo regex to replace americanwhitewater with VUE_APP_BASE_URL to point to redirects
 * @param {string} content any content you'd like to clean
 */

Vue.prototype.$cleanContent = (content) => {

    let cleanedContent = Vue.prototype.$sanitize(content, {
        disallowedAttributes: {
          "*": ["style", "class"]
        }
      });

      cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\n\n', '<br/><br/>')
      cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\n', '')
      cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\r', '')
      cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\t', '')

      const legacyUrl = 'http://www.americanwhitewater.org/rivers/id/'
      const updatedUrl = '/#/river-detail/'

      cleanedContent = Vue.prototype.$replaceText(content, legacyUrl, updatedUrl)

    return cleanedContent
  };
