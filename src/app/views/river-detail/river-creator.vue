<template>
  <div class="river-creator">
    <div class="bx--grid">
      <template v-if="userLoading">
        <div class="bx--row">
          <div class="bx--col">
            <utility-block state="loading" hide-text />
          </div>
        </div>
      </template>
      <template v-else-if="user ">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-lg-10 map-column">
            <geometry-editor @updatedGeom="updateReachGeom" />
          </div>
          <div class="bx--col-sm-16 bx--col-lg-6 form-fields-column">
            <h1 class="mb-sm mt-spacing-sm">New Reach</h1>
             <cv-inline-notification

        v-if="!canCreateReach && !noticeHidden "
        kind="warning"
        title="Cannot create river" :sub-title="errorMessage"
        @close="noticeHidden = true"
      />
            <p v-if="!canCreate" >You must draw the river in a place you are allowed to edit.</p>
            <cv-text-input
              v-model="reach.river"
              label="River"
              class="mb-spacing-md"
            />
            <cv-text-input
              v-model="reach.altname"
              label="Alt River Name"
              class="mb-spacing-md"
            />
            <cv-text-input
              v-model="reach.section"
              label="Section"
              class="mb-spacing-md"
            />
            <cv-select
              v-model="reach.class"
              label="Class"
              class="mb-spacing-md"
            >
              <cv-select-option
                v-for="item in reachClasses"
                :key="item"
                :value="item"
              >
                {{ item }}
              </cv-select-option>
            </cv-select>
            <label for="Content Editor" class="bx--label">Description</label>
            <content-editor
              :content="!reach.description ? ' ' : reach.description"
              show-control-bar
              @content:updated="reach.description = $event"
            />
            <div class="mb-spacing-md mt-spacing-md" />
            <cv-link
              @click="additionalFieldsVisible = !additionalFieldsVisible"
              @keydown.enter="
                additionalFieldsVisible = !additionalFieldsVisible
              "
            >
              {{
                `${additionalFieldsVisible ? "Hide" : "Show"} Additional Fields`
              }}
            </cv-link>
            <div class="mb-spacing-lg" />
            <template v-if="additionalFieldsVisible">
              <cv-text-input
                v-model="reach.agency"
                label="Agency"
                class="mb-spacing-md"
              />
              <cv-text-input
                v-model="reach.county"
                label="County"
                class="mb-spacing-md"
              />
              <cv-text-input
                v-model="reach.zipcode"
                label="Zipcode"
                class="mb-spacing-md"
              />
              <cv-text-input
                v-model="reach.permiturl"
                label="Permit URL"
                class="mb-spacing-md"
              />
              <cv-text-input
                v-model="reach.permitinfo"
                label="Permit Info"
                class="mb-spacing-md"
              />
              <cv-text-input
                v-model="reach.avggradient"
                label="Average Gradient"
                class="mb-spacing-md"
              />
              <cv-text-input v-model="reach.maxgradient" label="Max Gradient" />
              <div class="mb-spacing-lg" />
            </template>
            <cv-button-set>
              <cv-button
                :disabled="createLoading || !canCreate"
                @click.exact="handleSubmit"
                @keydown.enter="handleSubmit"
              >
                Submit
              </cv-button>

            </cv-button-set>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bx--row">
          <div class="bx--col">
            <utility-block state="error" text="Unauthorized" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { createReach } from "@/app/services";
import { reachClasses } from "@/app/global/mixins";
import turfLength from "@turf/length";
import GeometryEditor from "@/app/views/river-detail/components/geometry-edit-modal/components/geometry-editor.vue";
import ContentEditor from "@/app/global/components/content-editor/content-editor.vue";
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import { canCreateReach } from '@/app/services/canCreateReach'
export default {
  name: "river-creator",
  components: {
    GeometryEditor,
    ContentEditor,
    UtilityBlock,
  },
  mixins: [reachClasses],
  data: () => ({
    geom: null,
    createLoading: false,
    canCreateReach: false,
    noticeHidden: false,
    additionalFieldsVisible: false,
    reach: {
      agency: null,
      altname: null,
      class: "none",
      county: null,
      description: null,
      geom: null,
      length: null,
      permitinfo: null,
      permiturl: null,
      ploc: null,
      river: null,
      section: null,
      tloc: null,
      zipcode: null,
      status: "v", // v means 'verified' or published
    },
  }),
  computed: {
    ...mapState({
      userLoading: (state) => state.User.loading,
      user: (state) => state.User.data,
    }),
    errorMessage(){
      if(this.reach.ploc && !this.canCreateReach)
      {
        return('River drawn evidently is not in an area you area allowed to creat reaches in, try another state or region.')
      }
      else {
        return('River must be drawn since permission to submit a reach is determined by location in the country')
      }

    },
    reachLength() {
      if (this.geom) {
        return Number(turfLength(this.geom, { units: "miles" }).toPrecision(2));
      } else {
        return undefined;
      }
    },
    canCreate() {
      if (this.user && this.canCreateReach) {
        return this.canCreateReach
      }
      return false;
    },
  },
  methods: {
    async updateReachGeom(val) {
      this.geom = val;

      if (val)
      {
        this.reach.geom = val.geometry;
        this.reach.ploc = val.geometry.coordinates[0];
        this.reach.tloc = val.geometry.coordinates.slice(-1)[0];
        this.reach.length = this.reachLength;

        this.canCreateReach = await canCreateReach({plon:this.reach.ploc[0],plat:this.reach.ploc[1]})

      }
      //handle the clear case
      else
      {
        this.reach.geom = null;
        this.reach.ploc = null;
        this.reach.tloc = null;
        this.reach.length = undefined;
        this.canCreateReach = false;
      }
    },
    async handleSubmit() {
      try {
        this.createLoading = true;
        const result = await createReach({
          id: this.$randomId(),
          reach: this.reach,
        });

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Success",
            subtitle: "Reach created.",
          });
          this.$router.push(`/river-detail/${result.data.reachUpdate.id}`);
        } else {
          this.$store.dispatch("Global/sendToast", {
            kind: "error",
            title: "Error",
            subtitle:
              "Failed to Create New Reach: " +
              Object.keys(result.errors)
                .map((x) => result.errors[x]?.message ?? "")
                .join(","),
          });
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          kind: "error",
          title:
            "Error: " +
            (error?.message
              ? error.message
              : Object.keys(error)
                  .map((x) => error[x]?.message ?? "")
                  .join(",")),
          text: "Something went wrong.",
        });
      } finally {
        this.createLoading = false;
      }
    },
  },
  created() {
    this.$store.dispatch("RiverDetail/dataReset");
  },
};
</script>

<style lang="scss">
.river-creator {
  .form-fields-column,
  .map-column {
    order: 2;
    padding-top: 1rem;

    @include carbon--breakpoint("sm") {
      height: calc(80vh - 50px);
    }

    @include carbon--breakpoint("md") {
      height: calc(100vh - 50px);
    }

    @include carbon--breakpoint("lg") {
      order: 1;
    }
  }

  .form-fields-column {
    order: 1;
    overflow-y: scroll;
    padding-bottom: 3rem;

    @include carbon--breakpoint("sm") {
      padding-right: 2%;
    }

    @include carbon--breakpoint("md") {
      padding-right: 4%;
    }

    @include carbon--breakpoint("lg") {
      order: 2;
    }
  }
}
</style>
