import AppIcon from '../app-icon'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    name: 'surf'
  }
}

describe('AppFooter', () => {
  it('it is a vue instance', () => {
    const wrapper = createWrapper(AppIcon, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
