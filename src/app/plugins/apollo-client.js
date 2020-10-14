import { appLocalStorage } from '@/app/global/services'
import VueApollo from 'vue-apollo'
import {
  getApolloClient,
  defaultCSRFStrategy,
  setDefaultApolloClient
} from '@bit/aw.client.apollo'

const apolloClient = getApolloClient({
  authToken:()=>{return appLocalStorage.getItem('wh2o-auth') ?? ''},
  url:()=>process.env.VUE_APP_GRAPHQL_HTTP || '/graphql',
  CSRF:defaultCSRFStrategy
})
setDefaultApolloClient(apolloClient);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
