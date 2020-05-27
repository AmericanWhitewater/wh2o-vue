import { createWrapper } from '@/utils'
import ReachDetail from '../reach-detail.vue'

const options = {
  propsData: {
    reach: {
      id: '123'
    }
  }
}

describe('reach-detail.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(ReachDetail, options)

    expect(wrapper.find('.reach-detail').exists()).toBe(true)
  })
})
