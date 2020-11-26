import GalleryTab from '@/app/views/river-detail/components/gallery-tab.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

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
    User: {
      data: null
    },
    RiverGallery: {
      error: null,
      data: null,
      loading: null,
      pagination: {
        total: 0
      }
    },
    RiverRapids: {
      data: null
    }
  },
  getters: {
    'RiverGallery/media': null
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
  stubs: ['media-upload-form', 'media-upload-modal', 'table-pagination', 'image-gallery']
}

describe('GalleryTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('shows loading block when loading', async () => {
    mockStore.state.RiverGallery.loading = true

    const wrapper = createWrapper(GalleryTab, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
    mockStore.state.RiverGallery.loading = false
  })

  it('shows no results block when there are no photos', async () => {
    const wrapper = createWrapper(GalleryTab, options)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })

  it('should load media and rapids not previously loaded', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(GalleryTab, options)
    wrapper.vm.loadMedia()

    expect(mockStore.dispatch).toBeCalledTimes(2)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      'RiverGallery/getProperty',
      {
        page: 1,
        per_page: 10,
        reach_id: '123456789'
      }
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, 'RiverRapids/getProperty', '123456789')
  })
})
