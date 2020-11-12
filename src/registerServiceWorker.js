/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from './app/store'

if (
  !process.env.VUE_APP_LARAVEL_DEPLOY && process.env.NODE_ENV !== 'development' && navigator.serviceWorker
) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60)
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      )
      store.dispatch('Global/updateAvailable', true)
    },
    offline () {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
