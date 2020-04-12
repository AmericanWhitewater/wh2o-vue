import RapidsSection from '../rapids-section.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      rapidsData: {
        error: null,
        data: null,
        loading: null
      }
    }
  },
  dispatch: jest.fn()
}

const mockRoute = {
  params: {
    id: '123'
  }
}
const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  }
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
})
