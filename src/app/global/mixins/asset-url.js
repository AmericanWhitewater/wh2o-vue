import { assetBaseUrl } from '@/app/environment'

export const assetUrl = {
  methods: {
    assetUrl: (assetPath) => {
      const basePath = assetBaseUrl || ''
      return `${basePath}${assetPath}`
    }
  }
}
