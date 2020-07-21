import { createWrapper } from '@/utils'
import TablePagination from '../table-pagination.vue'

const options = {
  stubs: ['CaretLeft16', 'CaretRight16']
}

describe('table-pagination.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(TablePagination, options)

    expect(wrapper.find('.table-pagination').exists()).toBe(true)
  })
})
