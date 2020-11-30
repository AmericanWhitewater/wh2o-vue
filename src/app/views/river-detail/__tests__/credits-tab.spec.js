import CreditsTab from '@/app/views/river-detail/components/credits-tab.vue'
import { createWrapper } from '@/utils'

const mockRoute = {
  params: {
    id: '123'
  }
}

const mockStore = {
  state: {
    User: {
      data: null
    },
    RiverCredits: {
      error: null,
      data: null,
      loading: null
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $route: mockRoute,
    $store: mockStore
  }
}

test.todo('shows table of contributors.')

describe('CreditsTab', () => {
  it('shows loading block when loading', () => {
    mockStore.state.RiverCredits.loading = true
    const wrapper = createWrapper(CreditsTab, options)

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.RiverCredits.loading = false
    mockStore.state.RiverCredits.error = true
    const wrapper = createWrapper(CreditsTab, options)

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
