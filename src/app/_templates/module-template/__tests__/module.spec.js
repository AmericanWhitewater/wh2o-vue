import { createWrapper } from '@/utils'
import Module from '../module-template'

const mockStore = {
  state: {
    moduleState: {
      moduleData: {
        data: null,
        loading: null,
        error: null
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('module-template.vue', () => {
  it('created: loads data', async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(Module, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[MODULE] FETCH_MODULE_DATA'
    )
  })
})
