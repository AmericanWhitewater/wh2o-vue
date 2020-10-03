import NewsTab from '@/app/views/river-detail/news-tab/news-tab.vue'
import ArticleCard from '@/app/global/components/article-card/article-card'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const articles = [{ abstract: '<p>A bill to fully fund the Land and Water Conservation Fund (LWCF) was introduced last month by Colorado Senator Cory Gardener and West Virginia Senator Joe Manchin and cosponsored by Colorado Senator Michael Bennett. If passed the bill would provide $900M annually for projects protecting natural, cultural and historic resources. Existing funding from the LWCF recently enabled the transfer of two important river access points on the Upper Colorado River. The State Bridge and Two Bridges parcels were owned by Eagle County and had been improved - boat ramps, parking, restroom/changing facilities - by the Eagle County Open Space program with coordination and management support from the Bureau of Land Management (BLM). This land transfer will protect public access at these locations in perpetuity.&nbsp;</p>', image: { uri: { thumb: '/resources/images/contents/thumb/34231.jpg', medium: '/resources/images/contents/medium/34231.jpg', big: '/resources/images/contents/34231.jpg' } }, author: 'Hattie Johnson', posted: '2019-05-08 19:17:00', title: 'Land and Water Conservation Fund Secures Access to Upper Colorado River ', contents: "<p>A bill to fully fund the Land and Water Conservation Fund (LWCF) was introduced last month by Colorado Senator Cory Gardener and West Virginia Senator Joe Manchin and cosponsored by Colorado Senator Michael Bennett. If passed the bill would provide $900M annually for projects protecting natural, cultural and historic resources. Existing funding from the LWCF recently enabled the transfer of two important river access points on the Upper Colorado River. The State Bridge and Two Bridges parcels were owned by Eagle County and had been improved - boat ramps, parking, restroom/changing facilities - by the Eagle County Open Space program with coordination and management support from the Bureau of Land Management (BLM). This land transfer will protect public access at these locations in perpetuity.&nbsp;</p><p><br></p><p>The improvement of these sites came from a need recognized by Eagle County to alleviate crowding on river segments upstream of State Bridge. Both sites provide ingress/egress that allow for single day float trips downstream of the BLM's Radium Recreation Area. The sites are within the BLM's Upper Colorado River Special Recreation Management Area. The BLM is currently developing an updated management plan for the area. These access sites are also within the segments identified in the Upper Colorado River Wild and Scenic Alternative Management Plan. American Whitewater has been a stakeholder working to develop this plan since the groups inception in 2008.&nbsp;</p><p><br></p><p>This is also this cool <a href=\"http://blm-egis.maps.arcgis.com/apps/MapJournal/index.html?appid=8c49def5acd34631a1f135880937e84e#\" target=\"_blank\">river guide</a> the county and BLM worked together on. </p><p><br></p><p>Image of Two Bridges Access Area courtesy of River Restoration (riverrestoration.org)</p>", id: 34231 }]

const mockStore = {
  state: {
    userState: {
      userData: {
        data: null
      }
    },
    riverDetailState: {
      newsTabData: {
        error: null,
        data: null,
        loading: null
      },
      alertsData: {
        error: null,
        data: null,
        loading: null
      }
    }
  },
  dispatch: jest.fn()
}

const riverId = '123456789'

const options = {
  mocks: {
    $randomId: jest.fn(() => '123'),
    $titleCase: jest.fn(),
    $store: mockStore,
    $route: {
      params: {
        id: riverId
      }
    },
    stubs: {
      ArticleCard
    }
  }
}

describe('NewsTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when articles loading', () => {
    mockStore.state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(true)
    expect(wrapper.find('.articles-empty').exists()).toBe(false)
    // expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('shows empty block when no articles available', () => {
    mockStore.state.riverDetailState.newsTabData.loading = false
    mockStore.state.riverDetailState.newsTabData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(false)
    expect(wrapper.find('.articles-empty').exists()).toBe(true)
    // expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })
  it('shows loading block when alerts loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(true)
    expect(wrapper.find('.alerts-empty').exists()).toBe(false)
    // expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('shows empty block when no alerts available', () => {
    mockStore.state.riverDetailState.alertsData.loading = false
    mockStore.state.riverDetailState.alertsData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(false)
    expect(wrapper.find('.alerts-empty').exists()).toBe(true)
    // expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('it loads artles and alerts when not previously loaded', async () => {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const wrapper = createWrapper(NewsTab, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[NEWS] FETCH_NEWS_TAB_DATA', riverId
    )
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      '[ALERTS] FETCH_ALERTS_DATA', riverId
    )

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2)
  })

  it('doesnt attempt to load alerts and articles when previously loaded', async () => {
    mockStore.state.riverDetailState.alertsData.data = [{ alert: 'look out' }]
    mockStore.state.riverDetailState.newsTabData.data = articles
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const wrapper = createWrapper(NewsTab, options)
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0)
  })
})
