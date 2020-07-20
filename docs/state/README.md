# State Management

`src/app/app-state.js`

We use [Vuex](https://vuex.vuejs.org/) for managing the applications state. Each Vuex submodule is broken down mostly on a per-view basis into tier two states, and each of them with their own modules.

```js
// src/app/app-state.js

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

For example, the following are submodules of riverDetailState:

```js
// src/app/views/river-detail/river-detail-state.js

export default {
  modules: {
    accidentsData,
    alertsData,
    bookmarksData,
    commentsData,
    creditsData,
    gageMetricsData,
    gageReadingsData,
    gageSourceData,
    galleryData,
    mapData,
    newsTabData,
    rapidsData,
    reachGagesData,
    riverDetailData
  }
}
```

## Model

Each Vuex submodule shares the same core state model of data, error, and loading. A mutation should only modify state. Directly changing the state is considered bad practice.

```js
const initialState = {
  data: null,
  error: null,
  loading: false
}
```

Then in our component templates, we can easily provide the user with operation feedback. Here's what a piece of the template could look like for loading an array of images.

```vue
<template v-if="loading">
  loading images
</template>
<template v-else-if="data">
  <div v-if="data.length">
    <img v-for="(img, index) in data" :key="index" :src="img.src" />
  </div>
  <div v-else>
    no images
  </div>
</template>
<template v-else>
  error
  <template></template
></template>
```

## Mutations

```js
// @/app/_templates/module-template/shared/state/module-data.js

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
```

## Actions

```js
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
```

Then in the component, we can access the state in the computed property and dispatch actions.

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

## Considerations 

This is not the most DRY strategy. @drewalth has put together a proof-of-concept for a more straight forward Vuex store. Consider refactoring when appropriate.

- [`drewalth/vuex-store-poc`](https://github.com/drewalth/vuex-store-poc)