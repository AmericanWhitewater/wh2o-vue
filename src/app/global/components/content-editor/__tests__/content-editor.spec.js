import ContentEditor from '../content-editor'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    content: ''
  }
}

describe('ContentEditor', () => {
  it('exists', () => {
    const wrapper = createWrapper(ContentEditor, options)
    expect(wrapper.find('.content-editor').exists()).toBe(true)
  })
})
