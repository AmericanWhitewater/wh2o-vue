<template>
  <div class="rapid-item bx--col-sm-12 bx--col-md-12 bx--col-lg-16 mb-sm">
    <cv-tile
      v-if="rapid"
      kind="standard"
      cv-type="standard"
      :expanded="firstPOI"
    >
      <div class="top-bar">
        <div class="title">
          <h4 class="mb-spacing-xs">
            {{ rapid.name }}
          </h4>
          <span
            v-if="rapid.difficulty && rapid.difficulty !== 'N/A'"
            class="mr-spacing-xs rapid-meta"
            v-text="`Class: ${rapid.difficulty}`"
          />
          <span
            v-if="rapid.distance !== null"
            class="rapid-meta"
            v-text="`Distance: ${rapid.distance} mi`"
          />
        </div>
        <rapid-icon-bar
          :character="rapid.character"
          @rapid:edit="triggerEdit"
          @rapid:delete="triggerDelete"
        />
      </div>
      <hr class="ui-03">
      <template>
        <div class="bx--row pt-spacing-xs">
          <div class="bx--col-sm-12 bx--col-lg-5">
            <div class="outside">
              <div
                v-if="rapid.photo && rapid.photo.image"
                class="inside thumbnail pb-spacing-sm"
              >
                <img :src="imageURI(rapid.photo, 'medium')" :alt="rapid.name">
              </div>
              <div v-else class="inside empty-block pb-spacing-sm">
                <h6>No Image</h6>
              </div>
              <div v-if="editMode" class="rapid-image-actions">
                <cv-button
                  v-if="editMode"
                  size="small"
                  kind="secondary"
                  @click="triggerImageSelect"
                  >Select image</cv-button
                >
                <cv-button
                  v-if="editMode && rapid.photo && rapid.photo.image"
                  size="small"
                  kind="danger"
                  @click="triggerRemoveImage"
                  >Remove</cv-button
                >
              </div>

              <div class="inside">
                <cv-button
                  v-if="
                    sanitizedDescription &&
                    sanitizedDescription.length > characterLimit
                  "
                  size="small"
                  kind="tertiary"
                  class="mb-spacing-lg"
                  @click="readMoreActive = !readMoreActive"
                >
                  Show Full Description
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--col-sm-12 bx--col-lg-11">
            <template v-if="rapid.description && sanitizedDescription">
              <template
                v-if="
                  sanitizedDescription &&
                  sanitizedDescription.length > characterLimit &&
                  !readMoreActive
                "
              >
                <div
                  class="description"
                  v-html="sanitizedDescription.slice(0, characterLimit) + '...'"
                />
              </template>
              <template v-else>
                <div class="description" v-html="sanitizedDescription" />
              </template>
            </template>
            <template v-else>
              <div class>
                <p>
                  This rapid does not have a description.
                  <br>
                  <template v-if="!user">
                    <login-button buttonClass="mt-spacing-md" buttonText="Log in to add one" />
                  </template>
                  <template v-if="user && !editMode">
                    <cv-button
                      kind="secondary"
                      size="small"
                      class="mt-spacing-md"
                      @keydown.enter="handleToggleEditMode"
                      @click.exact="handleToggleEditMode"
                    >
                      Add Description
                    </cv-button>
                  </template>
                </p>
              </div>
            </template>
          </div>
        </div>
      </template>
    </cv-tile>
  </div>
</template>
<script>
import RapidIconBar from "./rapid-icon-bar";
import { LoginButton } from "@/app/global/components";
import { assetUrl } from "@/app/global/mixins";

export default {
  name: "rapids-item",
  components: {
    RapidIconBar,
    LoginButton,
  },
  mixins: [assetUrl],
  props: {
    rapid: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      default: "grid",
    },
    firstPOI: {
      type: Boolean,
    },
  },
  data: () => ({
    showConfirmation: false,
    readMoreActive: false,
    characterLimit: 1000,
  }),
  computed: {
    editMode() {
      return this.$store.state.Global.editMode;
    },
    user() {
      return this.$store.state.User.data;
    },
    sanitizedDescription() {
      if (this.rapid) {
        return this.$cleanContent(this.rapid.description);
      }
      return null;
    },
  },
  methods: {
    triggerEdit() {
      this.$emit("rapid:edit", this.rapid);
    },
    triggerDelete() {
      this.$emit("rapid:delete", this.rapid);
    },
    triggerImageSelect() {
      this.$emit("rapid:imageSelect", this.rapid);
    },
    triggerRemoveImage() {
      this.$emit("rapid:removeImage", this.rapid);
    },
    handleToggleEditMode() {
      this.$store.dispatch("Global/toggleEditMode", !this.editMode);
    },
  },
  created() {
    if (this.firstPOI) {
      this.rapidExpanded = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.rapid-item {
  &.form-visible {
    outline: 3px solid $brand-01;
  }

  .rapid-image-actions {
    align-items: center;
    display: flex;
  }

  .bx--tile {
    margin: $spacing-md 0;

    .upload-prompt {
      display: block;
      width: 100%;
    }

    .thumbnail {
      margin-bottom: 1rem;
      height: 250px;
      width: 100%;

      img {
        background-color: $ui-05;
        height: 250px;
        object-fit: cover;
        width: 100%;
      }
    }

    .empty-block {
      align-items: center;
      background-color: $ui-03;
      display: flex;
      flex-flow: column nowrap;
      height: unset;
      padding-top: $spacing-lg;
      padding-bottom: $spacing-lg;
      justify-content: center;
      width: 100%;
    }
  }

  .bx--tile--is-expanded {
    .bx--tile-content {
      .bx--tile-content__below-the-fold {
        border-top: solid 1px $ui-03;
        margin-top: $spacing-sm;
        padding-bottom: $spacing-lg;
        padding-top: 1rem;
      }
    }
  }

  .bx--tile--expandable:hover {
    background-color: darken($ui-02, 0.05);
  }
}

.rapid-meta {
  @include carbon--type-style("code-01");
}

.description {
  @include carbon--type-style("body-long-02");
}

.top-bar {
  @include carbon--breakpoint("lg") {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>