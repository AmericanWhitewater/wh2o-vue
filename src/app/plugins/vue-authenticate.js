import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://beta.americanwhitewater.org',
  providers: {
    facebook: {
      url: '/oauth/facebook/token',
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      redirectUri: 'http://localhost:8081/#/user/access/login'
    }
  }
})
