<template>
  <section class="comments-section">
    <hr>
    <h2 class="mb-spacing-md">
      Comments
    </h2>
    <cv-button
      kind="secondary"
      size="small"
      class="mb-spacing-lg"
    >
      New Comment
    </cv-button>
  </section>
</template>

<script>
export default {
  name: 'CommentsSection',
  data: () => ({
    layoutOptions: {
      sidebar: {
        left: true
      }
    },
    comments: [
      {
        name: 'John Doe',

        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        name: 'Oliver Windle',

        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        name: 'Dude Guy',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        name: 'Another Name',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        name: 'Creative Name',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ]
  }),
  methods: {
    profilePreview (userid) {
      return userid
    },
    formatInitials (userName) {
      // helper to get the first and last initials for comment
      const splitName = userName.split(' ')
      const firstInitial = splitName[0].charAt(0)
      const lastInitial = splitName[splitName.length - 1].charAt(0)
      const initials = firstInitial + lastInitial
      return initials
    }
  }
}
</script>

<style lang="scss">
.comment {
  display: flex;
 .user-initials {
   height:4rem;
  width:4rem;
  flex-basis: 20%;
  background-color:$ui-04;
  color:$ui-01;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
 }
}
</style>
