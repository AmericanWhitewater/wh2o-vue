<template>
  <div class='article-creator bx--grid'>
    <div class="bx--row">
      <div class="bx--col">
        <h1>Article Creator</h1>
        <template v-if="componentReady">
          <content-editor
          :content="form.contents"
          show-control-bar
          @content:updated="form.contents = $event"
        />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {updateArticle} from "@/app/services"
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import {mapState} from 'vuex'
export default {
  name: "article-creator",
  components: {
    'content-editor': ContentEditor,
  },
  data: () => ({
    componentReady: false,
    form: {
      abstract: '',
      author: '',
      uid: '',
      title: '',
      contents: '',
      icon: '',
      contact: '',
      posted_date: '',
      release_date: '',
      short_name: ''
    }
  }),
  computed: {
    ...mapState({
      user: state => state.User.data
    })
  },
  methods: {
    async handleSubmit() {
      try {
        const result = await updateArticle({
          id: this.$randomId(),
          article: this.form
        })
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  },
  created() {
    if(this.user) {
      this.form.uid = this.user.uid
      this.form.author = this.user.uname
    }
  },
  mounted() {
    this.componentReady = true
  }
};
</script>