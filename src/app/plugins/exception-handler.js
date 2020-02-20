import Vue from 'vue'
import { logger } from '@/app/global/services/app-logger/app-logger'
import { environment } from '@/app/environment/environment'

/**
 * @note only use this handler during development to avoid conflict with sentry
 */

if (environment === 'development') {
  Vue.config.errorHandler = (err, vm, info) => {
    logger.logToServer({ err, vm, info })
  }

  window.onerror = function (message, source, lineno, colno, error) {
    logger.logToServer({
      message,
      source,
      lineno,
      colno,
      error
    })
  }
}
