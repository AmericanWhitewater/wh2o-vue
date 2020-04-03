import Vue from 'vue'
// import genid from "nanoid/generate"

import { nanoid } from 'nanoid'

/**
 * @description use this when creating new resources.
 * Meets requirements for the GQL type AWID
 *
 */

Vue.prototype.$randomId = nanoid()
