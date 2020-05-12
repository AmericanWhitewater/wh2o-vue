import { createWrapper } from '@/utils'
import NwiFullscreenToggle from '../components/nwi-fullscreen-toggle.vue'

const options = {
  propsData: {
    fullscreenTarget: 'target'
  },
  stubs: ['Maximize16', 'Minimize16']
}

describe('nwi-fullscreen-toggle.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('enables fullscreen when trigger is clicked', async () => {
    const wrapper = createWrapper(NwiFullscreenToggle, options)

    wrapper.find('#fullscreen-trigger').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('minimize16-stub').exists()).toBe(true)
    expect(wrapper.find('maximize16-stub').exists()).toBe(false)
  })

  it('enables fullscreen when trigger is focused and keyboard enter', async () => {
    const wrapper = createWrapper(NwiFullscreenToggle, options)

    wrapper.find('#fullscreen-trigger').trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('minimize16-stub').exists()).toBe(true)
    expect(wrapper.find('maximize16-stub').exists()).toBe(false)
  })

  it('disables fullscreen when trigger is clicked', async () => {
    const wrapper = createWrapper(NwiFullscreenToggle, options)

    wrapper.find('#fullscreen-trigger').trigger('click')

    await wrapper.vm.$nextTick()

    wrapper.find('#fullscreen-trigger').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('minimize16-stub').exists()).toBe(false)
    expect(wrapper.find('maximize16-stub').exists()).toBe(true)
  })

  it('disables fullscreen when trigger is focused and keyboard enter ', async () => {
    const wrapper = createWrapper(NwiFullscreenToggle, options)

    wrapper.find('#fullscreen-trigger').trigger('kaydown.enter')

    await wrapper.vm.$nextTick()

    wrapper.find('#fullscreen-trigger').trigger('kaydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('minimize16-stub').exists()).toBe(false)
    expect(wrapper.find('maximize16-stub').exists()).toBe(true)
  })
})
