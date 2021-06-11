<template>
  <section v-if="data && releases && releases.length" class='mt-lg mb-lg'>
    <hr>
    <h2 class="mb-sm">
      Release Calendar
    </h2>
    <a
          @click.exact="tableView"
      >
        Switch to Table View
    </a>
    <div class="date-picker">
      <div class="month">
        <label for="month">Month:</label>
        <cv-button kind="secondary"
                  size="small"
                  @click="decrementMonth"
              >
          prev
        </cv-button>
        <h4>
          {{["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","Novemeber", "December"][month]}}
        </h4>        
        <cv-button kind="secondary"
                  size="small"
                  @click="incrementMonth"
              >
          next
        </cv-button>
      </div>
      <div class="year">
        <label for="year">Year:</label>
        <cv-button kind="secondary"
                  size="small"
                  @click="decrementYear"
              >
          prev
        </cv-button>
        <h4 v-text="year"/>
        <cv-button kind="secondary"
                  size="small"
                  @click="incrementYear"
              >
          next
        </cv-button>
      </div>
     
    </div>
    <div>
      <section v-if="data && calendar && calendar.length">
        <table>
          <thead>
            <tr>
              <th>
                Sun
              </th>
              <th>
                Mon
              </th>
              <th>
                Tue
              </th>
              <th>
                Wed
              </th>
              <th>
                Thu
              </th>
              <th>
                Fri
              </th>
              <th>
                Sat
              </th>
            </tr>
          </thead>
          <tbody  >
            <tr v-for="week in calendar.length" :key="week">
              <td v-for="day in calendar[week - 1].length" :key="day" class="calendar-day" >
                <p :class="calendar[week - 1][day - 1].release !== 'no release' ? 'release-day' : null">
                  {{ calendar[week - 1][day - 1].day.getDate() }}
                </p>
                <div v-if="calendar[week - 1][day - 1].release !== 'no release'" 
                     class="release-info">
                  <div>Release</div>
                  <div>Start Time: {{calendar[week - 1][day - 1].release.start_time}}</div>
                  <div>End Time: {{calendar[week - 1][day - 1].release.end_time}}</div> 
                  <div>Min Flow: {{calendar[week - 1][day - 1].release.min}} CFS</div>
                  <div>Max Flow: {{calendar[week - 1][day - 1].release.max}} CFS</div>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>   
  </section>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "releases-calendar",
  computed: {
    ...mapState({
      data: state => state.RiverEvents.data,
      year: state => state.RiverEvents.year,
      month: state => state.RiverEvents.month,
    }),
    releases() {
      return this.$store.getters['RiverEvents/releaseDates']
    },
    calendar() {
      return this.$store.getters['RiverEvents/calendar']
    },
    closest() {
        return this.$store.getters['RiverEvents/nextOrClosestReleaseDate']
    },
  },
  watch: {
    closest: {
      immediate: true,
      handler (){
        const date = new Date(this.closest.event_date)
        this.$store.commit('RiverEvents/SET_CALENDAR_DATE', {
          year: date.getFullYear(), month:  date.getMonth()
        })
      }
    }
  },
  methods: {
    incrementMonth () {
      this.$store.commit('RiverEvents/SET_CALENDAR_DATE', {
        year: this.year, month:  this.month < 11 ? this.month + 1 : 0
      })
    },
    decrementMonth () {
      this.$store.commit('RiverEvents/SET_CALENDAR_DATE', {
        year: this.year, month:  this.month > 0 ? this.month - 1 : 11
      })
    },
    incrementYear () {
      this.$store.commit('RiverEvents/SET_CALENDAR_DATE', {
        year: this.year + 1, month:  this.month
      })
    },
    decrementYear () {
      this.$store.commit('RiverEvents/SET_CALENDAR_DATE', {
        year: this.year - 1, month:  this.month
      })
    },
    tableView(){
      this.$emit("tableView")
    }
  },

};

</script>
<style lang="scss">
section {
  a {
    cursor:pointer;
  }
  .date-picker {
    display: flex;
    h4 {
      display: inline;
    }
    label {
      display: block;
      margin: 10px;
      text-decoration: underline;
    }
    input {
      height: 32px;
    }
    input.year {
      width: 60px;
    }
    input.month {
      width: 40px;
    }
    button {
      padding: 0 10px;
      margin: 0 10px;
    }
  }
  table {
    th {
      padding: 30px 0;
    }
    .calendar-day {
      padding: 0 20px;
      text-align: center;
      position: relative;
      .release-day {
        border-radius: 50%;
        background-color: #6d8f6d40;
        padding: 5px;
        width: 30px;
      }
      .release-info {
        visibility: hidden;
        position: absolute;
        z-index: 1;
      }
      p {
        padding: 6px;
      }
    }
    .calendar-day:hover {
      .release-info {
        visibility: visible;
        background-color: white;
        width: max-content;
        border: solid #537653 2px;
        padding: 5px;
        div {
          margin: 5px;
        }
      }
    }
  }
}

</style>