<template>
  <div class="user-profile">
    <template v-if="loading">
      loading
    </template>
    <template v-else-if="data">
      <cv-tile>
        <div class="bx--row">
          <div class="bx--col-auto">
            <div
              class="user-avatar"
              image="true"
            >
              <img
                v-if="data.image.uri.big || data.image.uri.medium"
                :src="`https://americanwhitewater.org/${data.image.uri.big || data.image.uri.medium}`"
                alt="User Profile Pic"
              >
            </div>
          </div>
          <div class="bx--col">
            <h3>username: {{ data.uname }}</h3>
            <h3>email: {{ data.email }}</h3>
          </div>
        </div>
      </cv-tile>
    </template>
    <template v-else>
      error
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-profile',
  computed: {
    ...mapState({
      data: state => state.userState.userData.data,
      loading: state => state.userState.userData.loading,
      error: state => state.userState.userData.error
    })
  }
}
</script>

<style lang="scss">

.user-avatar {
  height:75px;
  min-width:75px;
  width: 75px;
  align-items: center;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    line-height: normal;
    position: relative;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    img {
      border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    border-style:none;
    overflow-wrap: break-word;
    white-space: normal;
    text-align: center;
    line-height: normal;
    object-fit: cover;
    }
}

</style>
