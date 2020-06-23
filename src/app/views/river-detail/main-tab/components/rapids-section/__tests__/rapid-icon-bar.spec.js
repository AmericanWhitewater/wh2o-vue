import { createWrapper } from '@/utils'
import RapidIconBar from '../components/rapid-icon-bar.vue'

const mockStore = {
  state: {
    appGlobalState: {
      appGlobalData: {
        editMode: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  },
  propsData: {
    character: null
  },
  stubs: ['WarningSquare32', 'Login32', 'Repeat32', 'Pedestrian32', 'Logout32']
}

describe('rapid-icon-bar.vue', () => {
  it('shows put in icon when poi is put in', () => {
    options.propsData.character = ['putin']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#put-in-icon').exists()).toBe(true)
  })
  it('shows access point icon when poi is access point', () => {
    options.propsData.character = ['access']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#access-icon').exists()).toBe(true)
  })
  it('shows hazard icon when poi is hazard', () => {
    options.propsData.character = ['hazard']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#hazard-icon').exists()).toBe(true)
  })
  it('shows surf icon when poi is playspot', () => {
    options.propsData.character = ['playspot']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#surf-icon').exists()).toBe(true)
  })
  it('shows portage icon when poi is portage', () => {
    options.propsData.character = ['portage']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#portage-icon').exists()).toBe(true)
  })
  it('shows waterfall icon when poi is waterfall', () => {
    options.propsData.character = ['waterfall']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#waterfall-icon').exists()).toBe(true)
  })
  it('shows take out icon when poi is take out', () => {
    options.propsData.character = ['takeout']
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#take-out-icon').exists()).toBe(true)
  })

  it('hides character icons and shows edit actions when edit mode enabled', () => {
    mockStore.state.appGlobalState.appGlobalData.editMode = true
    const wrapper = createWrapper(RapidIconBar, options)
    expect(wrapper.find('.rapid-icon-bar')).toMatchSnapshot()
    expect(wrapper.find('#character-icons-wrapper').exists()).toBe(false)
  })

  // maybe these emit tests arent needed?
  it('initiates edit process when edit button clicked', async () => {
    const wrapper = createWrapper(RapidIconBar, options)
    wrapper.find('#edit-button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('rapid:edit')).toBeTruthy()
  })
  it('initiates delete process when edit button clicked', async () => {
    const wrapper = createWrapper(RapidIconBar, options)
    wrapper.find('#delete-button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('rapid:delete')).toBeTruthy()
  })
})
