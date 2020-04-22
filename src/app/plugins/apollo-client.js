import { ApolloClient } from '@apollo/client/core'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from '@apollo/client/cache/'
import { setContext } from 'apollo-link-context'
import { appLocalStorage } from '@/app/global/services'

import Vue from 'vue'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const httpLink = createUploadLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:8080/graphql'
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

const ApolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default ApolloProvider
