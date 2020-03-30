import store from '@/app/app-state'
import { globalAppActions } from '@/app/global/state'

if (!navigator.onLine) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'offline')
}

window.addEventListener('offline', function (e) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'offline')
})

window.addEventListener('online', function (e) {
  store.dispatch(globalAppActions.NETWORK_STATUS, 'online')
})
