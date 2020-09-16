import { assetBaseUrl, baseUrl } from '@/app/environment'

export const assetUrl = {
  methods: {
    assetUrl: (assetPath) => {
      const basePath = assetBaseUrl || ''
      return `${basePath}${assetPath}`
    },

    formatLinkUrl: (path) => {
      path = path.replace(/^\/+/, '')
      return `${baseUrl}${path}`
    },

    goToLink: (url) => {
      window.location = url
    }
  }
}
