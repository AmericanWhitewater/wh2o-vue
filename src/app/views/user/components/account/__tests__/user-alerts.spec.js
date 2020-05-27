import { createWrapper } from '@/utils'
import UserAlerts from '../user-alerts.vue'

describe('user-alerts.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserAlerts)

    expect(wrapper.find('.user-alerts').exists()).toBe(true)
  })
})
