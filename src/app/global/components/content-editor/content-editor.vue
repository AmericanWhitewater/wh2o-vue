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

// need to apply site styles to TinyMCE editor, but TinyMCE only accepts this
// either as an inline string of CSS or as a URL to a file. Generating a file
// by messing with Webpack config proved to be quite difficult given the existing
// shadow DOM configuration, so I've just captured the site styling for relevant tags
// in this string. If we move away from Carbon without rebuilding the site (unlikely)
// this will need to be revisited
const editorStyles = `
* {
  font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5; // from .description-content

  // these styles are from the browser reset
  padding: 0;
  border: 0;
  margin: 0;
  vertical-align: baseline;
}
h1 {
  font-size: 36px;
  font-weight: 300;
  line-height: 46px;
}
h2 {
  font-size: 28px;
  font-weight: 300;
  line-height: 36px;
}
h3 {
  font-size: 20px;
  font-weight: 300;
  line-height: 26px;
}
h4 {
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}
h5 {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

a {
  text-decoration: none;
  color: #537653; // also specific to .description-content in broader site
}

p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 1.25rem; // from site styling for .description-content, not from carbon
}
`;

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
           bullist numlist | removeformat",
    },
  },
  data() {
    return {
      editorConfig: {
        toolbar: this.toolbar,
        plugins: ["paste", "link", "lists"],
        menubar: false,
        height: 400,
        convert_urls: false,
        content_style: editorStyles
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
