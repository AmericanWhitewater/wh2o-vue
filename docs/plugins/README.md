# Plugins

`@/app/plugins/`

Here are the projects in house and third-party plugins. "Plugins" is used loosely. The project information hierarchy/file organization needs to be revisited.

## Vue Apollo

`@/app/plugins/vue-apollo/`

At the time of this writing, we have still not been able to wire upload functionality with the API. If we can solve this problem without using `vue-apollo` then we can remove it. Vuex handles state management.

### Apollo Dev Helper

This is a separate Vue instance to serve as a GQL dev helper. Once mounted, it creates
a connection with the beta GQL server and enables the Apollo Chrome extension explorer. The extension's Explorer shows you all the available query fields and mutations on the beta GQL server. Use this as a way to test and fine-tune queries/mutations.

Vuex is still our preferred approach for state management at this time.

#### Usage

To enable, place any truthy value in the `VUE_APP_APOLLO_DEV_HELPER=` .env variable.

#### Tooling

- [Apollo Chome Extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)

##### NPM Packages

- [`vue-apollo`](https://vue-apollo.netlify.com/)
- [`graphql-tag`](https://www.npmjs.com/package/graphql-tag)
- [`vue-cli-plugin-apollo`](https://www.npmjs.com/package/graphql-tag)

## Exception Handler

`@/app/plugins/exception-handler.js`

This is a simple exception handler which provides more Vue specific info. It is essential only to use this during development to avoid conflict with [Sentry](/plugins/#sentry).


```js
if (environment === 'development') {
  Vue.config.errorHandler = (err, vm, info) => {
    logger.logToServer({ err, vm, info })
  }

  window.onerror = function (message, source, lineno, colno, error) {
    logger.logToServer({
      message,
      source,
      lineno,
      colno,
      error
    })
  }
}
```

## Network Status

`@/app/plugins/network-status.js`

Used to update the UI when the user's network connection is lost. Visit the  [Offline](/offline/) section for more info about Progressive Web Apps.

```js
if (!navigator.onLine) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'offline')
} else {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'online')
}

window.addEventListener('offline', function (e) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'offline')
})

window.addEventListener('online', function (e) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'online')
})
```

## Random ID

`@/app/plugins/random-id.js`

Used to generate unique IDs for newly created resources.

```js
Vue.prototype.$randomId = nanoid(21, '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
```
#### NPM Packages

- [`nanoid`](https://www.npmjs.com/package/nanoid)

## Sentry

`@/app/plugins/sentry.js`

Error monitoring / logging for production environments with [Sentry.io](https://sentry.io/welcome/).

#### NPM Packages

- [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser)
- [`@sentry/integrations`](https://www.npmjs.com/package/@sentry/integrations)

## Vue Check View

`@/app/plugins/vue-check-view.js`

A [custom Vue Directive](https://vuejs.org/v2/guide/custom-directive.html) used to load below the fold content like rapids and comments dynamically. It checks to see if the element is in the viewport then trigger an API call. 

```vue
// @/app/views/river-detail/main-tab/components/rapids-section/rapids-section.vue

<section v-view.once="loadRapids"> ... </section>
```

#### NPM Packages

- [`vue-check-view`](https://www.npmjs.com/package/vue-check-view)


## Vue Gtag

`@/app/plugins/vue-gtag.js`

This package installs and configures Google analytics. 

#### NPM Packages

- [`vue-gtag`](https://matteo-gabriele.gitbook.io/vue-gtag/)

## Vue Sanitize

`@/app/plugins/vue-sanitize.js`

Use `vue-sanitize` for cleaning up HTML markup in river descriptions, news articles, and other user-generated content. The old rich text editor was very loose with what users could do. To keep page content styling consistent, we use `vue-sanitize` to remove inline CSS styles and replace headline tags that do not fit within our typographic hierarchy.

#### NPM Packages

- [`vue-sanitize`](https://github.com/daichirata/vue-sanitize)


## Vue Social Sharing

`@/app/plugins/vue-social-sharing.js`

Used for handling all social media sharing functionality. Currently only used in news articles. 

#### NPM Packages

- [`vue-social-sharing`](https://www.npmjs.com/package/vue-social-sharing)
