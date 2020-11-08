import Locales from '../modules/locales'

const commit = jest.fn()

describe('Locales', () => {
  it('sets user selected locale', async () => {
    await Locales.actions.setLocale({ commit }, 'English')

    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_LOCALE', 'English')
  })
})
