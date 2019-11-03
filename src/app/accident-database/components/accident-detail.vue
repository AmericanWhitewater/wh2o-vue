<template>
  <div class="accident-detail">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading
          active
          small
          overlay
        />
      </template>
    </transition>
    <template v-if="!loading">
      <div class="bx--grid">
        <page-header
          title="Accident Database"
          :subtitle="`Report No. ${accidentId}`"
          editable
        />
        <div class="bx--row pt-lg pb-lg">
          <div class="bx--col">
            <h5 class="mb-spacing-2xs">
              Subject
            </h5>
            <h3 v-text="accident.victimname" />
          </div>
          <div class="bx--col">
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
                class="mb-spacing-sm"
                v-if="accident.status"
                v-html="`Status - <span>${accident.status}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.river"
                v-html="`River - <span>${accident.river}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.section"
                v-html="`Section - <span>${accident.section}</span>`"
              />

              <h6
                class="mb-spacing-sm"
                v-if="accident.boattype"
                v-html="`Boat Type - <span>${accident.boattype}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.experience"
                v-html="`Experience - <span>${accident.experience}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.privcomm"
                v-html="`Trip type - <span>${accident.privcomm}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.difficulty"
                v-html="`Difficulty - <span>${accident.difficulty}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.location"
                v-html="`Location - <span>${accident.location}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.numvictims"
                v-html="`Num Victims - <span>${accident.numvictims}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.contactname"
                v-html="`Contact Name - <span>${accident.contactname}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.contactemail"
                v-html="`Contact Email - <span>${accident.contactemail}</span>`"
              />
              <h6
                class="mb-spacing-sm"
                v-if="accident.contactphone"
                v-html="`Contact Phone - <span>${accident.contactphone}</span>`"
              />
            </cv-tile>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
/**
 * @temp this view needs to be loaded from a searchresult that has a reachid until we can query by accident Id
 *
 * @todo clean up template. try merging data into one set for the <template v-ifs>
 *
 */
import { PageHeader, ContentEditor } from "../../global/components";
export default {
  name: "ArticleDetail",
  components: {
    PageHeader,
    ContentEditor
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
  methods: {}
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
