<template>
  <div class='comment-detail'>
    <v-card tile elevation="0" outlined>
      <v-card-title>
        {{ comment.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ comment.posted  }}
      </v-card-subtitle>
      <v-card-text>
        <!-- {{ comment.comments }} -->
        <v-text-field v-model="formComments"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        
        <v-btn tile color="error">
          {{$t('common.delete')}}
        </v-btn>
        <v-btn :disabled="!edited" @click="handleUpdate" color="secondary" tile>
          {{$t('common.save')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {updateComment} from "../controllers"
export default {
  name: "RapidDetail",
  props: {
    comment: {
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    edited: false,
    formComments: '',
    formName: '',
    loading: false
  }),
  watch: {
    formName(val) {
      if(val !== this.comment.name) {
        this.edited = true
      }
    },
    formComments(val) {
      if(val !== this.comment.comments) {
        this.edited = true
      }
    },
  },
  methods: {
    async handleUpdate() {
      try {
        this.loading = true
        const result = await updateComment(this.comment.id, {
          ...this.comment,
          comments: this.formComments,
          name: this.formName
        })
        if(result) {
          this.$emit('update:success')
        }
      } catch (error) {
        console.log('error :>> ', error);
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.formComments = this.comment.comments
    this.formName = this.comment.name
  }
};
</script>
