import RiverDescription from '../river-description.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        error: null,
        data: null,
        loading: null
      }
    },
    appGlobalState: {
      appGlobalData: {
        data: null,
        error: null,
        editMode: null,
        loading: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: {
      params: {
        id: '123456789'
      }
    }
  }
}

describe('RiverDescription', () => {
  it('shows skeleton text when loading', () => {
    mockStore.state.riverDetailState.riverDetailData.loading = true

    const wrapper = createWrapper(RiverDescription, options)
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  it('shows skeleton text when error', () => {
    mockStore.state.riverDetailState.riverDetailData.loading = false
    mockStore.state.riverDetailState.riverDetailData.error = true
    const wrapper = createWrapper(RiverDescription, options)
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  test.todo('removes inline css and class tags from ugc. standardizes html.')
})
