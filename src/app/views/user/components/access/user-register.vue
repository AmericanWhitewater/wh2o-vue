<template>
  <div class="register">
    <cv-text-input
      v-model="newUser.userName"
      class="mb-spacing-sm"
      label="Email"
      type="text"
    />
    <cv-text-input
      v-model="newUser.passWord"
      class="mb-spacing-sm"
      label="Password"
      type="password"
    />
    <p
      class="bx--type--caption mb-spacing-md text-underline cursor-pointer"
      @click="termsVisible = true"
    >
      Click to view terms &amp; conditions
    </p>
    <div class="mb-spacing-lg">
      <cv-checkbox
        v-model="newUser.termsConfirmed"
        label="I agree to the terms"
        value="terms"
      />
    </div>
    <cv-button
      kind="primary"
      small
      @click="submitRegistration"
      v-text="'Register'"
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
        <h2>Privacy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Privacy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Privacy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Privacy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Privacy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
          vitae
          tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
          facilisi.
          Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum.
        </p>
      </template>
      <template slot="primary-button">
        Close
      </template>
    </cv-modal>
  </div>
</template>
<script>
export default {
  name: 'UserRegister',
  data: () => ({
    termsVisible: false,
    newUser: {
      userName: '',
      passWord: '',
      termsConfirmed: false
    }
  }),
  methods: {
    viewTerms () {
      alert('view terms clicked')
    },
    submitRegistration () {
      alert('submitted')
    }
  }
}
</script>
<style lang="scss">
.register {
  h2, p {
  margin-bottom:1.25rem;
  }
}
</style>
