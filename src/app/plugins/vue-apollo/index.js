import Vue from 'vue'
import { createProvider } from './vue-apollo'
import ApolloDevHelper from './apollo-dev-helper.vue'

if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_APOLLO_DEV_HELPER) {
  new Vue({
    apolloProvider: createProvider(),
    render: h => h(ApolloDevHelper)
  }).$mount('#apollo-dev-helper')
}
