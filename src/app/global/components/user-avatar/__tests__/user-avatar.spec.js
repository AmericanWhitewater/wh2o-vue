import { createWrapper } from '@/utils'
import UserAvatar from '../user-avatar.vue'

describe('user-avatar.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserAvatar, {
      propsData: {
        user: {
          name: 'churchBro',
          image: { uri: { big: null, medium: null, thumb: null } },
        }
      }
    })

    expect(wrapper.find('.user-avatar').exists()).toBe(true)
  })
})
