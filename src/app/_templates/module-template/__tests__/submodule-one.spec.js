import { createWrapper } from '@/utils'
import SubmoduleOne from '../submodule-one/submodule-one'

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

describe('submodule-one.vue', () => {
  it('created: loads data', async () => {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const wrapper = createWrapper(SubmoduleOne, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[SUBMODULE_ONE] FETCH_SUBMODULE_ONE_DATA'
    )
  })
})
