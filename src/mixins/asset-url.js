import { assetBaseUrl, baseUrl } from '@/environment'

export const assetUrl = {
  methods: {
    assetUrl: (assetPath) => {
      const basePath = assetBaseUrl || ''
      return `${basePath}${assetPath}`
    },

    formatLinkUrl: (path) => {
      return `${baseUrl}${path.replace(/^\/+/, '')}`
    },

    goToLink: (url) => {
      window.location = url
    }
  }
}
