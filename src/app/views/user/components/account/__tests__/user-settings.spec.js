import { createWrapper } from '@/utils'
import UserSettings from '../user-settings.vue'

describe('user-settings.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserSettings)

    expect(wrapper.find('.user-settings').exists()).toBe(true)
  })
})
