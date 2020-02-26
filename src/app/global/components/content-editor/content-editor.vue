<template>
  <div class="content-editor">
    <h1
      v-if="sectionTitle"
      v-text="sectionTitle"
    />
    <div
      v-if="showControlBar"
      class="control-bar"
    >
      <editor-menu-bar
        v-slot="{ commands, isActive }"
        :editor="editor"
      >
        <div class="menubar">
          <div class="toolbar">
            <span>
              <button
                class="menubar__button"
                @click="commands.undo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <title>Undo</title>
                  <g fill="#5a6872">
                    <path
                      fill="#5a6872"
                      d="M8,5C5.839,5,3.722,5.729,2,7.017V5H0v5c0,0.553,0.448,1,1,1h5V9H2.722C4.173,7.728,6.065,7,8,7 c2.105,0,4.167,0.854,5.657,2.343l1.414-1.414C13.209,6.067,10.632,5,8,5z"
                    />
                  </g>
                </svg>
              </button>

              <button
                class="menubar__button"
                @click="commands.redo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <title>Redo</title>
                  <g fill="#5a6872">
                    <path
                      fill="#5a6872"
                      d="M8.07,5c2.161,0,4.278,0.729,6,2.017V5h2v5c0,0.553-0.448,1-1,1h-5V9h3.278c-1.451-1.272-3.343-2-5.278-2 C5.965,7,3.903,7.854,2.414,9.343L1,7.929C2.861,6.067,5.439,5,8.07,5z"
                    />
                  </g>
                </svg>
              </button>
            </span>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Bold</title>
                <g fill="#5a6872">
                  <path
                    fill="#5a6872"
                    d="M11.56085,7.31641c0.96506-0.70764,1.56221-1.88808,1.41765-3.20763 C12.78094,2.30548,11.14325,0.99999,9.32916,1L2,1v1l1.44721,0.72361C3.786,2.893,4,3.23926,4,3.61803v8.76393 c0,0.37877-0.214,0.72504-0.55279,0.89443L2,14v1l7.82266,0c2.10385,0,3.98039-1.54746,4.16186-3.64347 C14.14087,9.55075,13.09633,7.96788,11.56085,7.31641z M7,3h1c1.10455,0,2,0.89539,2,2c0,1.10455-0.89545,2-2,2H7V3z M9,13H7V9h2 c1.10455,0,2,0.89539,2,2C11,12.10455,10.10455,13,9,13z"
                  />
                </g>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Italic</title>
                <g fill="#5a6872">
                  <path
                    fill="#5a6872"
                    d="M12,2V0H6v2h1.27066c0.30427,0,0.53801,0.26949,0.49497,0.57071L6.25553,13.14142 C6.18515,13.63407,5.76323,14,5.26558,14H4v2h6v-2H8.72934c-0.30428,0-0.53801-0.26949-0.49498-0.57071L9.74447,2.85858 C9.81485,2.36593,10.23677,2,10.73442,2H12z"
                  />
                </g>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Underline</title>
                <g fill="#5a6872">
                  <rect
                    data-color="color-2"
                    y="14"
                    width="16"
                    height="2"
                  />
                  <path
                    fill="#5a6872"
                    d="M15,0H9v1l1.44721,0.72361C10.786,1.893,11,2.23926,11,2.61803l0,4.26357 c0,1.45087-0.97782,2.7836-2.40207,3.06025C6.68269,10.31386,5,8.84987,5,7V2.61803C5,2.23926,5.214,1.893,5.55279,1.72361L7,1V0H1 v1l1.44721,0.72361C2.786,1.893,3,2.23926,3,2.61803L3,6.777c0,2.60979,1.90274,4.94497,4.50018,5.19855 C10.48047,12.2665,13,9.92173,13,7V2.61803c0-0.37877,0.214-0.72504,0.55279-0.89443L15,1V0z"
                  />
                </g>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Paragraph</title>
                <g fill="#5a6872">
                  <path
                    d="M6,0V0A4,4,0,0,0,6,8v8H8V2h3V16h2V2h2V0Z"
                    fill="#5a6872"
                  />
                </g>
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Bulleted List</title>
                <g fill="#5a6872">
                  <path
                    d="M4 12h12v2H4zm0-5h12v2H4zm0-5h12v2H4zM0 2h2v2H0zm0 5h2v2H0zm0 5h2v2H0z"
                    fill="#5a6872"
                  />
                </g>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Numbered List</title>
                <g fill="#5a6872">
                  <path
                    d="M2 0H0v1h1v2H0v1h3V3H2zM0 6v1h2v1h1V6H2zm0 9h2v1H0zm0-2h1v1h1v-1h1v-1H0zm5 0h11v2H5zm0-6h11v2H5zm0-6h11v2H5zM1 9l-1 .167V10h3V9H2V8H1zm1 5h1v1H2z"
                    fill="#5a6872"
                  />
                </g>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>Blockquote</title>
                <g fill="#5a6872">
                  <path
                    fill="#5a6872"
                    d="M3.02362,4.56063c-1.18508,1.48134-1.35607,2.9743-1.00787,4.0189 C3.33164,7.53456,5.16042,7.75337,6.27402,8.7937c1.12491,1.05091,1.2217,2.89822,0.50394,4.09449 c-0.60379,1.00632-1.66412,1.6126-2.84724,1.6126C1.23817,14.50079,0,12.12601,0,9.46142C0,7.73123,0.44094,6.18163,1.32283,4.8126 s2.21312-2.47349,3.9937-3.31339L5.79528,2.4315C4.72021,2.88504,3.79633,3.59475,3.02362,4.56063z M11.79213,4.56063 c-1.18507,1.48134-1.35607,2.9743-1.00787,4.0189c0.58793-0.45354,1.22625-0.68032,1.91496-0.68032 C14.51086,7.89921,16,9.10579,16,11.2c0,1.92572-1.47785,3.30079-3.30079,3.30079c-2.69254,0-3.93071-2.37478-3.93071-5.03937 c0-1.73018,0.44094-3.27979,1.32283-4.64882c0.88189-1.36903,2.21312-2.47349,3.9937-3.31339l0.47874,0.93228 C13.48871,2.88504,12.56483,3.59475,11.79213,4.56063z"
                  />
                </g>
              </svg>
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  name: 'ContentEditor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    showControlBar: {
      type: Boolean,
      required: false
    },
    content: {
      type: String,
      default: null
    },
    sectionTitle: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: null
    }
  },
  methods: {
    newEditor () {
      this.editor = new Editor({
        content: this.content,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new Heading({ levels: [3] }),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Italic(),
          new Underline(),
          new History()
        ]
      })
    }
  },
  beforeMount () {
    this.newEditor()
  },
  beforeDestroy () {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  }
}
</script>
<style lang="scss">
.content-editor {
.ProseMirror {
  min-height:250px;
  background-color: $ui-02;
  padding:1rem;
}
.toolbar {
  @include layer("raised");
  border: 1px solid $ui-03;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 $spacing-xs;

  button {
    border: 0;
    margin: 0;
    background-color: $ui-01;
    color: $text-01;
    padding: $spacing-xs;
    flex-basis: auto;
    color: $text-01;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background-color: $ui-02;
    }
    h3 {
      line-height: 1;
      margin: 0;
      padding: 0;
      // block underlining of headlines
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
