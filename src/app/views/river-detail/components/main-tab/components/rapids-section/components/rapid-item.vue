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
          <span v-if="rapid.distance !== null" class="rapid-meta" v-text="`Distance: ${rapid.distance} mi`" />
        </div>
        <rapid-icon-bar
          :character="rapid.character"
          @rapid:edit="triggerEdit"
          @rapid:delete="triggerDelete"
        />
      </div>
      <hr class="ui-03" >
      <template>
        <div class="bx--row pt-spacing-xs">
          <div
            class="bx--col-sm-12 bx--col-lg-5"
          >
            <div class="outside">
              <div v-if="rapid.photo && rapid.photo.image" class="inside thumbnail pb-spacing-sm">
                <img
                  :src="`${baseUrl}${rapid.photo.image.uri.medium}`"
                  :alt="rapid.name"
                >
              </div>
              <div v-else class="inside thumbnail pb-spacing-sm">
                <div class="empty-block">
                  <h6>No Image</h6>
                  <!-- <a class="bx--link">Upload Media</a> -->
                </div>
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
                   <br >
                  <template v-if="!user">
                    <cv-button kind="secondary"
                               size="small"
                               class="mt-spacing-md"
                               @keydown.enter="$router.push('/user/access/login')"
                               @click.exact="$router.push('/user/access/login')">
                      Log in to add one.
                    </cv-button>
                  </template>
                  <template v-if="user && !editMode">
                    <cv-button kind="secondary"
                               size="small"
                               class="mt-spacing-md"
                               @keydown.enter="handleToggleEditMode"
                               @click.exact="handleToggleEditMode">
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
import { baseUrl } from "@/app/environment";

export default {
  name: "rapids-item",
  components: {
    RapidIconBar,
  },
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
    baseUrl: baseUrl,
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
