import Vue from 'vue'

import { nanoid } from 'nanoid'

/**
 * @description use this when creating new resources.
 * Meets requirements for the GQL type AWID
 *
 */

Vue.prototype.$randomId = function () {
  return nanoid(21, '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
}
