<template>
  <div class="content-editor">
    <h1 v-if="sectionTitle" v-text="sectionTitle" />
    <label v-if="label" class="bx--label" v-text="label" />
    <textarea ref="editor" />
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";

import "tinymce/icons/default";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";

// Theme
import "tinymce/themes/silver/theme";

export default {
  name: "content-editor",
  props: {
    showControlBar: {
      type: Boolean,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    sectionTitle: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: "Start typing...",
      required: false,
    },
  },
  data() {
    return {
      editorConfig: {
        toolbar:
          "undo redo | formatselect | bold italic backcolor link | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
        plugins: ["paste", "link"],
        menubar: false,
        height: 400,
      },
    };
  },
  methods: {
    getInitialContent() {
      return this.content || this.placeholder;
    },
    setup(editor) {
      this._editor = editor;
      editor.on("init", () => {
        editor.setContent(this.getInitialContent());
      });
      editor.on("change input undo redo", () => {
        const newContent = editor.getContent({ format: "html" });
        this.$emit("content:updated", newContent);
      });
    },
  },
  mounted() {
    // because we are operating inside the Shadow DOM, the tinymce-vue component doesn't
    // work, so we're using tinymce directly and have to hook up the content-change events
    // on our own
    tinymce.init({
      target: this.$refs.editor,
      ...this.editorConfig,
      setup: this.setup,
    });
    this.$emit("editor:mounted");
  },
  destroyed() {
    this.$emit("editor:destroyed");
  },
};
</script>
<style lang="scss">
// Skins
@import "~tinymce/skins/ui/oxide/skin.min.css";
@import "~tinymce/skins/ui/oxide/content.min.css";
@import "~tinymce/skins/content/default/content.min.css";
</style>
