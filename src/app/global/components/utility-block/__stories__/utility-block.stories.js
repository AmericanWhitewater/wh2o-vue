import UtilityBlock from '../utility-block.vue'

export default {
  component: UtilityBlock,
  title: 'Utility Block',
  template: '<utility-block state="loading"></utility-block>'
}

export const loading = () => ({
  components: { UtilityBlock },
  template: '<utility-block state="loading"></utility-block>'
})
export const error = () => ({
  components: { UtilityBlock },
  template: '<utility-block state="error"></utility-block>'
})
export const withText = () => ({
  components: { UtilityBlock },
  template: '<utility-block state="content" text="Lorem ipsum"></utility-block>'
})
