<template>
  <div class="community-events pt-4">
    <div class="calendar-wrapper">
      <FullCalendar
        default-view="dayGridMonth"
        :plugins="calendarPlugins"
      />
    </div>
  </div>
</template>
<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  name: 'community-events',
  components: {
    FullCalendar
  },
  data: () => ({
    calendarPlugins: [dayGridPlugin]
  })
}
</script>
<style lang="scss">

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.community-events {
 background-color: $ui-02;
 padding: $layout-sm;
}

.calendar-wrapper {
  background-color:$ui-01;
  padding: $layout-xs;
}

</style>
<docs>

</docs>
