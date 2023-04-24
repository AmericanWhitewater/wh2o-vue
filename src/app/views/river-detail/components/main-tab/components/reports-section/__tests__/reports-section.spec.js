import ReportsSection from '../reports-section.vue'
import { createWrapper } from '@/utils'

jest.mock('maplibre-gl/dist/maplibre-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    RiverReports: {
      error: null,
      data: null,
      loading: null
    },
    User: {
      data: null
    }
  },
  dispatch: jest.fn()
}

const reachId = '123'

const options = {
  mocks: {
    $randomId: jest.fn(() => '123'),
    $store: mockStore,
    $route: {
      params: {
        id: reachId
      }
    }
  },
  stubs: ['report-preview']
}

describe('ReportsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when loading', async () => {
    const wrapper = createWrapper(ReportsSection, options)

    await wrapper.setData({ loading: true })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', async () => {
    const wrapper = createWrapper(ReportsSection, options)
    await wrapper.setData({ error: true, loading: false })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows empty state when no reports present', async () => {
    const wrapper = createWrapper(ReportsSection, options)
    await wrapper.setData({ reports: [], loading: false, error: false })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })
})
