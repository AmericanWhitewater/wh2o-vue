<template>
  <cv-grid class="mb-xl">
    <cv-row>
      <cv-column :sm="12" :md="6" :lg="6">
        <h1 class="mb-md mt-sm">New Article</h1>
        <cv-text-input
          v-model="form.title"
          label="Title"
          class="mb-spacing-md"
        />
        <cv-text-input
          v-model="form.author"
          label="Author"
          class="mb-spacing-md"
        />
        <cv-date-picker
          kind="single"
          dateLabel="Release Date"
          class="mb-spacing-md"
          @change="setDate"
        />
        <cv-text-area
          v-model="form.abstract"
          label="Abstract"
          class="mb-spacing-md"
          helper-text="A brief description of article for SEO and previewing."
        />
      </cv-column>
    </cv-row>
    <cv-row class="mb-spacing-lg">
      <cv-column>
        <template v-if="componentReady">
          <label for="Editor" class="bx--label">Contents</label>
          <content-editor
            :content="form.contents"
            show-control-bar
            @content:updated="form.contents = $event"
          />
        </template>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-button kind="secondary" :disabled="submitLoading"> Cancel </cv-button>
        <cv-button :disabled="submitLoading" @click.exact="handleSubmit" @keydown.enter="handleSubmit">
          Submit
        </cv-button>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
<script>
import { updateArticle } from "@/app/services";
import ContentEditor from "@/app/global/components/content-editor/content-editor.vue";
import { mapState } from "vuex";
export default {
  name: "article-creator",
  components: {
    "content-editor": ContentEditor
  },
  data: () => ({
    submitLoading: false,
    componentReady: false,
    form: {
      abstract: "",
      author: "",
      uid: "",
      title: "",
      contents: "",
      icon: "",
      contact: "",
      posted_date: "",
      release_date: "",
      short_name: "",
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.User.data,
    }),
  },
  methods: {
    async handleSubmit() {
      try {
        this.submitLoading = true;
        this.form.short_name = this.form.title 

        const result = await updateArticle({
          id: this.$randomId(),
          article: this.form,
        });

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Article Created",
          });
          this.$router.push(`/article-detail/${result.id}`)
        } else {
          this.$store.dispatch("Global/sendToast", {
            kind: "error",
            title: "Error",
            subtitle: result.errors[0].message,
          });
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
            kind: "error",
            title: "Error",
            subtitle: error,
          });
      } finally {
        this.submitLoading = false;
      }
    },
    setDate(input) {
      this.form.release_date = new Date(input).toISOString();
    },
  },
  created() {
    this.form.posted_date = new Date().toISOString();
    this.form.release_date = new Date().toISOString();

    if (this.user) {
      this.form.uid = this.user.uid;
      this.form.author = this.user.uname;
      this.form.contact = this.user.uname;
    }
  },
  mounted() {
    this.componentReady = true;
  },
};
</script>