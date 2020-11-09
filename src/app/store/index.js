import Vue from 'vue'
import Vuex from 'vuex'

import { appGlobalState } from '@/app/global/state'
import { newsPageState } from '@/app/views/news-page'
import { riverDetailState } from '@/app/views/river-detail'
import { userState } from '@/app/views/user'

/**
 * imports all Vuex modules added to the modules dir.
 * Module name comes from file name.
 *
 */

function requireAllModules () {
  var context = require.context('./modules/', true, /\.js$/)
  var obj = {}

  function formatModuleName (module) {
    let moduleName = ''

    /**
     * for multi-word modules.
     *
     * ./process-parts.js = ProcessParts
     *
     * ./some-other-module.js = SomeOtherModule
     */
    if (module.includes('-')) {
      module.split('-').forEach(filename => {
        let name = filename
        name = name.replace('.js', '')
        name = name.replace('./', '')
        name = name.charAt(0).toUpperCase() + name.slice(1)
        moduleName += name
      })
    } else {
      moduleName = module.slice(0, -3)
      moduleName = moduleName.replace(/[^a-zA-Z ]/g, '')
      moduleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
    }

    return moduleName
  }

  context.keys().forEach(function (key) {
    obj[formatModuleName(key)] = context(key).default
  })

  return obj
}

export const modules = requireAllModules()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...modules,
    appGlobalState,
    newsPageState,
    riverDetailState,
    // riverIndexState,
    userState
  }
})
