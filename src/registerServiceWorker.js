/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')

      if('PushManager' in window) {
        console.log('Push notifications supported')
      }
      
      function getLocation() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geo Location not supported by browser");
        }
      }
      //function that retrieves the position
      function showPosition(position) {
        var location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
        console.log(location)
      }
      //request for location
      getLocation();

    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
