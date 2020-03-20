<template>
  <div />
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'apollo-dev-helper',
  apollo: {
    reach: {
      query: gql`
      query riverDetail($id: ID) {
        reach(id: $id) {
          river
          section
          class
        }
      }`,
      variables () {
        return {
          id: 357
        }
      }
    }
  }
}
</script>
