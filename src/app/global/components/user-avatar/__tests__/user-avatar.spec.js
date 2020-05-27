import { createWrapper } from '@/utils'
import UserAvatar from '../user-avatar.vue'

describe('user-avatar.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserAvatar, {
      propsData: {
        username: 'churchBro'
      }
    })

    expect(wrapper.find('.user-avatar').exists()).toBe(true)
  })
})
