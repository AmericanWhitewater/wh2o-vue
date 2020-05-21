import { createWrapper } from '@/utils'
import UserRegister from '../user-register.vue'

describe('user-register.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserRegister)

    expect(wrapper.find('.user-register').exists()).toBe(true)
  })
})
