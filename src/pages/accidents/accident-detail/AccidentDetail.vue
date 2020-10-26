<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div v-if="accident && !newReport">
        <div class="subtitle-1">ID: {{ accident.id }}</div>
        <div class="display-1">{{ $t('accidentReport') }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <div v-else>
        <div class="display-1">New Accident ?</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="datePickerActive"
          :close-on-content-click="false"
          :return-value.sync="formAccident.accidentdate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formAccident.accidentdate"
              label="Accident Date"
              readonly
              required
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formAccident.accidentdate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="datePickerActive = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(formAccident.accidentdate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field v-model="formAccident.age" label="Age" class="mb-2" />
      </v-col>
      <v-col>
        <v-select
          v-model="formAccident.boattype"
          :items="formattedBoatTypes"
          label="Boat Type"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select v-model="formAccident.cause" :items="formattedCauses" label="Cause" class="mb-2" />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formAccident.contactemail"
          label="Contact Email"
          class="mb-2"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formAccident.contactname"
          label="Contact Name"
          class="mb-2"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="formAccident.contactphone"
          label="Contact Phone"
          class="mb-2"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formAccident.countryabbr"
          label="Country"
          class="mb-2"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-model="formAccident.description"
          label="Description"
          class="mb-2"
        />
        <v-btn @click="handleSumbit"> Submit </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { newAccidentReport } from './controllers'
export default {
  name: 'AccidentDetail',
  data: () => ({
    datePickerActive: false,
    breadcrumbs: [
      {
        text: 'Accidents',
        to: '/accidents/list',
        exact: true
      },
      {
        text: 'Edit Accident'
      }
    ],
    formAccident: {}
  }),
  watch: {
    accident(val) {
      if (val) {
        this.setInitialValues()
      }
    }
  },
  computed: {
    ...mapState({
      accident: (state) => state.AccidentDetail.data,
      loading: (state) => state.AccidentDetail.loading,
      error: (state) => state.AccidentDetail.error,
      boatTypes: (state) => state.BoatTypes.data,
      causes: (state) => state.Causes.data,
      states: (state) => state.States.data
    }),
    newReport() {
      return !!this.$route.query.new
    },
    formattedBoatTypes() {
      if (this.boatTypes) {
        return this.boatTypes.map((type) => ({
          value: Number(type.id),
          text: type.description
        }))
      }

      return null
    },
    formattedCauses() {
      if (this.causes) {
        return this.causes.map((cause) => ({
          text: cause.cause,
          value: Number(cause.id)
        }))
      }

      return null
    }
  },
  created() {

    if (!this.states) {
      this.$store.dispatch('States/getProperty', {
        url: '/states'
      })
    }
    
    if (!this.boatTypes) {
      this.$store.dispatch('BoatTypes/getProperty', {
        url: '/boat-types'
      })
    }
    if (!this.causes) {
      this.$store.dispatch('Causes/getProperty', {
        url: '/causes'
      })
    }
  },
  mounted() {
    this.setEmptyForm()
  },
  methods: {
    async handleSumbit() {
      try {
        const result = await newAccidentReport({ ...this.formAccident })

        console.log('result :>> ', result)
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
    setInitialValues() {
      this.formAccident = { ...this.accident }
    },
    load() {
      this.$store.dispatch('AccidentDetail/getProperty', {
        url: `/accident?id=${this.$route.params.id}`
      })
    },
    setEmptyForm() {
      const emptyValues = {
        accidentdate: null,
        victimname: null,
        reachid: null,
        countryabbr: null,
        state: null,
        river: null,
        section: null,
        location: null,
        waterlevel: null,
        rellevel: null,
        difficulty: null,
        age: null,
        experience: null,
        privcomm: null,
        boattype: null,
        groupinfo: null,
        numvictims: null,
        othervictimnames: null,
        description: null,
        type: null,
        cause: null,
        contactname: null,
        contactphone: null,
        contactemail: null,
        status: null
      }

      Object.assign(this.formAccident,emptyValues)
    }
  }
}
</script>
