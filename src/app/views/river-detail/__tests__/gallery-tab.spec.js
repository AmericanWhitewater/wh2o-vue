import GalleryTab from '@/app/views/river-detail/components/gallery-tab/gallery-tab.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    User: {
      data: null
    },
    RiverGallery: {
      error: null,
      data: null,
      loading: null,
      pagination: {}
    },
    RiverRapids: {
      data: null
    }
  },
  getters: {
    media: () => null
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
  stubs: ['image-update-modal', 'table-pagination', 'image-gallery']
}

describe('GalleryTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('shows loading block when loading', async () => {
    mockStore.state.RiverGallery.loading = true

    const wrapper = createWrapper(GalleryTab, options)

    wrapper.setData({
      formattedData: null
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('should load media and rapids not previously loaded', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(GalleryTab, options)
    wrapper.vm.loadMedia()

    expect(mockStore.dispatch).toBeCalledTimes(3)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(3,
      'RiverGallery/getProperty',
      {
        id: '123456789'
      }
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, 'RiverRapids/getProperty', '123456789')
  })
})
