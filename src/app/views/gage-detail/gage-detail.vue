<template>
  <div class="gage-detail">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          loading
        </template>
        <template v-else-if="data">
          <page-banner :title="data.name" />
          <div class="bx--data-table-container">
            <table class="bx--data-table">
              <tbody>
                <tr>
                  <td>
                    Enabled
                  </td>
                  <td>
                    {{ data.enabled }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Source
                  </td>
                  <td>
                    {{ data.source }}
                  </td>
                </tr>
                <tr>
                  <td>
                    State
                  </td>
                  <td>
                    {{ data.state }}
                  </td>
                </tr>
                <tr>
                  <td>Timezone</td>
                  <td>
                    {{ data.timezone }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          error
        </template>
      </template>
    </layout>
  </div>
</template>
<script>

/**
 * @description single gage description.
 *
 */

import { mapState } from 'vuex'
import { gageDetailActions } from './shared/state'
import { Layout } from '@/app/global/layout'
import { PageBanner } from '@/app/global/components'

export default {
  name: 'gage-detail',
  components: {
    Layout,
    PageBanner
  },
  computed: {
    ...mapState({
      loading: state => state.gageDetailState.gageDetailData.loading,
      data: state => state.gageDetailState.gageDetailData.data,
      error: state => state.gageDetailState.gageDetailData.error
    })
  },
  created () {
    this.$store.dispatch(gageDetailActions.FETCH_GAGE_DATA, this.$route.params.gageId)
  }
}
</script>
