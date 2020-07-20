/**
 * Error monitoring and reporting with Sentry.io
 *
 */

import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { environment } from '@/app/environment'

/**
 * @note only enable sentry on prod / staging to let errors get through to the console during development.
 *
 */

if (environment === 'production') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}
