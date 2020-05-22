import { createWrapper } from '@/utils'
import TablePagination from '../table-pagination.vue'

describe('table-pagination.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(TablePagination)

    expect(wrapper.find('.table-pagination').exists()).toBe(true)
  })
})
