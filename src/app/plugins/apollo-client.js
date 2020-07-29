import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { appLocalStorage } from '@/app/global/services'
import VueApollo from 'vue-apollo'

const httpLink = createUploadLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const authHeader = {}
  // get the authentication token from local storage
  const token = appLocalStorage.getItem('wh2o-auth')

  if (token) {
    authHeader.Authorization = `Bearer ${token}`
  }

  return {
    headers: {
      ...headers,
      ...authHeader
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
  // connectToDevTools: true,
  // credentials: "same-origin"
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
