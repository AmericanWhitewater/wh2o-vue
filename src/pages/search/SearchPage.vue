<template>
  <div class="search-page">
    <h1>Search</h1>
    <p>I'm looking for..</p>
    <v-form>
      <v-select
        v-model="formEntityType"
        :items="['river', 'document', 'project']"
      />
      <v-text-field v-model="formSearchTerm" />
      <v-btn @click="handleSubmit()"> Search </v-btn>
    </v-form>
  </div>
</template>
<script>
import { riverSearch } from "./controllers";
export default {
  name: "SearchPage",
  data: () => ({
    formEntityType: "river",
    searchResults: null,
    formSearchTerm: "",
  }),
  methods: {
    async handleSubmit() {
      if (this.formEntityType === "river") {
        try {
          const result = await riverSearch(this.formSearchTerm);
          if(result) {
            this.searchResults = result.rows
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      }
    },
  },
};
</script>
