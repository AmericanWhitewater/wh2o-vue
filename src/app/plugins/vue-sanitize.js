import Vue from 'vue'
import VueSanitize from 'vue-sanitize'
import { laravelDeploy } from "@/app/environment"
import { baseUrl } from '@/app/environment'

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
  if (!content) {
    return '';
  }

  let cleanedContent = Vue.prototype.$sanitize(content, {
      disallowedAttributes: {
        "*": ["style", "class"]
      }
    });

    const legacyUrls = [
      '/rivers/id/',
      '/content/River/detail/id/',
      '/content/River_detail_id_'
    ];

    let updatedUrl;
    if (laravelDeploy) {
      updatedUrl = '/content/River/view/river-detail/';
    } else {
      updatedUrl = '/river-detail/';
    }

    legacyUrls.forEach((legacyUrl) => {
      cleanedContent = Vue.prototype.$replaceText(cleanedContent, legacyUrl, updatedUrl)
    });

    // remove baseUrl to make link relative
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, baseUrl, '');

    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\n\n', '<br/><br/>');
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\n', '');
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\r', '');
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '\t', '');
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '&nbsp;', '');
    // replace double quotes otherwise gql parsing error
    cleanedContent = Vue.prototype.$replaceText(cleanedContent, '"', '\'');


  return cleanedContent
};
