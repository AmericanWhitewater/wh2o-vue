import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { appLocalStorage } from '@/app/global/services'
import VueApollo from 'vue-apollo'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = appLocalStorage.getItem('wh2o-auth')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
      Accept: 'application/json, text/plain, */*'
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
