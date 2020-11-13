import RiverDescription from '../river-description.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    Global: {
      data: null,
      error: null,
      editMode: null,
      loading: null
    },
    RiverDetail: {
      error: null,
      data: null,
      loading: null
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
    mockStore.state.RiverDetail.loading = true

    const wrapper = createWrapper(RiverDescription, options)
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  it('shows skeleton text when error', () => {
    mockStore.state.RiverDetail.loading = false
    mockStore.state.RiverDetail.error = true
    const wrapper = createWrapper(RiverDescription, options)
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  test.todo('removes inline css and class tags from ugc. standardizes html.')
})
