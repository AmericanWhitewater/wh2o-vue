import { config } from '@vue/test-utils'

config.mocks["$cleanContent"] = (msg) => msg;