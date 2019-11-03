<template>
  <div class="accident-database bx--grid">
    <page-header title="Accident Database" />
    <div class="spacer" />
    <div class="bx--row">
      <template v-if="!loading">
        results
      </template>
      <template
        v-else
      >
        loading
      </template>
    </div>
  </div>
</template>
<script>
import { PageHeader } from "../global/components";
import { accidentDatabaseActions } from "./shared/state";
export default {
  name: "AccidentDatabase",
  components: {
    PageHeader
  },
  computed: {
    loading() {
      return this.$store.state.accidentDatabaseState.accidentDatabaseData.loading;
    },
    accidents() {
      return this.$store.state.accidentDatabaseState.accidentDatabaseState.data;
    }
  },
  methods: {
    viewAccidentDetail(id) {
      this.$router.push(`/accident-database/accident/${id}`);
    },
    loadAccidents() {
      this.$store.dispatch(accidentDatabaseActions.GET_ACCIDENT_DATABASE_DATA);
    }
  },
  created() {
    this.loadAccidents();
  },
};
</script>
<style lang="scss">
.accident-database {
  padding-bottom: $layout-lg;
  .spacer {
    margin-bottom: $layout-sm;
  }
  .news-tile {
    padding: 0;
    @include ease;
    &:hover {
      @include layer("raised");
    }
    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
    }
    .content-area {
      padding: $spacing-sm;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
