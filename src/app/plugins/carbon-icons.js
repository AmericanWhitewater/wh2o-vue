import Vue from 'vue'
import { CarbonIconsVue } from '@carbon/icons-vue'

import UserAvatar16 from '@carbon/icons-vue/es/user--avatar/16.js'
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20.js'
import Filter16 from '@carbon/icons-vue/es/filter/16.js'
import FitToScreen16 from '@carbon/icons-vue/es/fit-to-screen/16.js'
import FitToScreen32 from '@carbon/icons-vue/es/fit-to-screen/32.js'
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20.js'
import Notification20 from '@carbon/icons-vue/es/notification/20.js'

Vue.use(CarbonIconsVue, {
  components: {
    UserAvatar16,
    Filter16,
    FitToScreen16,
    FitToScreen32,
    AppSwitcher20,
    UserAvatar20,
    Notification20
  }
})
