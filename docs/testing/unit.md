# Unit Testing

We use [Jest](https://jestjs.io/) and [@vue/test-utils](https://vue-test-utils.vuejs.org/) for our unit testing. Unit tests help us be sure that our components work as intended.

## Factory

A factory function is available to help us reduce boilerplate and write cleaner tests.

```js
// src/utils/unit-test-helpers/create-wrapper.js

const createWrapper = (component, options = {}) => {
  const localVue = createLocalVue()
  localVue.use(CarbonComponents)
  localVue.directive('view', view)

  const wrapper = mount(component, {
    localVue,
    stubs: {
      Layout,
      LayoutTwoThirds,
      LayoutFullWidth,
      LayoutFiftyFifty
    },
    ...options
  })
  return wrapper
}
```

In the function above, we pass in the component we want to test as our first argument. Then we can provide any other options like mocks or stubs.

## Example Mocks

### $route

Here is an example of testing a component that uses the `$route` global.

```js
const options = {
  mocks: {
    $route: {
      params: {
        id: '123
      },
      path: '/foo-bar'
    }
  }
}

const wrapper = createWrapper(MyComponent, options)
```

### $router

Sometimes we'll need to check whether or not [vue-router programmatic navigation](https://router.vuejs.org/guide/essentials/navigation.html) works as intended. Here is an example of testing a component that uses the `$router` global.

```js
const options = {
  mocks: {
    $router: {
      push: jest.fn(() => {
        return {
          catch: jest.fn()
        }
      })
    }
  }
}

const wrapper = createWrapper(MyComponent, options)
```

### $store

Similar to $route, and $router, mocking a Vuex store is pretty straight forward too.

```js
const mockStore = {
  state: {
    data: null,
    loading: false,
    error: false
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

const wrapper = createWrapper(MyComponent, options)

expect(mockStore.dispatch).toHaveBeenNthCalledWith(
  1,
  '[MODULE] FETCH_MY_DATA',
  '123'
)
```

### mapbox-gl

Sometimes [`mapbox-gl`](https://github.com/mapbox/mapbox-gl-js#readme) can come through in some of the unit tests. This has been a mystery for some time. You can mock the package with the snippet below. This mock needs to be applied globally in the Jest setup file.

```js
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))
```

## Resources

### Guides

- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/)
- [Vue Mastery - Unit Testing](https://www.vuemastery.com/courses/unit-testing/what-to-test/)

### Tooling

- [vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
