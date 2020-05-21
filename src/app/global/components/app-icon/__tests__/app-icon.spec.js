import AppIcon from '../app-icon'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    name: 'surf'
  }
}

describe('AppFooter', () => {
  it('exists', () => {
    const wrapper = createWrapper(AppIcon, options)
    expect(wrapper.find('.app-icon').exists()).toBe(true)
  })
})
