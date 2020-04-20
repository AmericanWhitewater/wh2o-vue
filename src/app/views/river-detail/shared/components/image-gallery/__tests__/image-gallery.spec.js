import ImageGallery from '../image-gallery.vue'
import { createWrapper } from '@/app/global/services'

const openLightbox = jest.fn()

const image = {
  uri: {
    thumb: '/photos/archive/medium/7578.jpg',
    medium: null,
    big: null
  }
}

const options = {
  stubs: ['Download20', 'Maximize16'],
  methods: {
    openLightbox
  },
  propsData: {
    images: [{
      image,
      id: '7578',
      author: 'Bryan Mills',
      caption: 'Finish Line',
      description: 'This rapid is a sweet 10 ft. boof (if you hit it right)',
      photo_date: null,
      poi_name: 'Finish Line',
      poi_id: '107035',
      subject: 'Adam Griffin'
    }]
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
    wrapper.findAll('.image-thumbnail').at(0).trigger('click')

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

    const data = await wrapper.vm.formatURI(image.uri, 'thumb')

    expect(data).toEqual('https://americanwhitewater.org/photos/archive/medium/7578.jpg')
  })
})
