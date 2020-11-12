<template>
  <div class='reach-description'>
    <v-card tile :loading="loading">
      <v-card-title>
        {{$t('common.description')}}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-textarea v-model="formDescription" auto-grow />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click=handleUpdate color="secondary" tile :disabled="!edited">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {updateReach} from "../controllers"
export default {
  name: "reach-description",
  props: {
    reach: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data: () => ({
    formDescription: '',
    edited: false,
    loading: false
  }),
  watch: {
    formDescription(val) {
      if(val && val !== this.reach.description) {
        this.edited = true
      }
    }
  },
  methods: {

    async handleUpdate() {
      try {
        this.loading = true
        const result = await updateReach(this.reach.id, {
          ...this.reach,
          description: this.formDescription
        })
        if(result) {
          this.edited = false
          this.$store.dispatch('ReachDetail/getProperty', {
            url: `/reach?id=${this.reach.id}`
          })
        }
      } catch (error) {
        console.log('error :>> ', error);
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.formDescription = this.reach.description
  }
};
</script>
