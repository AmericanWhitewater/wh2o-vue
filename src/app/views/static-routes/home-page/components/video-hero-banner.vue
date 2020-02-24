<template>
  <section>
    <div class="video-hero-banner">
      <div class="outside">
        <video
          muted
          autoplay
          loop
          preload="metadata"
          poster="@/app/assets/images/dummy02Poster.png"
        >
          <source
            src="@/app/assets/video/dummy02.MP4"
            type="video/mp4"
          >
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div class="inside">
          <div class="bx--grid">
            <div class="bx--row">
              <div
                class="bx--col-sm-12 bx--col-md-10 bx--col-lg-14 bx--offset-lg-1"
              >
                <main>
                  <div>&nbsp;</div>
                  <template v-if="windowWidth < breakpoints.lg">
                    <div>&nbsp;</div>
                  </template>
                  <template v-if="windowWidth >= breakpoints.lg">
                    <aw-logo variant="xl" />
                  </template>
                  <cv-tile>
                    <div class="bx--row">
                      <div
                        class="bx--col-sm-12 bx--col-md-6 bx--col-lg-4 mb-spacing-md"
                      >
                        <h3 class="mb-spacing-md">
                          River Index
                        </h3>
                        <p class="mb-spacing-md">
                          Explore the rivers of North America and get
                          comprehensive river beta with our interactive map.
                        </p>
                        <router-link to="/river-index">
                          <cv-button
                            kind="tertiary"
                            small
                          >
                            View Map
                          </cv-button>
                        </router-link>
                      </div>
                      <div
                        class="bx--col-sm-12 bx--col-md-6 bx--col-lg-4 mb-spacing-md"
                      >
                        <h3 class="mb-spacing-md">
                          News
                        </h3>
                        <p class="mb-spacing-md">
                          Stay up to date with the latest legislative action
                          items, articles, and happenings from AW.
                        </p>
                        <router-link to="/news">
                          <cv-button
                            kind="tertiary"
                            small
                          >
                            View Feed
                          </cv-button>
                        </router-link>
                      </div>
                      <div
                        class="bx--col-sm-12 bx--col-md-6 bx--col-lg-4 mb-spacing-md"
                      >
                        <h3 class="mb-spacing-md">
                          Safety
                        </h3>
                        <p class="mb-spacing-md">
                          Get resources along with helpful tips and tricks to
                          help you and your crew stay safe on the water.
                        </p>
                        <router-link to="/safety">
                          <cv-button
                            kind="tertiary"
                            small
                          >
                            View Resources
                          </cv-button>
                        </router-link>
                      </div>
                      <div
                        class="bx--col-sm-12 bx--col-md-6 bx--col-lg-4 mb-spacing-md"
                      >
                        <h3 class="mb-spacing-md">
                          Contribute
                        </h3>
                        <p class="mb-spacing-md">
                          See a river that doesn't have much info? Help keep us
                          up to date, register to start editing.
                        </p>
                        <router-link to="/user/access/register">
                          <cv-button
                            kind="tertiary"
                            small
                          >
                            Register
                          </cv-button>
                        </router-link>
                      </div>
                    </div>
                  </cv-tile>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AwLogo from '@/app/global/components/logo-library/aw-logo.vue'
import { CheckWindow } from '@/app/global/mixins'

export default {
  name: 'VideoHeroBanner',
  components: {
    AwLogo
  },
  mixins: [CheckWindow]
}
</script>
<style lang="scss" scoped>
.video-hero-banner {
  .outside {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    video {
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.35;
    }
  }
  .inside {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // width: auto;
    margin: 0 auto;
    height: calc(100vh - 75px);
    min-width: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    main {
      height: calc(100vh - 75px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      flex-flow: column nowrap;
      padding-bottom: 25px;
      .bx--tile {
        width: 100%;
        min-height: 25vh;
        background-color: $ui-01;
      }
    }
  }
}
</style>
