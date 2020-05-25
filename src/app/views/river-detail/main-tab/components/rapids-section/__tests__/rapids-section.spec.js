import RapidsSection from '../rapids-section.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    riverDetailState: {
      rapidsData: {
        error: null,
        data: null,
        loading: null
      }
    },
    riverIndexState: {
      riverIndexData: {
      }
    }
  },
  dispatch: jest.fn()
}

const rapids = [{ approximate: true, character: ['waterfall'], description: '<p>\r\n\tAfter a quick warm-up you&#39;re in the gorge. This rapid is not easy to scout but from the top of the wall, you can see most of the rapid except for the crux move. At low-med levels, go right of the big rock that sits right-of-center, with left angle. At upper medium flows, 1600cfs, you can boof straight over this rock. Carry speed.&nbsp;</p>\r\n', difficulty: 'IV', distance: 0.3, id: '102547', name: 'Mandatory Thrashing', photo: { image: { uri: { big: '/photos/archive/890737.jpg', medium: '/photos/archive/medium/890737.jpg' } } } }, { approximate: true, character: ['hazard', 'playspot'], description: '<p>\r\n\tLook for the Red Wall and then stay off it</p>\r\n', difficulty: 'IV', distance: 1.5, id: '102548', name: 'Red Wall', photo: { image: { uri: { big: '/photos/archive/885498.jpg', medium: '/photos/archive/medium/885498.jpg' } } } }]

const mockRoute = {
  params: {
    id: '123'
  }
}
const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute,
    $sanitize: jest.fn(),
    $replaceText: jest.fn()
  },
  stubs: ['rapid-item', 'nwi-map-editor']
}
describe('RapidsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.rapidsData.loading = true
    const wrapper = createWrapper(RapidsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.rapidsData.loading = false
    mockStore.state.riverDetailState.rapidsData.error = true
    const wrapper = createWrapper(RapidsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows empty state when there are no rapids', () => {
    mockStore.state.riverDetailState.rapidsData.loading = false
    mockStore.state.riverDetailState.rapidsData.error = false
    mockStore.state.riverDetailState.rapidsData.data = []

    const wrapper = createWrapper(RapidsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })

  it('loads rapids when in view', async () => {
    /**
     * @note cannot simulate scroll event, treat as created lifecycle
     */

    const wrapper = createWrapper(RapidsSection, options)

    wrapper.vm.loadRapids()

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[RAPIDS] FETCH_RAPIDS_DATA', '123'
    )
  })

  it('hides loader and empty state blocks when rapids available', () => {
    mockStore.state.riverDetailState.rapidsData.data = rapids
    const wrapper = createWrapper(RapidsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('disables the new rapid button while rapids are loading', () => {
    mockStore.state.riverDetailState.rapidsData.loading = true
    const wrapper = createWrapper(RapidsSection, options)
    expect(wrapper.find('#new-rapid').attributes('disabled')).toBe('disabled')
  })
})
