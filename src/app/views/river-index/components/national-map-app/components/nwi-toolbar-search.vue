<template>
  <cv-search
    ref="searchBox"
    kind="toolbar"
    class="cv-toolbar-search bx--toolbar-search"
    :placeholder="placeholder"
    :form-item="false"
    v-bind="$attrs"
    :value="value"
    small
    v-on="$listeners"
  />
</template>

<script>
// this is just a hacked version of <cv-toolbar-search>
// https://github.com/carbon-design-system/carbon-components-vue/blob/master/packages/core/src/components/cv-toolbar/cv-toolbar-search.vue
// Carbon Vue doesn't allow you to set a number of properties on the inner element that I
// need to set and I don't like the open/close behavior of the search form, changing here
export default {
  name: 'NwiToolbarSearch',
  inheritAttrs: false,
  props: {
    value: String,
    placeholder: String
  },
  mounted () {
    // we are monkey patching the cv-search component's `checkFocus` method here to
    // modify the open/close behavior of the search box.
    // desired behavior: search box never hides if it is populated
    const { searchBox } = this.$refs
    searchBox.checkFocus = ev => {
      if (
        !searchBox.$el.contains(ev.relatedTarget) &&
        (!searchBox.internalValue || searchBox.internalValue.length === 0)
      ) {
        searchBox.toolbarActive = false
      }
    }
    // TODO: behavior is still a little finicky, keep tweaking
  }
}
</script>
