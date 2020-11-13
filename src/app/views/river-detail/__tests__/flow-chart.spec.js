import { createWrapper } from '@/utils'
import FlowChart from '@/app/views/river-detail/components/flow-tab/components/flow-chart/flow-chart.vue'
import { buildChart } from '@/app/views/river-detail/components/flow-tab/components/flow-chart/build-chart.js'

jest.mock('@/app/views/river-detail/components/flow-tab/components/flow-chart/build-chart.js')

const mockStore = {
  state: {
    GageMetrics: {
      data: [{ name: 'Flow', unit: 'cfs', format: '%4.0f', id: '2', shortkey: 'flow' }, { name: 'Feet Stage', unit: 'ft', format: '%3.2f', id: '8', shortkey: 'stage' }, { name: 'Inches Stage', unit: 'inches', format: '%4.0f', id: '15', shortkey: 'in' }, { name: 'Percent', unit: '%', format: '%3.1f', id: '14', shortkey: 'perc' }, { name: 'Metric Volumentric Flow ', unit: 'cm/s', format: '%3.1f', id: '13', shortkey: 'mflow' }, { name: 'Meters Stage', unit: 'm', format: '%3.2f', id: '12', shortkey: 'mstag' }, { name: 'Alt. Flow', unit: 'cfs', format: '%4.0f', id: '10', shortkey: 'bflow' }, { name: 'Alt. Stage in Feet', unit: 'ft', format: '%3.2f', id: '11', shortkey: 'bstag' }, { name: 'Temperature', unit: '? F', format: '%3.0f', id: '9', shortkey: 'temp' }, { name: 'Precip. in 15m', unit: 'in/15min', format: '%2.2f', id: '4', shortkey: 'pc15m' }, { name: 'Precip. in 6h', unit: 'in/6h', format: '%2.1f', id: '6', shortkey: 'pc6h' }, { name: 'Precip. in 12h', unit: 'in/12h', format: '%2.1f', id: '3', shortkey: 'pc12h' }, { name: 'Precip. in 24h', unit: 'in/24h', format: '%2.1f', id: '5', shortkey: 'pc24h' }, { name: 'Yearly Precip.', unit: 'in/yr', format: '%3.1f', id: '7', shortkey: 'pccum' }, { name: 'Status', unit: 'r.c.', format: '%1.1f', id: '1', shortkey: 'corr' }]
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  },
  propsData: {
    readings: [{ gauge_id: 4139, metric: 2, nv: 1588122880, reading: '1130', updated: 1588122880, data: null, id: 17777068153507 }, { gauge_id: 4139, metric: 2, nv: 1588126464, reading: '1120', updated: 1588126464, data: null, id: 17777068153957 }, { gauge_id: 4139, metric: 2, nv: 1588130048, reading: '1110', updated: 1588130048, data: null, id: 17777068154407 }, { gauge_id: 4139, metric: 2, nv: 1588133632, reading: '1110', updated: 1588133632, data: null, id: 17777068154857 }, { gauge_id: 4139, metric: 2, nv: 1588137216, reading: '1110', updated: 1588137216, data: null, id: 17777068155307 }, { gauge_id: 4139, metric: 2, nv: 1588140800, reading: '1110', updated: 1588140800, data: null, id: 17777068155757 }, { gauge_id: 4139, metric: 2, nv: 1588144384, reading: '1100', updated: 1588144384, data: null, id: 17777068156207 }, { gauge_id: 4139, metric: 2, nv: 1588148096, reading: '1100', updated: 1588148096, data: null, id: 17777068156657 }, { gauge_id: 4139, metric: 2, nv: 1588151680, reading: '1100', updated: 1588151680, data: null, id: 17777068157107 }, { gauge_id: 4139, metric: 2, nv: 1588155264, reading: '1100', updated: 1588155264, data: null, id: 17777068157557 }, { gauge_id: 4139, metric: 2, nv: 1588158848, reading: '1110', updated: 1588158848, data: null, id: 17777068158007 }, { gauge_id: 4139, metric: 2, nv: 1588162432, reading: '1130', updated: 1588162432, data: null, id: 17777068158457 }, { gauge_id: 4139, metric: 2, nv: 1588166016, reading: '1150', updated: 1588166016, data: null, id: 17777068158907 }, { gauge_id: 4139, metric: 2, nv: 1588169600, reading: '1170', updated: 1588169600, data: null, id: 17777068159357 }, { gauge_id: 4139, metric: 2, nv: 1588173184, reading: '1190', updated: 1588173184, data: null, id: 17777068159807 }, { gauge_id: 4139, metric: 2, nv: 1588176896, reading: '1220', updated: 1588176896, data: null, id: 17777068160257 }, { gauge_id: 4139, metric: 2, nv: 1588180480, reading: '1250', updated: 1588180480, data: null, id: 17777068160707 }, { gauge_id: 4139, metric: 2, nv: 1588184064, reading: '1270', updated: 1588184064, data: null, id: 17777068161157 }, { gauge_id: 4139, metric: 2, nv: 1588187648, reading: '1300', updated: 1588187648, data: null, id: 17777068161607 }, { gauge_id: 4139, metric: 2, nv: 1588191232, reading: '1320', updated: 1588191232, data: null, id: 17777068162057 }, { gauge_id: 4139, metric: 2, nv: 1588194816, reading: '1320', updated: 1588194816, data: null, id: 17777068162507 }, { gauge_id: 4139, metric: 2, nv: 1588198400, reading: '1320', updated: 1588198400, data: null, id: 17777068162957 }, { gauge_id: 4139, metric: 2, nv: 1588201984, reading: '1310', updated: 1588201984, data: null, id: 17777068163407 }],
    gages: [{ rc: 0.30983333333333335, epoch: 1587986047.114834, gauge_reading: 919, gauge_metric: 2, range_comment: 'Low-preferred range (Flows based on 2012 WFET Basin Report). ', class: 'med', excluded: false, url: '/content/Gauge2/detail/id/4139', rmin: 700, rmax: 2500, gauge: { name: 'COLORADO RIVER NEAR KREMMLING, CO', id: '4139' }, updated: 220260.885166, last_gauge_reading: 923, last_gauge_updated: 3584, gauge_perfect: false, adjusted_reach_class: null }]
  },
  stubs: ['canvas']
}

describe('flow-chart.vue', () => {
  it('it builds on load', async () => {
    const wrapper = createWrapper(FlowChart, options)
    await wrapper.vm.$nextTick()
    expect(buildChart).toBeCalledTimes(1)
  })
})
