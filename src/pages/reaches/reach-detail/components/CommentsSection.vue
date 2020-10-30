<template>
  <div class="commentsection">
    <h3>{{ $t("comments") }}</h3>
    <v-card class="mb-3" tile>
    <v-card-title>
      New Comment
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="form.name" placeholder="Title" />
    <v-select
      v-model="form.type"
      :items="['warning', 'complaint', 'comment']"
      label="Type"
    ></v-select>
    <v-select
      v-model="form.section"
      :items="['photo', 'journal', 'river']"
      label="Section"
    ></v-select>
    <v-text-field v-model="form.comments" label="comments"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="handleCreate" color="secondary" tile>
      Create Comment
    </v-btn>
    </v-card-actions>
    </v-card>
    <template v-if="comments">
      <!-- <v-card v-for="(comment, index) in comments" :key="index" class="mb-2" tile>
        <v-card-text>
          <v-text-field v-model="comment.comments" @input="handleUpdate(comment.id, {comments: comment.comments})" ></v-text-field>
          <v-text-field v-model="comment.name" @input="handleUpdate(comment.id, {name: comment.name})"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="handleDelete(comment.id)" tile>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card> -->
      <comment-detail v-for="(comment, index) in comments" :key="index" class="mb-2" :comment="comment" @update:success="load" />
    </template>
    <template v-else> Something went wrong </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {deleteComment, createComment, updateComment} from "../controllers"
import CommentDetail from "./CommentDetail"
export default {
  name: "CommentSection",
  props: {
    sectionId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'comment',
      validator: val => ['comment', 'warning', 'complaint'].indexOf(val) > -1
    },
    section: {
      type: String,
      required: true,
      default: 'river',
      validator: val => ['river', 'photo', 'journal'].indexOf(val) > -1
    }
  },
  components: {
    CommentDetail
  },
  data: () => ({
    form: {
      name: '',
      type: 'comment',
      section: 'river',
      comments: ''
    },
    pendingUpdate: [],
  }),
  computed: {
    ...mapState({
      loading: (state) => state.Comments.loading,
      comments: (state) => state.Comments.data,
      error: (state) => state.Comments.error,
      uid: state => state.User.data.uid
    }),
  },
  methods: {
    handleUpdate(id,data) {
      const index = this.pendingUpdate.findIndex(item => item.id === id)
      if(index > -1) {
        Object.assign(this.pendingUpdate[index],  data)
      } else {
        this.pendingUpdate.push({
          id,
          ...data
        })
      }

    },
    async handleCreate() {

      const now = new Date()

      try {
        const result = await createComment({
          ...this.form,
          uid: this.uid,
          revision: 0,
          sectionid: this.sectionId,
          section: this.section,
          is_final: true,
          is_private: false,
          posted: now.toISOString()
        })

        if(result) {
          Object.assign(this.form,{
            name: '',
            type: 'comment',
            section: 'river',
            comments: ''
          })
          this.load()
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    async handleDelete(id) {
      try {
        const result = await deleteComment(id)
        if(result) {
          this.load()
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    load() {
      this.$store.dispatch("Comments/getProperty", {
        url: `/comments?sectionid=${this.sectionId}`,
      });
    }
  },
  created() {
    this.load()
  },
};
</script>
