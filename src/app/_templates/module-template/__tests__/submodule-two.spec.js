import { createWrapper } from '@/utils'
import SubmoduleTwo from '../submodule-two/submodule-two'

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

describe('submodule-two.vue', () => {
  it('created: loads data', async () => {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const wrapper = createWrapper(SubmoduleTwo, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[SUBMODULE_TWO] FETCH_SUBMODULE_TWO_DATA'
    )
  })
})
