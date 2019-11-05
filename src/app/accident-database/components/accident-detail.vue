<template>
  <div class="accident-detail">
    <div class="bx--grid">
      <page-header
        title="Accident Database"
        :subtitle="`Report No. ${accidentId}`"
        editable
      />
      <template v-if="!loading">
        <div class="bx--row pt-lg pb-lg">
          <div class="bx--col">
            <h5 class="mb-spacing-2xs">
              Subject
            </h5>
            <h3 v-text="accident.victimname" />
          </div>
          <div
            v-if="accident.age"
            class="bx--col"
          >
            <h5 class="mb-spacing-2xs">
              Age
            </h5>
            <h3 v-text="accident.age" />
          </div>
          <div class="bx--col">
            <template v-if="accident.injuries.length > 1">
              <h5 class="mb-spacing-2xs">
                Injuries
              </h5>
              <cv-list>
                <cv-list-item
                  v-for="(k,index) in accident.injuries"
                  :key="index"
                  v-text="k.injury"
                />
              </cv-list>
            </template>
            <template v-else>
              <h5 class="mb-spacing-2xs">
                Injury
              </h5>
              <h3 v-text="accident.injuries[0].injury" />
            </template>
          </div>
          <div class="bx--col">
            <template v-if="accident.factors.length > 1">
              <h5 class="mb-spacing-2xs">
                Factors
              </h5>
              <cv-list>
                <cv-list-item
                  v-for="(k,index) in accident.factors"
                  :key="index"
                  v-text="k.facotrs"
                />
              </cv-list>
            </template>
            <template v-else>
              <h5 class="mb-spacing-2xs">
                Factor
              </h5>
              <h3 v-text="accident.factors[0].factor" />
            </template>
          </div>
          <div class="bx--col">
            <template v-if="accident.causes.length > 1">
              <h5 class="mb-spacing-2xs">
                Causes
              </h5>
              <cv-list>
                <cv-list-item
                  v-for="(k,index) in accident.causes"
                  :key="index"
                  v-text="k.cause"
                />
              </cv-list>
            </template>
            <template v-else>
              <h5 class="mb-spacing-2xs">
                Cause
              </h5>
              <h3 v-text="accident.causes[0].cause" />
            </template>
          </div>
        </div>

        <div class="bx--row">
          <div class="bx--col-sm-12 bx--col-md-8 bx--col-lg-10">
            <hr>
            <h2 class="mb-spacing-md">
              Description
            </h2>

            <template v-if="!editMode">
              <p v-html="accident.description" />
            </template>
            <template v-else>
              <content-editor :content="accident.description" />
            </template>
          </div>
          <div class="bx--col-sm-12 bx--col-md-3 bx--col-lg-6">
            <cv-tile>
              <h6
                v-if="accident.status"
                class="mb-spacing-sm"
                v-html="`Status - <span>${accident.status}</span>`"
              />
              <h6
                v-if="accident.river"
                class="mb-spacing-sm"
                @click="viewReach(accident.reach_id)"
                v-html="`River - <span class='text-underline cursor-pointer'>${accident.river}</span>`"
              />
              <h6
                v-if="accident.section"
                class="mb-spacing-sm "
                @click="viewReach(accident.reach_id)"
                v-html="`Section - <span class='text-underline cursor-pointer'>${accident.section}</span>`"
              />

              <h6
                v-if="accident.boattype"
                class="mb-spacing-sm"
                v-html="`Boat Type - <span>${accident.boattype}</span>`"
              />
              <h6
                v-if="accident.experience"
                class="mb-spacing-sm"
                v-html="`Experience - <span>${accident.experience}</span>`"
              />
              <h6
                v-if="accident.privcomm"
                class="mb-spacing-sm"
                v-html="`Trip type - <span>${accident.privcomm}</span>`"
              />
              <h6
                v-if="accident.difficulty"
                class="mb-spacing-sm"
                v-html="`Difficulty - <span>${accident.difficulty}</span>`"
              />
              <h6
                v-if="accident.location"
                class="mb-spacing-sm"
                v-html="`Location - <span>${accident.location}</span>`"
              />
              <h6
                v-if="accident.numvictims"
                class="mb-spacing-sm"
                v-html="`Num Victims - <span>${accident.numvictims}</span>`"
              />
              <h6
                v-if="accident.contactname"
                class="mb-spacing-sm"
                v-html="`Contact Name - <span>${accident.contactname}</span>`"
              />
              <h6
                v-if="accident.contactemail"
                class="mb-spacing-sm"
                v-html="`Contact Email - <span>${accident.contactemail}</span>`"
              />
              <h6
                v-if="accident.contactphone"
                class="mb-spacing-sm"
                v-html="`Contact Phone - <span>${accident.contactphone}</span>`"
              />
            </cv-tile>
          </div>
        </div>
      </template>
      <template v-else>
        <loading-block
          text=" "
          class="mt-lg"
        />
      </template>
    </div>
  </div>
</template>
<script>
/**
 * @temp this view needs to be loaded from a searchresult that has a reachid until we can query by accident Id
 *
 * @todo clean up template. try merging data into one set for the <template v-ifs>
 *
 */
import { PageHeader, ContentEditor, LoadingBlock } from "../../global/components";
export default {
  name: "ArticleDetail",
  components: {
    PageHeader,
    ContentEditor,
    LoadingBlock
  },
  computed: {
    accidentId() {
      return this.$route.params.accidentId;
    },
    accident() {
      let data = this.$store.state.accidentDatabaseState.accidentDetailData
        .data;
      if (data) {
        return data.find(a => a.id === this.accidentId);
      } else {
        return null;
      }
    },
    loading() {
      return this.$store.state.accidentDatabaseState.accidentDetailData.loading;
    },
    editMode() {
      return this.$store.state.appGlobalState.appGlobalData.editMode;
    }
  },
  methods: {
    viewReach(id) {
      this.$router.push(`/river-detail/${id}/main`)
    }
  }
};
</script>
<style lang="scss">
.accident-detail {
  h6 {
    span {
      font-weight: 400;
    }
  }
}
</style>
