import AppIcon from '../app-icon'
import { createWrapper } from '@/app/global/services'

const options = {
  propsData: {
    name: 'test'
  }
}

describe('AppFooter', () => {
  it('it is a vue instance', () => {
    const wrapper = createWrapper(AppIcon, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
