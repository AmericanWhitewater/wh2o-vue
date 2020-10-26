import en from '../translations/en'
import es from '../translations/es'
import pt from '../translations/pt'
import de from '../translations/de'
import fr from '../translations/fr'
import ar from '../translations/ar'

export default {
  // current locale
  locale: 'en',

  // when translation is not available fallback to that locale
  fallbackLocale: 'en',

  // availabled locales for user selection
  availableLocales: [{
    code: 'en',
    flag: 'us',
    label: 'English',
    messages: en
  }, {
    code: 'es',
    flag: 'es',
    label: 'Español',
    messages: es
  },
  // {
  // code: 'pt',
  // flag: 'pt',
  // label: 'Português',
  // messages: pt
  // },
  // {
  // code: 'de',
  // flag: 'de',
  // label: 'Deutsche',
  // messages: de
  // },
  {
    code: 'fr',
    flag: 'fr',
    label: 'Français',
    messages: fr
  }
  ]
}
