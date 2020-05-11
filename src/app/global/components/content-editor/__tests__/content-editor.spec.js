import ContentEditor from '../content-editor'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    content: ''
  }
}

describe('ContentEditor', () => {
  it('it is a vue instance', () => {
    const wrapper = createWrapper(ContentEditor, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
