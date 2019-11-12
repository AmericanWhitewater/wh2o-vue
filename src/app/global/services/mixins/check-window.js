import Breakpoints from "../breakpoints/breakpoints";

const checkWindow = {
  data: () => ({
    windowWidth: 0,
    breakpoints: Breakpoints
  }),
  mounted() {
    this.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};

export default checkWindow;
