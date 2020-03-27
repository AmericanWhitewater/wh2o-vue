import GalleryTab from '@/app/views/river-detail/gallery-tab/gallery-tab.vue'
import { createWrapper } from '@/app/global/services'

/**
 *
 * @note snapshot testing on components
 * which use the FileUploader or any child component
 * which generates random id/key/class/attr in html
 * markup will fail on every test.
 *
 */

const state = {
  userState: {
    userData: {
      data: null
    }
  },
  riverDetailState: {
    galleryData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

const route = {
  params: {
    id: '357'
  }
}

describe('GalleryTab', () => {
  it('shows loading block when loading', async () => {
    state.riverDetailState.galleryData.loading = true

    const wrapper = createWrapper(GalleryTab, state, route)

    wrapper.setData({
      formattedData: null
    })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.galleryData.loading = false
    state.riverDetailState.galleryData.error = true

    const wrapper = createWrapper(GalleryTab, state, route)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows no results block when error', () => {
    state.riverDetailState.galleryData.loading = false
    state.riverDetailState.galleryData.error = true
    state.riverDetailState.galleryData.data = []

    const wrapper = createWrapper(GalleryTab, state, route)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })
})
