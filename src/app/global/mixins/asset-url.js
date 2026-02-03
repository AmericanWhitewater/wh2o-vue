import { assetBaseUrl, baseUrl } from '@/app/environment'

export const assetUrl = {
  methods: {
    assetUrl: (assetPath) => {
      if (assetPath) {
        const basePath = assetBaseUrl || ''
        return `${basePath}${assetPath.replace(/^\/+/, '')}`
      }
      return null;
    },

    formatLinkUrl: (path) => {
      return `${baseUrl}${path.replace(/^\/+/, '')}`
    },

    goToLink: (url) => {
      window.location = url
    },

    go(path) {
      this.goToLink(this.formatLinkUrl(path))
    },

    imageURI(image, size) {
      const imageSizes = image.image.uri;
      let desiredImage;
      if (size === "thumb") {
        desiredImage = imageSizes.thumb || imageSizes.medium || imageSizes.big;
      } else if (size === "big") {
        desiredImage = imageSizes.big || imageSizes.medium || imageSizes.thumb;
      } else {
        desiredImage = imageSizes.medium || imageSizes.big || imageSizes.thumb;
      }
      return this.assetUrl(desiredImage);
    }

  }
}
