# Unit

`tests/unit`

We use [Jest](https://jestjs.io/) and [@vue/test-utils](https://vue-test-utils.vuejs.org/) for our unit tests.

## Run

To run unit tests: `npm run test:unit`

## Tooling

- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) (VS Code)

## Courses

- [Vue Mastery - What to Test](https://www.vuemastery.com/courses/unit-testing/what-to-test) (Paywall)
- [Vue School](https://vueschool.io/lessons/install-jest) (Paywall)
- [Codecademy](https://www.codecademy.com/learn/learn-javascript-unit-testing) (Paid)

## Guides

- [Official Guides](https://vue-test-utils.vuejs.org/guides/)
- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/)

## Testing Setup

To reduce some boilerplate we use the factory function `createWrapper()` to let us mount our components will global requirements in addition to per-test customization.

### Factory

#### createWrapper(component, options)

`tests/_helpers/create-wrapper.js`

- `component` the component we're testing. i.e. HelloWorld.vue
- `options` mocks, stubs, etc.

```js
const createWrapper = (component, options = {}) => {
  const localVue = createLocalVue()
  const wrapper = mount(component, ({
    localVue,
    ...options
  }))
  return wrapper
}
```

Breakdown. We're creating a function called `createWrapper()` which takes in the component we're testing and the test options. Inside the block, we invoke [createLocalVue()](https://vue-test-utils.vuejs.org/api/#createlocalvue) which returns a fresh Vue instance for us to add components, mixins, and install plugins without polluting the global Vue class. Then we merge in any provided options. See below for example options.

## Example Mocks

- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/mocking-global-objects.html#mocking-global-objects)

### $route

If your component needs data from the $route object, you'll need to provide the mounted component with that information.

Add dynamic values to params: `$route.params.YOUR_VALUE_NAME`.

```js
// router
{
  path: 'my-component/:id',
  component: MyComponent
}

// test
const options = {
  mocks: {
    $route: {
      params: {
        id: '123'
      }
    }
  }
}
```

### $router

To test whether or not our programmatic navigation worked as expected, we need to add spies for the core vue-router methods.

```js
// component
this.$router.push('/home').catch(()=>{})
this.$router.replace('/login').catch(()=>{})

// test
const options = {
  mocks: {
    $router: {
      push: jest.fn(() => {
        return {
          catch: jest.fn()
        }
      }),
      replace: jest.fn(() => {
        return {
          catch: jest.fn()
        }
      })
    }
  }
}
```

### $store

Mocking Vuex and its methods is pretty straight forward.

```js
// component
computed: {
  data() {
    return this.$store.state.Module.data
  }
}

this.$store.dispatch('Module/getProperty', 'foo')

// test
const options = {
  mocks: {
    $store: {
      state: {
        Module: {
          data: null
        }
      },
      dispatch: jest.fn()
    }
  }
}
```

## Examples 

- [Computed Properties](#computed-properties)
- [Emitted Events](#emitted-events)
- [Props](#props)
- [User Input](#user-input)
- [Route](#route)

### Computed Properties

The computed property example component has a prop of "fullName" is a string. We want to get just the user's initials. The example below shows two possible ways to do this.

#### Component 

```vue
<template>
  <div class="computed-example">
    <p>Initials: {{ initials }}</p>
  </div>
</template>
<script>
export default {
  name: 'computed-example',
  props: {
    fullName: {
      type: String,
      required: true
    }
  },
  computed: {
    /**
     *
     * TDD lets us refactor our work with confidence.
     * Both ways of getting first and last initials are valid
     * and with both the test will pass, but one is way cleaner.
     *
     */
    initials () {
      const names = this.fullName.split(' ')

      const input = []
      names.forEach(n => {
        input.push(n.charAt(0).toUpperCase())
      })

      return input.join('')
    }
    // initials() {
    //   const names = this.fullName.split(' ')
    //   return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
    // }
  }
}
</script>
```

#### Test

```js
describe('Computed.vue', () => {
  it('renders initials in template', () => {
    const wrapper = createWrapper(Computed, {
      propsData: {
        fullName: 'John Doe'
      }
    })

    expect(wrapper.find('p').text()).toBe('Initials: JD')
  })
})
```

### Emitted Events

#### Component 

```vue
<template>
  <div class="emitted-example">
    <button @click.exact="emitEvent">Emit Event!</button>
  </div>
</template>
<script>
export default {
  name: 'emitted-example',
  methods: {
    emitEvent () {
      this.$emit('myEvent', 'name', 'password')
    }
  }
}
</script>
```

#### Test

```js
describe('Emitted.vue', () => {
  it('emits event + payload when button clicked.', async () => {
    const wrapper = createWrapper(Emitted)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().myEvent[0]).toEqual(['name', 'password'])
  })
})
```


### Props

The props example component has a prop called "state" that is a string and can be one of three options: 
"error", "loading", or "default".

#### Component

```vue
<template>
  <div class='props-example'>
    <h1>Component State: {{ state }}</h1>
  </div>
</template>
<script>
export default {
  name: 'props-example',
  props: {
    state: {
      type: String,
      required: false,
      default: 'default',
      validator: val => ['error', 'loading', 'default'].indexOf(val) > -1
    }
  }
}
</script>
```

#### Test 

```js
const mockProp = 'default'
const options = {
  propsData: {
    state: mockProp
  }
}

describe('Props.vue', () => {
  it('renders component state in template', () => {
    const wrapper = createWrapper(Props, options)
    expect(wrapper.find('h1').text()).toBe('Component State: default')
  })
})
```

### User Input

#### Component

```vue
<template>
  <div class="user-input">
    <form @submit="handleSubmit">
      <input v-model="username" data-username />
      <button type="submit" />
    </form>
    <div class="message" v-if="submitted">
      Thank you for your submission, {{ username }}.
    </div>
  </div>
</template>
<script>
export default {
  name: 'user-input',
  data: () => ({
    username: '',
    submitted: false
  }),
  methods: {
    handleSubmit () {
      this.submitted = true
    }
  }
}
</script>
```

#### Test

```js
describe('UserInput.vue', () => {
  it('shows success message after successful form submission', async () => {
    const wrapper = createWrapper(UserInput)

    wrapper.find('[data-username]').setValue('foo')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('.message').exists()).toBe(true)
    expect(wrapper.find('.message').text()).toBe('Thank you for your submission, foo.')
  })
})
```

### Route

#### Component

```vue
<template>
  <div class='route-example'>
    <h5>Id - {{ routeId }}</h5>
    <h1>Path - {{ routePath  }}</h1>
    <div v-if="isAdmin" class="admin-wrapper">
      admin!
    </div>
  </div>
</template>
<script>
export default {
  name: 'route-example',
  computed: {
    routeId () {
      return this.$route.params.id
    },
    routePath () {
      return this.$route.path
    },
    isAdmin () {
      return this.$route.path.includes('admin')
    }
  }
}
</script>
```

#### Test

```js
const mockRoute = {
  params: {
    id: '123'
  },
  path: 'default'
}

const options = {
  mocks: {
    $route: mockRoute
  }
}

describe('Route.vue', () => {
  it('hides admin wrapper if not on admin view', () => {
    const wrapper = createWrapper(Route, options)

    expect(wrapper.find('h5').text()).toBe('Id - 123')
    expect(wrapper.find('.admin-wrapper').exists()).toBe(false)
  })

  it('shows admin wrapper when in on an admin route', () => {

    mockRoute.path = 'admin-view'

    const wrapper = createWrapper(Route, options)

    expect(wrapper.find('.admin-wrapper').exists()).toBe(true)
  })
})
```