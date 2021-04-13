<template>
  <div class="river-creator">
    <div class="bx--grid">
      <template v-if="userLoading">
        <div class="bx--row">
          <div class="bx--col">
            <utility-block hide-text state="loading"/>
          </div>
        </div>
      </template>
      <template v-else-if="user && canCreate">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-lg-10 map-column">
            <geometry-editor @updatedGeom="updateReachGeom"/>
          </div>
          <div class="bx--col-sm-16 bx--col-lg-6 form-fields-column">
            <h1 class="mb-sm mt-spacing-sm">New Reach</h1>
            <cv-text-input
                v-model="reach.river"
                class="mb-spacing-md"
                label="River"
            />
            <cv-text-input
                v-model="reach.altname"
                class="mb-spacing-md"
                label="Alt River Name"
            />
            <cv-text-input
                v-model="reach.section"
                class="mb-spacing-md"
                label="Section"
            />
            <cv-select
                v-model="reach.class"
                class="mb-spacing-md"
                label="Class"
            >
              <cv-select-option
                  v-for="item in reachClasses"
                  :key="item"
                  :value="item"
              >
                {{ item }}
              </cv-select-option>
            </cv-select>
            <label class="bx--label" for="Content Editor">Description</label>
            <content-editor
                :content="!reach.description ? ' ' : reach.description"
                show-control-bar
                @content:updated="reach.description = $event"
            />
            <div class="mb-spacing-md mt-spacing-md"/>
            <cv-link
                @click="additionalFieldsVisible = !additionalFieldsVisible"
                @keydown.enter="
                additionalFieldsVisible = !additionalFieldsVisible
              "
            >
              {{
                `${additionalFieldsVisible ? 'Hide' : 'Show'} Additional Fields`
              }}
            </cv-link>
            <div class="mb-spacing-lg"/>
            <template v-if="additionalFieldsVisible">
              <cv-text-input
                  v-model="reach.agency"
                  class="mb-spacing-md"
                  label="Agency"
              />
              <cv-text-input
                  v-model="reach.county"
                  class="mb-spacing-md"
                  label="County"
              />
              <cv-text-input
                  v-model="reach.zipcode"
                  class="mb-spacing-md"
                  label="Zipcode"
              />
              <cv-text-input
                  v-model="reach.length"
                  class="mb-spacing-md"
                  label="Length"
              />
              <cv-text-input
                  v-model="reach.permiturl"
                  class="mb-spacing-md"
                  label="Permit URL"
              />
              <cv-text-input
                  v-model="reach.permitinfo"
                  class="mb-spacing-md"
                  label="Permit Info"
              />
              <cv-text-input
                  v-model="reach.avggradient"
                  class="mb-spacing-md"
                  label="Average Gradient"
              />
              <cv-text-input v-model="reach.maxgradient" label="Max Gradient"/>
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
      </template>
      <template v-else>
        <div class="bx--row">
          <div class="bx--col">
            <utility-block state="error" text="Unauthorized"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { createReach } from '@/app/services'
import { reachClasses } from '@/app/global/mixins'
import turfLength from '@turf/length'
import GeometryEditor from '@/app/views/river-detail/components/geometry-edit-modal/components/geometry-editor.vue'
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'

export default {
  name: 'river-creator',
  components: {
    GeometryEditor,
    ContentEditor,
    UtilityBlock,
  },
  mixins: [reachClasses],
  data: () => ({
    geom: null,
    createLoading: false,
    additionalFieldsVisible: false,
    reach: {
      agency: '',
      altname: '',
      class: 'none',
      county: '',
      description: null,
      gaugeinfo: '',
      geom: null,
      length: '',
      permitinfo: '',
      permiturl: '',
      ploc: '',
      river: '',
      section: '',
      tloc: '',
      zipcode: '',
      status: 'v', // v means 'verified' or published
    },
  }),
  computed: {
    ...mapState({
      userLoading: (state) => state.User.loading,
      user: (state) => state.User.data,
    }),
    reachLength () {
      if (this.geom) {
        return Number(turfLength(this.geom, { units: 'miles' }).toPrecision(2))
      } else {
        return undefined
      }
    },
    canCreate () {
      if (this.user) {
        return (
            this.user.permissions.includes('sk') ||
            this.user.permissions.includes('rsk') ||
            this.user.permissions.includes('ssk') ||
            this.user.permissions.includes('ask') ||
            this.user.permissions.includes('admin')
        )
      }
      return false
    },
  },
  methods: {
    updateReachGeom (val) {
      this.geom = val

      this.reach.geom = val.geometry
      this.reach.ploc = val.geometry.coordinates[0]
      this.reach.tloc = val.geometry.coordinates.slice(-1)[0]
      this.reach.length = this.reachLength
    },
    async handleSubmit () {
      try {
        this.createLoading = true
        const result = await createReach({

          reach: this.reach,
        })

        if (!result.errors) {
          this.$store.dispatch('Global/sendToast', {
            kind: 'success',
            title: 'Success',
            subtitle: 'Reach created.',
          })
          this.$router.push(`/river-detail/${result.data.reachUpdate.id}`)
        } else {

          this.$store.dispatch('Global/sendToast', {
            kind: 'error',
            title: 'Error',
            subtitle: 'Failed to Create New Reach: ' + (Object.keys(result.errors).map(x => result.errors[x]?.message ?? '').join(','))
          })
        }
      } catch (error) {

        this.$store.dispatch('Global/sendToast', {
          kind: 'error',
          title: 'Error: ' + (error?.message ? error.message : (Object.keys(error).map(x => error[x]?.message ?? '').join(','))),
          text: 'Something went wrong.',
        })
      } finally {
        this.createLoading = false
      }
    },
  },
  created () {
    this.$store.dispatch('RiverDetail/dataReset')
  },
}
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
      order: 1
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
      order: 2
    }
  }
}

</style>
