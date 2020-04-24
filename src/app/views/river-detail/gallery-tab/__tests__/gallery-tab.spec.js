import GalleryTab from '@/app/views/river-detail/gallery-tab/gallery-tab.vue'
import { createWrapper } from '@/utils'

/**
 *
 * @note snapshot testing on components
 * which use the FileUploader or any child component
 * which generates random id/key/class/attr in html
 * markup will fail on every test.
 *
 */

const mockStore = {
  state: {
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
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore,
    $route: {
      params: {
        id: '123456789'
      }
    }
  },
  stubs: ['media-upload-form']
}

describe('GalleryTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('shows loading block when loading', async () => {
    mockStore.state.riverDetailState.galleryData.loading = true

    const wrapper = createWrapper(GalleryTab, options)

    wrapper.setData({
      formattedData: null
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.galleryData.loading = false
    mockStore.state.riverDetailState.galleryData.data = false
    mockStore.state.riverDetailState.galleryData.error = true

    const wrapper = createWrapper(GalleryTab, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows no results block when there are no photos', () => {
    mockStore.state.riverDetailState.galleryData.loading = false
    mockStore.state.riverDetailState.galleryData.error = true
    mockStore.state.riverDetailState.galleryData.data = []

    const wrapper = createWrapper(GalleryTab, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })

  it('loads media when media not previously loaded', async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(GalleryTab, options)

    expect(mockStore.dispatch).toBeCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[GALLERY] FETCH_GALLERY_DATA',
      123456789
    )
  })
})
