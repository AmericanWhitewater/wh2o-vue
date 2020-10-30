<template>
  <v-menu
    offset-y
    right
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn text :icon="$vuetify.breakpoint.smAndDown" v-on="on">
        <!-- <flag-icon :round="$vuetify.breakpoint.smAndDown" :flag="currentLocale.flag"></flag-icon> -->
        <span v-show="$vuetify.breakpoint.mdAndUp && showLabel" :class="[$vuetify.rtl ? 'mr-0' : 'ml-0']">{{ currentLocale.label }}</span>
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list dense nav>
      <v-list-item v-for="locale in availableLocales" :key="locale.code" @click="setLocale(locale.code)">
        <v-list-item-title>{{ locale.label }}</v-list-item-title>
        <flag-icon :class="[$vuetify.rtl ? 'ml-0' : 'mr-0']" :flag="locale.flag"></flag-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import FlagIcon from '../common/FlagIcon'

/*
|---------------------------------------------------------------------
| Language Switcher Component
|---------------------------------------------------------------------
|
| Locale menu to choose the language based on the locales present in
| vue-i18n locales available array
|
*/
export default {
  components: {
    FlagIcon
  },
  props: {
    // Show dropdown arrow
    showArrow: {
      type: Boolean,
      default: false
    },
    // Show the country label
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale)
    },
    availableLocales () {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
      this.$vuetify.lang.current = locale

      // example on how certain languages can be RTL
      if (locale === 'ar') {
        this.$vuetify.rtl = true
      } else {
        this.$vuetify.rtl = false
      }
    }
  }
}
</script>
