<template>
  <div class="accident-database mb-xl">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md">Accident Database</h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/"> Home </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Trip Reports </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="user">
              <cv-button
                size="small"
                @click.exact="reportModalVisible = true"
                @keydown.enter="reportModalVisible = true"
              >
                Submit Report
              </cv-button>
            </div>
          </header>
          <utility-block
            img="https://www.americanwhitewater.org/photos/archive/19278.jpg"
            hide-text
            state="content"
            theme="dark"
          />
          <page-description
            description="The American Whitewater Accident Database catalogs over 1600 fatalities and close calls on whitewater rivers dating back to 1972. The project was initiated over 40 years ago, in 1975 when a fatality occurred due to foot entrapment at a slalom race."
          />
        </div>
      </div>
    </div>
    <cv-modal :visible="reportModalVisible" @modal-hidden="reportModalVisible = false">
      <template #title>
        New Accident Report
      </template>
      <template #content>
        content
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {PageDescription, UtilityBlock} from "@/app/global/components"
export default {
  name: 'accidents',
  components: {
    PageDescription,
    UtilityBlock
  },
  data: () => ({
    reportModalVisible: false,
    form: {
      
    }
  }),
  computed: {
    ...mapState({
      data: state => state.Accidents.data,
      loading: state => state.Accidents.loading,
      error: state => state.Accidents.error,
      user: state => state.User.data
    })
  },
  created () {
    if (!this.data) {
      this.$store.dispatch('Accidents/getProperty')
    }
  }
}
</script>
