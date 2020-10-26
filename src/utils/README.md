# Utils

Misnomer. Consider renaming to `@/dev-utils`. 

# Note 

It's important not to import `createWrapper` into a barrel which is used in a "live" component. Otherwise the Vuex Dev Tools Chrome extension tab for Vuex breaks.