import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'

/**
 * imports all Vuex modules added to the modules dir.
 * Module name comes from file name.
 *
 */

function requireAllModules() {
  const context = require.context('./modules/', true, /\.js$/)
  const obj = {}

  function formatModuleName(module) {
    let moduleName = ''

    /**
     * for multi-word modules.
     *
     * ./process-parts.js = ProcessParts
     *
     * ./some-other-module.js = SomeOtherModule
     */
    if (module.includes('-')) {
      module.split('-').forEach((filename) => {
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

  context.keys().forEach((key) => {
    obj[formatModuleName(key)] = context(key).default
  })

  return obj
}

export const modules = requireAllModules()

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    ...modules
  }
})

export default store
