import { createWrapper } from '@/utils'
import UserForgot from '../user-forgot.vue'

describe('user-forgot.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserForgot)

    expect(wrapper.find('.user-forgot').exists()).toBe(true)
  })
})
