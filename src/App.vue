<template>
  <div id="app" class="bx--grid">
    <div id="nav" class="bx--row">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/nwi">National Whitewater Inventory</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/scss/base.scss";
</style>
