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
import "tinymce/plugins/lists";

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
    toolbar: {
      type: String,
      default:
        "undo redo | formatselect | bold italic link | \
           alignleft aligncenter alignright | \
           bullist numlist outdent indent | removeformat",
    },
  },
  data() {
    return {
      editorConfig: {
        toolbar: this.toolbar,
        plugins: ["paste", "link", "lists"],
        menubar: false,
        height: 400,
        convert_urls: false
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

    // transitions cause some weird behavior here. Basically, `mounted` is called every
    // time this component is visited. Sometimes, that happens before a transition is complete
    // -- meaning the element isn't actually visible, so tinymce breaks.
    // activated is called in the scenarios where mounted doesn't work, so by having both of them
    // here, it seems to work in all situations.
    if (
      this.$refs.editor.offsetWidth > 0 ||
      this.$refs.editor.offsetHeight > 0
    ) {
      tinymce.init({
        target: this.$refs.editor,
        ...this.editorConfig,
        setup: this.setup,
      });
    }
    this.$emit("editor:mounted");
  },
  activated() {
    tinymce.init({
      target: this.$refs.editor,
      ...this.editorConfig,
      setup: this.setup,
    });
    this.$emit("editor:activated");
  },
  deactivated() {
    tinymce.remove(this._editor);
    this.$emit("editor:deactivated");
  },
  destroyed() {
    tinymce.remove(this._editor);
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
