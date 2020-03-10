<template>
  <div class="beta-box mb-md">
    <table
      v-if="!loading"
      class="bx--data-table bx--data-table--zebra"
    >
      <tr>
        <td>Difficulty</td>
        <td v-text="river.class" />
      </tr>
      <tr>
        <td>Length</td>
        <td v-text="river.length" />
      </tr>
      <tr>
        <td>Avg Gradient</td>
        <td v-text="river.avggradient" />
      </tr>
      <tr>
        <td>Gage</td>
        <td v-if="!gages">
          n/a
        </td>
        <td v-if="gages.length">
          {{ $titleCase(gages[0].gauge.name) }}
        </td>
      </tr>
      <tr>
        <td>Flow Range</td>

        <td v-if="gages.length">
          {{ `${gages[0].rmin} - ${gages[0].rmax}` }}
        </td>
        <td v-else>
          n/a
        </td>
      </tr>
      <tr>
        <td>
          Flow Rate
          <template v-if="gages.length">
            as of {{ gages[0].last_gauge_updated }}
          </template>
        </td>

        <td v-if="gages.length">
          {{ gages[0].last_gauge_reading }}
        </td>
        <td v-else>
          n/a
        </td>
      </tr>
      <tr>
        <td>Reach Info Last Updated</td>
        <td v-text="formatDate(river.edited)" />
      </tr>
    </table>

    <div
      v-if="editMode"
      class="edit-overlay"
      @click="editModalVisible = true"
    >
      <h3>Edit Beta Box</h3>
    </div>
    <cv-modal
      :visible="editModalVisible"
      size="small"
      :primary-button-disabled="false"
      auto-hide-off
      @primary-click="editModalVisible = false"
      @secondary-click="editModalVisible = false"
      @modal-hide-request="editModalVisible = false"
    >
      <template slot="title">
        Edit Beta Box
      </template>
      <template slot="content">
        <cv-dropdown
          v-model="formData.primaryGage"
          class="cv-dropdown mb-spacing-md"
          label="Primary Gage"
          theme="light"
        >
          <cv-dropdown-item value="10">
            Option 1
          </cv-dropdown-item>
          <cv-dropdown-item value="20">
            Option 2
          </cv-dropdown-item>
          <cv-dropdown-item value="30">
            Option 3
          </cv-dropdown-item>
        </cv-dropdown>
        <cv-text-input
          v-model="formData.val03"
          theme="light"
          label="Another field"
          class="mb-spacing-md"
        />
        <cv-number-input
          v-model="formData.length"
          class="mb-spacing-md"
          label="Length"
        />
        <cv-text-input
          v-model="formData.val01"
          theme="light"
          label="Another field"
          class="mb-spacing-md"
        />
        <cv-text-input
          v-model="formData.val02"
          theme="light"
          label="Another field"
          class="mb-spacing-md"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Save
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Moment from 'moment'
/**
 * @todo if reach has multiple gages, add dropdown to
 * gage tr, v-model+watch+fetch.gageActions.FETCH_GAGE_DATA and make other table values reactive
 *
 */
export default {
  name: 'BetaBox',
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data: () => ({
    editModalVisible: false,
    formData: {}
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      river: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error,
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      gages: state => state.riverDetailState.reachGagesData.data
    })
  },
  methods: {
    formatDate (input) {
      return Moment(input, 'MMM Do YY').format('ll')
    },
    setInitialFormData () {
      this.formData.class = this.river.class
    }
  }
}
</script>
<style lang="scss" scoped>
.beta-box {
  max-width: 100%;
  overflow-x: scroll;
  position: relative;
  overflow: hidden;
  z-index: 1;
  .edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba($ui-02, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
td {
  vertical-align: middle;
  background-color: transparent;
}
tr {
  @include ease;
  &:hover,
  &:focus {
    background-color: $ui-02;
  }
}
</style>
