/**
 * Error monitoring and reporting with Sentry.io
 *
 */

import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { environment } from '@/app/environment/environment'

/**
 * @note only enable sentry on prod / staging to let errors get through to the console during development.
 *
 */

if (environment !== 'development') {
  Sentry.init({
    dsn: 'https://51a942e027c04dc9ab33b5e3613c276e@sentry.io/2564210',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}
