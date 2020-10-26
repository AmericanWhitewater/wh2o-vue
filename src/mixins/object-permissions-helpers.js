export const objectPermissionsHelpersMixin = {
  methods: {
    canEdit (obj) {
      return obj.permissions && obj.permissions.some((x) => (x.permission === 'update' && x.result === 'ALLOW'))
    },
    canDelete (obj) {
      return obj.permissions && obj.permissions.some((x) => (x.permission === 'delete' && x.result === 'ALLOW'))
    }
  }
}
