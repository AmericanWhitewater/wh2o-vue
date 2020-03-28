# Apollo Dev Helper

This is a separate Vue instance to serve as a GQL dev helper. Once mounted, it creates
a connection with the beta GQL server and enables the Apollo Chrome extension explorer. The extension explorer shows you all the available query fields and mutations on the beta GQL server. Use this as a way to test and fine tune queries/mutations being sent over HTTP.

Vuex is still our preferred approach for state management at this time.

## Usage

To enable, place any truthy value in the `VUE_APP_APOLLO_DEV_HELPER=` .env variable.

## Extension

[https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)

## Packages

```
"devDependencies" : {
 	"vue-apollo": "^3.0.0-beta.11",
    "graphql-tag": "^2.9.0",
    "vue-cli-plugin-apollo": "^0.21.3"
}
```
