import ArticleCard from '../article-card'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const router = {
  push: jest.fn(() => {
    return {
      catch: jest.fn()
    }
  })

}

const options = {
  propsData: {
    articleId: "123",
    title: 'THIS IS A BOLD TITLE'
  },
  mocks: {
    $router: router
  },
  stubs: ['ArrowRight20']
}

describe('ArticleCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /*
  *
  * This test is commented out because we're routing to the "old" article
  * view instead of the new one provided by vue-app
  *
  it('it routes to article when clicked', async () => {
    const wrapper = createWrapper(ArticleCard, options)

    wrapper.find('.bx--article-card').trigger('click')

    await wrapper.vm.$nextTick()

    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith(`/article/${options.propsData.articleId}`)
  })
*/
  it('it routes to river when clicked', async () => {
    const wrapper = createWrapper(ArticleCard, options)

    wrapper.setProps({
      river: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find('.bx--article-card').trigger('click')

    await wrapper.vm.$nextTick()

    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith(`/river-detail/${options.propsData.articleId}/main`)
  })
  /*
  it('it routes to article when focused and keyboard enter', async () => {
    const wrapper = createWrapper(ArticleCard, options)

    wrapper.find('.bx--article-card').trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith(`/article/${options.propsData.articleId}`)
  })
*/
  it('it routes to river when focused and keyboard enter', async () => {
    const wrapper = createWrapper(ArticleCard, options)

    wrapper.setProps({
      river: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find('.bx--article-card').trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith(`/river-detail/${options.propsData.articleId}/main`)
  })
})
