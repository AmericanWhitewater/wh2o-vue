import { assetBaseUrl, baseUrl } from '@/app/environment'

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
    },

    go(path) {
      this.goToLink(this.formatLinkUrl(path))
    }

  }
}
