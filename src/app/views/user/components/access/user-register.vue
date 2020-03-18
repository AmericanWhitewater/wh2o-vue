<template>
  <div class="register">
    <cv-text-input
      v-model="formData.username"
      class="mb-spacing-sm"
      label="Email"
      type="text"
      theme="light"
    />
    <cv-text-input
      v-model="formData.password"
      class="mb-spacing-sm"
      label="Password"
      type="password"
      theme="light"
    />
    <cv-text-input
      v-model="formData.password_confirmation"
      class="mb-spacing-sm"
      label="Confirm Password"
      type="password"
      theme="light"
    >
      <template
        v-if="passwordMatchError"
        slot="invalid-message"
      >
        Passwords do not match
      </template>
    </cv-text-input>
    <p
      class="mb-spacing-md terms-trigger"
      @click="termsVisible = true"
    >
      Click to view terms &amp; conditions
    </p>
    <div class="mb-sm">
      <cv-checkbox
        v-model="formData.termsConfirmed"
        label="I agree to the terms"
        value="terms"
      />
    </div>
    <cv-button
      kind="primary"
      :disabled="submitDisabled"
      small
      @click="submitRegistration"
      v-text="'Submit'"
    />
    <cv-modal
      :visible="termsVisible"
      @modal-hidden="termsVisible = false"
    >
      <template slot="label">
        Effective 01-01-2020
      </template>
      <template slot="title">
        Terms of Use
      </template>
      <template slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean sed
          adipiscing diam donec adipiscing tristique risus nec. Id donec
          ultrices tincidunt arcu. Volutpat consequat mauris nunc congue nisi
          vitae suscipit. Ullamcorper a lacus vestibulum sed arcu non odio
          euismod lacinia. Consectetur purus ut faucibus pulvinar elementum. Vel
          pretium lectus quam id leo in vitae turpis. Placerat vestibulum lectus
          mauris ultrices. Enim nulla aliquet porttitor lacus. Vulputate odio ut
          enim blandit volutpat maecenas volutpat. Magna sit amet purus gravida
          quis. Amet facilisis magna etiam tempor orci eu. Vestibulum rhoncus
          est pellentesque elit ullamcorper dignissim cras tincidunt.
          <br><br>
          Nec tincidunt praesent semper feugiat nibh. Nunc consequat interdum
          varius sit amet mattis vulputate. Massa placerat duis ultricies lacus
          sed turpis tincidunt id aliquet. Mattis enim ut tellus elementum
          sagittis vitae et. Gravida dictum fusce ut placerat. Molestie ac
          feugiat sed lectus vestibulum mattis ullamcorper velit sed. Nibh
          tellus molestie nunc non blandit massa. Egestas erat imperdiet sed
          euismod nisi porta lorem. Arcu dui vivamus arcu felis bibendum ut
          tristique. Mattis aliquam faucibus purus in. Eget nulla facilisi etiam
          dignissim.
          <br><br>
          Tempor orci dapibus ultrices in. Sed arcu non odio euismod lacinia.
          Elit at imperdiet dui accumsan sit amet. Pulvinar mattis nunc sed
          blandit libero volutpat sed cras. Congue quisque egestas diam in arcu
          cursus. Fermentum et sollicitudin ac orci phasellus egestas tellus
          rutrum tellus. Non consectetur a erat nam at lectus urna. Consectetur
          lorem donec massa sapien faucibus et molestie. Vel quam elementum
          pulvinar etiam non quam lacus. Odio morbi quis commodo odio aenean sed
          adipiscing diam donec. Duis at tellus at urna condimentum mattis.
          Pharetra pharetra massa massa ultricies mi. Diam sollicitudin tempor
          id eu nisl. Risus nullam eget felis eget nunc lobortis mattis aliquam.
          Aliquam id diam maecenas ultricies mi eget mauris.
          <br><br>
          At erat pellentesque adipiscing commodo. Viverra tellus in hac
          habitasse. Adipiscing elit pellentesque habitant morbi tristique.
          Feugiat in ante metus dictum at tempor commodo ullamcorper. Fringilla
          urna porttitor rhoncus dolor purus. Molestie nunc non blandit massa
          enim nec. Magnis dis parturient montes nascetur ridiculus mus mauris
          vitae. Nisl vel pretium lectus quam id. Eu augue ut lectus arcu
          bibendum at. Tortor condimentum lacinia quis vel eros donec ac odio
          tempor. Neque vitae tempus quam pellentesque nec nam. Duis at tellus
          at urna condimentum. Sed risus pretium quam vulputate dignissim
          suspendisse in est ante. Augue ut lectus arcu bibendum at varius. Id
          venenatis a condimentum vitae sapien pellentesque. Dictum varius duis
          at consectetur lorem. In mollis nunc sed id semper risus in.
          Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla.
          <br><br>
          Sapien et ligula ullamcorper malesuada proin libero. Orci porta non
          pulvinar neque laoreet suspendisse interdum consectetur libero. Donec
          enim diam vulputate ut. Blandit aliquam etiam erat velit scelerisque
          in dictum non consectetur. Sed augue lacus viverra vitae congue eu
          consequat. Et netus et malesuada fames ac turpis egestas sed tempus.
          Posuere urna nec tincidunt praesent semper feugiat nibh sed. Mattis
          molestie a iaculis at erat pellentesque adipiscing. Sed viverra ipsum
          nunc aliquet bibendum enim facilisis gravida. Euismod elementum nisi
          quis eleifend quam adipiscing vitae proin. Integer feugiat scelerisque
          varius morbi. Lacinia at quis risus sed vulputate odio ut enim
          blandit. Tempor nec feugiat nisl pretium.
        </p>
      </template>
      <template slot="primary-button">
        Close
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { appLocalStorage } from '@/app/global/services'

export default {
  name: 'user-register',
  data: () => ({
    termsVisible: false,
    confirmationError: false,
    passwordMatchError: false,
    formData: {
      username: '',
      password: '',
      password_confirmation: '',
      termsConfirmed: false
    }
  }),
  computed: {
    submitDisabled () {
      if (this.formData.termsConfirmed) {
        return false
      }
      return true
    }
  },
  methods: {
    /**
     * @todo form validation. Look at vuelidate
     * @link https://vuelidate.js.org/
     *
     */
    submitRegistration () {
      if (this.formData.password !== this.formData.password_confirmation) {
        this.passwordMatchError = true
      } else {
        this.passwordMatchError = false
      }

      if (!this.formData.termsConfirmed) {
        this.confirmationError = true
      } else {
        this.confirmationError = false
      }

      if (!this.confirmationError && !this.passwordMatchError) {
        appLocalStorage.setItem('wh2o-registered', true)
        this.$gtag.event('registration', { method: 'Google' })
        this.$router.replace('/user/account/1/bookmarks')
      }
    }
  }
}
</script>
<style lang="scss">
.register {
  h2,
  p {
    margin-bottom: 1.25rem;
  }

  .terms-trigger {
    @include carbon--type-style("code-01");
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
