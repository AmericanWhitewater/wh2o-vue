<template>
  <div class="content-editor">
    <h1 v-if="sectionTitle" v-text="sectionTitle" />
    <label v-if="label" class="bx--label" v-text="label" />
    <div v-if="showControlBar" class="control-bar">
      <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
        <div class="menubar">
          <div class="toolbar">
            <span>
              <button class="menubar__button" @click="commands.undo">
                <Undo16 />
              </button>
              <button class="menubar__button" @click="commands.redo">
                <Redo16 />
              </button>
            </span>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <TextBold16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <TextItalic16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <TextUnderline16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.link() }"
              @click="commands.link"
            >
              <Link16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <Paragraph16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              <h4><strong>H</strong></h4>
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <ListBulleted16 />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <ListNumbered16 />
            </button>
          </div>
        </div>
      </editor-menu-bar>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>
<script>
/**
 * @todo need to wire content editor v-model
 * look at b3 :model.sync
 */

import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Underline,
  History,
} from "tiptap-extensions";

export default {
  name: "content-editor",
  components: {
    EditorContent,
    EditorMenuBar,
  },
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
      updatedContent: "",
      editor: new Editor({
        content: this.content || this.placeholder,
        extensions: [
          new BulletList(),
          new Heading({ levels: [3] }),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Italic(),
          new Underline(),
          new History(),
        ],
        onUpdate: ({ getHTML }) => {
          this.updatedContent = getHTML();
          /**
           * @todo need to debounce
           */
          this.$emit("content:updated", this.updatedContent);
        },
      }),
    };
  },
  mounted() {
    this.$emit("editor:mounted");
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
  destroyed() {
    this.$emit("editor:destroyed");
  },
};
</script>
<style lang="scss">
.content-editor {
  .ProseMirror {
    background-color: $ui-02;
    min-height: 250px;
    padding: 1rem;
  }
  .toolbar {
    @include layer("raised");
    border: 1px solid $ui-03;
    display: flex;
    justify-content: space-between;
    padding: 0 $spacing-xs;
    width: 100%;

    button {
      background-color: $ui-01;
      border: 0;
      color: $text-01;
      cursor: pointer;
      flex-basis: auto;
      font-size: 1rem;
      margin: 0;
      padding: $spacing-xs;
      &:hover {
        background-color: $ui-02;
      }
      h3 {
        line-height: 1;
        margin: 0;
        padding: 0;
        u {
          text-decoration: none;
        }
      }
      svg {
        vertical-align: middle;
      }
    }
  }
}
</style>
