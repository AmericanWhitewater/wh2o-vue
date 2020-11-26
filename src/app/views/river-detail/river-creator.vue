<template>
  <div class="river-creator">
    <div class="bx--grid">
      <div class="bx--row">
        <div
          class="bx--col-sm-16 bx--col-lg-10 map-column"
        >
          <geometry-editor @updatedGeom="updateReachGeom" />
        </div>
        <div class="bx--col-sm-16 bx--col-lg-6 form-fields-column">
          <h1 class="mb-sm mt-spacing-sm">New Reach</h1>
          <cv-text-input
            v-model="reach.river"
            label="River"
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
              v-for="item in $options.reachClasses"
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
              @content:updated="reach.description = $event" />
          <cv-text-input
            v-model="reach.gaugeinfo"
            label="Gage Info"
            class="mb-spacing-md mt-spacing-md"
          />

          <cv-link
            @click="additionalFieldsVisible = !additionalFieldsVisible"
            @keydown.enter="additionalFieldsVisible = !additionalFieldsVisible"
          >
            {{
              `${additionalFieldsVisible ? "Hide" : "Show"} Additional Fields`
            }}
          </cv-link>
          <div class="mb-spacing-lg"/>
          <template v-if="additionalFieldsVisible">
            <cv-text-input
              v-model="reach.altname"
              label="Alt Name"
              class="mb-spacing-md"
            />
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
              v-model="reach.length"
              label="Length"
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
            <div class="mb-spacing-lg"/>
          </template>
          <cv-button-set>
          <cv-button
            :disabled="createLoading"
            @click.exact="handleSubmit"
            @keydown.enter="handleSubmit"
          >
            Submit
          </cv-button>
          </cv-button-set>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import { createReach } from "@/app/services";
import turfLength from '@turf/length'
import GeometryEditor from "@/app/views/river-detail/components/geometry-edit-modal/components/geometry-editor.vue"
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
export default {
  name: "river-creator",
  components: {
    GeometryEditor,
    ContentEditor
  },
  /* eslint-disable-next-line max-len */
  reachClasses: [
    "none",
    "I",
    "I(II)",
    "I(III)",
    "I(IV)",
    "I(V)",
    "I(V+)",
    "I-II",
    "I-II(III)",
    "I-II(IV)",
    "I-II(V)",
    "I-II(V+)",
    "II",
    "II(III)",
    "II(IV)",
    "II(V)",
    "II(V+)",
    "I-II+(III)",
    "I-II+(IV)",
    "I-II+(V)",
    "I-II+(V+)",
    "II+",
    "II+(III)",
    "II+(IV)",
    "II+(V)",
    "II+(V+)",
    "I-III",
    "I-III(IV)",
    "I-III(V)",
    "I-III(V+)",
    "II-III",
    "II-III(IV)",
    "II-III(V)",
    "II-III(V+)",
    "III",
    "I-III+",
    "I-III+(IV)",
    "I-III+(V)",
    "I-III+(V+)",
    "II-III+",
    "II-III+(IV)",
    "II-III+(V)",
    "II-III+(V+)",
    "III+",
    "III+(IV)",
    "III+(V)",
    "III+(V+)",
    "I-IV",
    "I-IV(V)",
    "I-IV(V+)",
    "II-IV",
    "II-IV(V)",
    "II-IV(V+)",
    "III-IV",
    "III-IV(V)",
    "III-IV(V+)",
    "IV",
    "IV(V)",
    "IV(V+)",
    "I-IV+",
    "I-IV+(V)",
    "I-IV+(V+)",
    "II-IV+",
    "II-IV+(V)",
    "II-IV+(V+)",
    "III-IV+",
    "III-IV+(V)",
    "III-IV+(V+)",
    "IV+",
    "I-V",
    "I-V(V+)",
    "II-V",
    "II-V(V+)",
    "III-V",
    "III-V(V+)",
    "IV-V",
    "IV-V(V+)",
    "V",
    "II-V+",
    "III-V+",
    "IV-V+",
    "V+",
  ],
  data: () => ({
    geom: null,
    createLoading: false,
    additionalFieldsVisible: false,
    reach: {
      river: "",
      section: "",
      geom: null,
      altname: "",
      county: "",
      zipcode: "",
      length: "",
      agency: "",
      gaugeinfo: "",
      description: null,
      permitid: "",
      class: "none",
      ploc: "",
      tloc: "",
      permiturl: "",
      permitinfo: "",
    },
  }),
  computed: {
    reachLength () {
          if (this.geom) {
            return Number(turfLength(this.geom, { units: 'miles' }).toPrecision(2))
          } else {
            return undefined
          }
        },
  },
  methods: {
    updateReachGeom(val) {
      this.geom = val
      
      this.reach.geom = val.geometry
      this.reach.ploc = val.geometry.coordinates[0]
      this.reach.tloc = val.geometry.coordinates.slice(-1)[0]
      this.reach.length = this.reachLength
    },
    async handleSubmit() {
      try {
        this.createLoading = true;
        const result = await createReach({
          id: null,
          reach: this.reach
        });

        if (!result.errors) {

          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Success",
            text: "Reach created.",
          });
          this.$router.push(`/river-detail/${result.id}`);
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          kind: "error",
          title: "Error",
          text: "Something went wrong.",
        });
      } finally {
        this.createLoading = false;
      }
    },
  },
  created() {
    this.$store.dispatch('RiverDetail/dataReset')
  }
};
</script>