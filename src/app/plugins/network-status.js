import store from '@/app/store'

if (!navigator.onLine) {
  store.dispatch('Global/networkStatus', "offline");
} else {
  store.dispatch('Global/networkStatus', "online");
}

window.addEventListener("offline", function () {
  store.dispatch('Global/networkStatus', "offline");
});

window.addEventListener("online", function () {
  store.dispatch('Global/networkStatus', "online");
});
