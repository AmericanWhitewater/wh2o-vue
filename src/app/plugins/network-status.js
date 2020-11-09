import store from '@/app/store'
import { globalAppActions } from '@/app/global/state'

if (!navigator.onLine) {
  store.dispatch(globalAppActions.NETWORK_STATUS, "offline");
} else {
  store.dispatch(globalAppActions.NETWORK_STATUS, "online");
}

window.addEventListener("offline", function () {
  store.dispatch(globalAppActions.NETWORK_STATUS, "offline");
});

window.addEventListener("online", function () {
  store.dispatch(globalAppActions.NETWORK_STATUS, "online");
});
