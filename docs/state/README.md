# State Management

`src/app/app-state.js`

We use [Vuex](https://vuex.vuejs.org/) for managing the applications state. Each Vuex submodule is broken down mostly on a per-view basis into tier two states, and each of them with their own modules. 

```js
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appGlobalState,
    gageDetailState,
    newsPageState,
    riverDetailState,
    riverIndexState,
    riverSearchState,
    userState
  }
})

```

Each module shares core state model, mutations and actions. All are easily extendible for things like pagination. State should 

```js
// @/app/\_templates/module-template/shared/state/module-data.js

import { reflectKeys } from '@/app/global/services'
import { fetchModuleData } from '../services'

const initialState = {
  data: null,
  error: null,
  loading: false
}

/**
 * prefix each mutation with the module name
 * for more granular history in vue devtools.
 *
 */
const namespacedPrefix = '[MODULE]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  [DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
  },

  [DATA_RESET] (state) {
    Object.assign(state, ...initialState)
  }
}

export const moduleActions = reflectKeys(
  ['FETCH_MODULE_DATA'],
  namespacedPrefix
)

/**
 * 
 * All API calls are made with Vuex actions
 * 
 */

const actions = {
  async [moduleActions.FETCH_MODULE_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchModuleData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
```

Then in the component you can access the state in the computed property and dispatch actions.

```js
computed: {
  ...mapState({
    loading: state => state.moduleState.moduledata.loading,
    data: state => state.moduleState.moduledata.data,
    error: state => state.moduleState.moduledata.error
  })
},
created () {
  this.$store.dispatch(moduleActions.FETCH_MODULE_DATA)
}
```
