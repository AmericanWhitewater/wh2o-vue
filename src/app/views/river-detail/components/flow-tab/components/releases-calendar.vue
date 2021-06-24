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
  .calendar {
    padding: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    direction: ltr;
    overflow-x: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:after {
      /* Apply the right height on the calendar div, even if the months elements are floating  */
      clear: both;
      content: "";
      display:block;
    }

    .calendar-rtl {
      direction: rtl;

      .calendar-rtl table tr td span {
        float: right;
      }
    }

    table {
      margin: auto;
      border-spacing: 0;

      td,
      th {
        text-align: center;
        width: 20px;
        height: 20px;
        border: none;
        padding: 4px 5px;
        font-size:12px;
      }
    }

    /* Header */
    .calendar-header
    {
      width:100%;
      margin-bottom:20px;
      border: 1px solid #ddd;

      table {
        width:100%;

        th {
          font-size:22px;
          padding:5px 10px;
          cursor: pointer;

          &:hover {
            background: #eeeeee;
          }

          &.disabled,
          &.disabled:hover {
            background: none;
            cursor: default;
            color:white;
          }

          &.prev,
          &.next {
            width: 20px;
          }
        }
      }

      .year-title {
        font-weight:bold;
        text-align:center;
        height:20px;
        width:auto;
      }
    
      .year-neighbor {
        opacity: 0.4;

        @media (max-width: 991px) {
          display: none;
        }
      }
    
      .year-neighbor2 {
        opacity: 0.2;

        @media (max-width: 767px) {
          display: none;
        }
      }
    }

    /* Months */
    .months-container {
      width:100%;
      display:none;

      .month-container {
        float: left;
        text-align:center;
        height:200px;
        padding:0;

        &.month-2 {
          width: 16.66666667%;
        }
      
        &.month-3 {
          width: 25%;
        }
      
        &.month-4 {
          width: 33.33333333%;
        }
      
        &.month-6 {
          width: 50%;
        }
      
        &.month-12 {
          width: 100%;
        }
      }
    }

    table.month {
      th.month-title {
        font-size:16px;
        padding-bottom: 5px;
      }

      th.day-header {
        font-size:14px;
      }

      tr td,
      tr th
      {
        padding:0;

        &.hidden {
          display:none;
        }
      }

      td.week-number {
        cursor: default;
        font-weight:bold;
        border-right:1px solid #eee;
        padding:5px;
      }

      td.day {
        &.round-left {
          -webkit-border-radius: 8px 0 0 8px;
          -moz-border-radius: 8px 0 0 8px;
          border-radius: 8px 0 0 8px;
        }
      
        &.round-right {
          webkit-border-radius: 0 8px 8px 0 ;
          -moz-border-radius: 0 8px 8px 0;
          border-radius: 0 8px 8px 0;
        }

        .day-content {
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          padding: 5px 6px;
        }
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

      td.old,
      td.new,
      td.old:hover,
      td.new:hover {
        background: none;
        cursor: default;
      }
      
      td.disabled,
      td.disabled:hover {
        color: #dddddd;

        .day-content:hover {
          background: none;
          cursor: default;
        }
      }

      td.range .day-content {
        background: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
      }

      td.range.range-start .day-content  {
        border-top-left-radius:4px;
        border-bottom-left-radius:4px;
      }

      td.range.range-end .day-content  {
        border-top-right-radius:4px;
        border-bottom-right-radius:4px;
      }
    }


    /* Loading */
    .calendar-loading-container {
      position: relative;
      text-align: center;
      min-height: 200px;

      .calendar-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%)
      }
    }

    .calendar-spinner {
      margin: 20px auto;
      width: 80px;
      text-align: center;

      > div {
        width: 16px;
        height: 16px;
        margin: 5px;
        background-color: #333;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1s infinite ease-in-out both;
        animation: sk-bouncedelay 1s infinite ease-in-out both;

        &.bounce1 {
          -webkit-animation-delay: -0.32s;
          animation-delay: -0.32s;
        }

        &.bounce2 {
          -webkit-animation-delay: -0.16s;
          animation-delay: -0.16s;
        }
      }
    }
  }

  /* Context menu */
  .calendar-context-menu,
  .calendar-context-menu .submenu {
    border: 1px solid #ddd;
    background-color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .2);
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, .2);
    position:absolute;
    display:none;
  }

  .calendar-context-menu .item {
    position: relative;

    .content {
      padding:5px 10px;
      cursor:pointer;
      display:table;
      width:100%;
      white-space: nowrap;

      &:hover {
        background:#eee;
      }

      .text {
        display:table-cell;
      }

      .arrow {
        display:table-cell;
        padding-left:10px;
        text-align:right;
      }
    }

    .submenu {
      top: -1px; /* Compensate for the border */

      &:not(.open-left) {
        left: 100%;
      }

      &.open-left {
        right: 100%;
      }
    }

    &:hover > .submenu {
      display:block;
    }
  }

  .table-striped .calendar table.month tr td,
  .table-striped .calendar table.month tr th {
    background-color: transparent;
  }

  table.month td.day .day-content:hover {
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0)
    }

    40% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
}

</style>