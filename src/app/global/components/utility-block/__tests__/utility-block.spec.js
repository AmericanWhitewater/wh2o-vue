import { createWrapper } from '@/utils'
import UtilityBlock from '../utility-block.vue'

describe('utility-block.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UtilityBlock)

    expect(wrapper.find('#utility-block').exists()).toBe(true)
  })
})
