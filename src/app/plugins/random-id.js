import Vue from 'vue'

import { customAlphabet } from 'nanoid'

/**
 * @description use this when creating new resources.
 * Meets requirements for the GQL type AWID
 *
 */

Vue.prototype.$randomId = function () {
  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 21);
  return nanoid();
}
