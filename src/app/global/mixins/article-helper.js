import { baseUrl } from '@/app/environment'

export const articleHelper = {
  methods: {
    articleThumb (article) {
      if (article && article.image && article.image.uri) {
        const uri = article.image.uri.thumb || article.image.uri.medium || article.image.uri.big
        return `${baseUrl}${uri}`
      }
      return null
    },
    articleUrl (article) {
      return `/content/Article/view/article_id/${article.id}/`
    }
  }
}