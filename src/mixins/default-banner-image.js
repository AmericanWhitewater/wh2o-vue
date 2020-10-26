import { baseUrl } from '@/environment'

const defaultBannerImage = {
  props: {
    backgroundImage: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    images: [
      {
        url:
          baseUrl + 'photos/archive/medium/885497.jpg',
        title: 'image-01'
      },
      {
        url:
          baseUrl + 'photos/archive/medium/879537.jpg',
        title: 'image-02'
      },
      {
        url:
          baseUrl + 'photos/archive/medium/8670.jpg'
      },
      {
        url:
          baseUrl + 'photos/archive/medium/39950.jpg'
      },
      {
        url:
          baseUrl + 'photos/archive/medium/884685.jpg'
      },
      {
        url:
          baseUrl + 'photos/archive/medium/882780.jpg'
      }
    ],
    headerSyle: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
  }),
  computed: {
    headerBg () {
      if (!this.backgroundImage) {
        const img = this.images[Math.floor(Math.random() * this.images.length)]
        return img
      }
      return this.backgroundImage
    }
  }
}
export default defaultBannerImage
