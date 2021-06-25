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
    <Calendar :dataSource="calendarData" :year="year" :renderStyle="'custom'"
              :customDataSourceRenderer="e => e.style.backgroundColor = '#52765370'"
              @mouse-on-day="mouseOnDay" @mouse-out-day="mouseOutDay" 
              @year-changed="handleYearChange"
    />  
  </section>
</template>
<script>
import { mapState } from "vuex"
import Calendar from 'v-year-calendar'
// import '@/../js-year-calendar/dist/js-year-calendar.css'

export default {
  name: "releases-calendar",
  components: {
    Calendar
  },
  computed: {
    ...mapState({
      data: state => state.RiverEvents.data,
      year: state => state.RiverEvents.year,
    }),
    releases() {
      return this.$store.getters['RiverEvents/releaseDates']
    },
    calendarData() {
      return this.$store.getters['RiverEvents/calendarData']
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
        this.$store.commit('RiverEvents/SET_CALENDAR_YEAR', {
          year: date.getFullYear()
        })
      }
    }
  },
  methods: {
    handleYearChange({currentYear}){
      this.$store.commit('RiverEvents/SET_CALENDAR_YEAR', {
        year: currentYear
      })
    },
    tableView(){
      this.$emit("tableView")
    },
    mouseOnDay(e) {
      if (e.events.length > 0) {
      
        e.element.style.position = "relative"
        const tooltip = document.createElement("div")
        tooltip.className = "tooltip"
        if(!(e.element.offsetLeft/window.pageYOffset < .5)){
          tooltip.style.right = 0
        }
      
        for (let i in e.events) {
          const title = document.createElement("h5")
          const hr = document.createElement("hr")
          const startTime = document.createElement("p")
          const endTime = document.createElement("p")
          const maxFlow = document.createElement("p")
          const minFlow = document.createElement("p")
          title.textContent = "Release Info"
          startTime.textContent = "Start Time: " + e.events[i].startTime
          endTime.textContent = "End Time: " + e.events[i].endTime
          minFlow.textContent = "Min Flow: " + e.events[i].minFlow
          maxFlow.textContent = "Max Flow: " + e.events[i].maxFlow
          tooltip.appendChild(title)
          tooltip.appendChild(hr)
          tooltip.appendChild(startTime)
          tooltip.appendChild(endTime)
          tooltip.appendChild(maxFlow)
          tooltip.appendChild(minFlow)
        }
        e.element.appendChild(tooltip)
      }
    },
    mouseOutDay(e) {
      while (e.element.childNodes.length > 1) {
        e.element.removeChild(e.element.lastChild);
      }
    }
  },

};

</script>
<style lang="scss">
@import "~js-year-calendar/dist/js-year-calendar.css";
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
  td.day {
    .tooltip {
      position: absolute;
      background-color: #ededed;
      border-radius: 5%;
      border: solid #527653 2px;
      padding: 7px;
      width: max-content;
      p {
        margin: 5px;
      }
      hr {
        width: auto;
        margin: 6px 0 2px;
        border-width: 1px;
      }
    }
  }
}

</style>