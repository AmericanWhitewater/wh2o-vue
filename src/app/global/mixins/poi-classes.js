const poiClasses = {
  data: () => ({
    poiClasses: ['N/A','I','I+','II-','II','II+','III-','III','III+','IV-','IV','IV+','V-','V','V+','VI']
  }),
  computed: {
    poiClassOptions() {
      return this.poiClasses.map(x => ({ name: x, value: x, label: x}))
    }
  }
};

export default poiClasses;
