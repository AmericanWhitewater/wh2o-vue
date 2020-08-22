import ImageGallery from '../image-gallery.vue'
import { createWrapper } from '@/utils'
import { assetUrl } from '@/app/environment'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const openLightbox = jest.fn()

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        data: {
          id: 123,
          river: 'Nooksack',
          section: 'The first part'
        }
      }
    }
  }
}

const options = {
  stubs: ['transition'],
  methods: {
    openLightbox
  },
  mocks: {
    $store: mockStore
  },
  propsData: {
    images: [
      {
        image: {
          uri: {
            thumb: '/photos/archive/thumb/8928.jpg',
            medium: '/photos/archive/medium/8928.jpg',
            big: '/photos/archive/8928.jpg'
          }
        },
        id: '8928',
        author: 'Jered Johnson',
        caption: 'Professor Fullmer and company',
        description:
          'The highly educated Shawn Fullmer, contemplates the meaning of life and what exactly is a fuzzy little bunny',
        photo_date: null,
        poi_name: 'Fuzzy Little Bunny',
        poi_id: '102575',
        subject: 'Fuzzy Little Bunny'
      },
      {
        image: {
          uri: {
            thumb: '/photos/archive/thumb/890762.jpg',
            medium: '/photos/archive/medium/890762.jpg',
            big: '/photos/archive/890762.jpg'
          }
        },
        id: '890762',
        author: 'Dave Winston',
        caption: '',
        description: '\t\t\r\n\r\n\r\n',
        photo_date: null,
        poi_name: 'Warm Up',
        poi_id: '107028',
        subject: ''
      },
      {
        image: {
          uri: {
            thumb: '/photos/archive/medium/7578.jpg',
            medium: null,
            big: null
          }
        },
        id: '7578',
        author: 'Bryan Mills',
        caption: 'Finish Line',
        description: 'This rapid is a sweet 10 ft. boof (if you hit it right)',
        photo_date: null,
        poi_name: 'Finish Line',
        poi_id: '107035',
        subject: 'Adam Griffin'
      }
    ]
  }
}

describe('ImageGallery', () => {
  it('when thumbnail clicked lightbox is opened', async () => {
    const wrapper = createWrapper(ImageGallery, options)

    wrapper.setData({
      lightbox: {
        activeImage: '7578',
        active: true
      }
    })

    await wrapper.vm.$nextTick()
    /**
     * make sure clicking the thumbnail makes the call with co
     *
     * */
    wrapper.findAll('.image-thumbnail').at(2).trigger('click')

    await wrapper.vm.$nextTick()

    expect(openLightbox).toHaveBeenCalledWith('7578')
    expect(openLightbox).toBeCalledTimes(1)
    expect(wrapper.find('.lightbox-wrapper').exists()).toBe(true)
  })

  it('closes lightbox when close button clicked', async () => {
    const wrapper = createWrapper(ImageGallery, options)

    wrapper.setData({
      lightbox: {
        activeImage: '7578',
        active: true
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.find('#close-button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.lightbox-wrapper').exists()).toBe(false)
  })

  it('it formats uri: 01', async () => {
    const wrapper = createWrapper(ImageGallery, options)

    const data = await wrapper.vm.imageURI(options.propsData.images[0], 'thumb')

    const prefix = assetUrl || ''
    expect(data).toEqual(
      `${prefix}/photos/archive/thumb/8928.jpg`
    )
  })

  it('disables the previous button when first image is active', async () => {
    const wrapper = createWrapper(ImageGallery, options)

    wrapper.setData({
      lightbox: {
        activeImage: '8928',
        active: true
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.findAll('.image-thumbnail').at(1).trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#previous-button').attributes('disabled')).toBe('disabled')
  })
  it('disables the next button when last image is active', async () => {
    const wrapper = createWrapper(ImageGallery, options)

    wrapper.setData({
      lightbox: {
        activeImage: '7578',
        active: true
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.findAll('.image-thumbnail').at(1).trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#next-button').attributes('disabled')).toBe('disabled')
  })
})
