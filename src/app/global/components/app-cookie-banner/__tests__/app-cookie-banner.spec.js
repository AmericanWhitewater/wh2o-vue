import { createWrapper } from '@/app/global/services'
import AppCookieBanner from '../app-cookie-banner'

const options = {
  stubs: ['router-link']
}

describe('app-cookie-banner.vue', () => {
  it('hides when dismissed', async () => {
    const wrapper = createWrapper(AppCookieBanner, options)
    wrapper.find('#close').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.app-cookie-banner').exists()).toBe(false)
  })
})
