const routeMetaData = {
  metaInfo () {
    return {
      title: this.pageTitle,
      titleTemplate: '%s | American Whitewater'
    }
  },
  computed: {
    pageTitle () {
      return 'drew test'
    }
  }
}
export default routeMetaData
