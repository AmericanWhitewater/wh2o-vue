import { createWrapper } from '@/utils'
import AccessDetail from '../access-detail.vue'

const options = {
  propsData: {
    access: {
      river: '',
      section: '',
      coords: ['', '']
    }
  }
}
describe('access-detail.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(AccessDetail, options)

    expect(wrapper.find('.access-detail').exists()).toBe(true)
  })
})
