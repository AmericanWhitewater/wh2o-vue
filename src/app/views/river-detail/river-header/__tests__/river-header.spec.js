import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CarbonComponents from '@carbon/vue'
import RiverHeader from '../river-header.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(CarbonComponents)

const store = new Vuex.Store({
  state: {
    appGlobalState: {
      appGlobalData: {
        editMode: false
      }
    },
    userState: {
      userData: {
        data: false
      }
    }
  },
  getters: {
    userIsAdmin: state => {
      return true
    }
  }
})

const riverName = 'River Name'
const riverSection = 'River Section'

const wrapper = shallowMount(RiverHeader, {
  store,
  localVue,
  propsData: {
    name: riverName,
    section: riverSection
  }
})

describe('RiverHeader.vue', () => {
  it('renders props.name when passed', () => {
    expect(wrapper.find('h4').text()).toMatch(riverName)
  })
  it('renders props.section when passed', () => {
    expect(wrapper.find('h1').text()).toMatch(riverSection)
  })
})
