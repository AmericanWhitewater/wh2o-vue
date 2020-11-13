import BetaBox from '@/app/views/river-detail/main-tab/components/beta-box/beta-box'
import { createWrapper } from '@/utils'

const river = {
  error: null,
  data: null,
  loading: null
}

const mockStore = {
  state: {
    Global: {
      editMode: null
    },
    RiverDetail: river,
    RiverGages: {

      // data: [{ rc: 0.38333333333333325, epoch: 1587984255.846007, gauge_reading: 1.83, gauge_metric: 8, range_comment: null, class: 'med', excluded: false, url: '/content/Gauge2/detail/id/4248', rmin: 1.6, rmax: 2.2, gauge: { name: 'VALLECITO CREEK NEAR BAYFIELD, CO.', id: '4248' }, updated: 147007.153993, last_gauge_reading: 1.83, last_gauge_updated: 3584, gauge_perfect: false, adjusted_reach_class: null }]

    },
    GageMetrics: {
      data: [{ name: 'Flow', unit: 'cfs', format: '%4.0f', id: '2', shortkey: 'flow', gauge: { id: '2' } }]
    }
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $titleCase: jest.fn()
  }
}

// const gagesData = [{ rc: 0.38333333333333325, epoch: 1587984255.846007, gauge_reading: 1.83, gauge_metric: 8, range_comment: null, class: 'med', excluded: false, url: '/content/Gauge2/detail/id/4248', rmin: 1.6, rmax: 2.2, gauge: { name: 'VALLECITO CREEK NEAR BAYFIELD, CO.', id: '4248' }, updated: 147007.153993, last_gauge_reading: 1.83, last_gauge_updated: 3584, gauge_perfect: false, adjusted_reach_class: null }]

const tdClasses = ['.river-class', '.river-avggradient', '.river-flow-rate', '.flow-range', '.river-gages']

describe('FlowTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles empty states', () => {
    const wrapper = createWrapper(BetaBox, options)

    tdClasses.forEach(td => {
      expect(wrapper.find(td).text()).toEqual('n/a')
      expect(wrapper.find(`${td} .bx--skeleton__text`).exists()).toBe(false)
    })
  })

  it('handles loading states', () => {
    river.loading = true

    const wrapper = createWrapper(BetaBox, options)

    tdClasses.forEach(td => {
      expect(wrapper.find(td).text()).not.toEqual('n/a')
      expect(wrapper.find(`${td} .bx--skeleton__text`).exists()).toBe(true)
    })
  })

  it('shows below recommended tag when flow rate too low', () => {
    river.loading = false
    mockStore.state.RiverGages.data = [{
      rmin: 50,
      rmax: 100,
      last_gauge_reading: 25,
      gauge_metric: '2',
      gauge: { id: '2' }
    }]

    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.findAll('.cv-tag').length).toBe(1)
    expect(wrapper.find('.cv-tag .bx--tag__label').text()).toBe('Below Recommended')
  })
  it('shows runnable tag when flow rate too low', () => {
    river.loading = false
    mockStore.state.RiverGages.data = [{
      rmin: 50,
      rmax: 100,
      last_gauge_reading: 75,
      gauge_metric: '2',
      gauge: { id: '2' }
    }]

    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.findAll('.cv-tag').length).toBe(1)
    expect(wrapper.find('.cv-tag .bx--tag__label').text()).toBe('Runnable')
  })
  it('shows above recommended tag when flow rate too low', () => {
    river.loading = false
    mockStore.state.RiverGages.data = [{
      rmin: 50,
      rmax: 100,
      last_gauge_reading: 150,
      gauge_metric: '2',
      gauge: { id: '2' }
    }]

    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.findAll('.cv-tag').length).toBe(1)
    expect(wrapper.find('.cv-tag .bx--tag__label').text()).toBe('Above Recommended')
  })

  it('handles empty flow range state', () => {
    mockStore.state.RiverGages.data = [{
      rmin: null,
      rmax: null,
      last_gauge_reading: 150,
      gauge_metric: '2',
      gauge: { id: '2' }
    }]

    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.findAll('.flow-range').length).toBe(1)
    expect(wrapper.find('.flow-range').text()).toBe('n/a')
  })
})
