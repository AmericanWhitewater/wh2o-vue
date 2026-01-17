# American Whitewater Vue App - AI Coding Agent Instructions

## Project Overview
Vue 2 SPA for whitewater river information with ~6000 rivers. Can run standalone or embedded in Laravel via Shadow DOM. Uses Vuex for state, Vue Router for navigation, and integrates with multiple backend APIs (Laravel GraphQL, WordPress REST, tRPC).

## Architecture & Data Flow

### Multi-Backend Strategy
The app consumes data from three distinct backends:
- **Laravel GraphQL** (`laravelClient`): Primary reach/river data, older event system
- **WordPress REST API** (`wpClient`): Content (articles, accidents, documents, dam releases via Tribe Events)
- **tRPC** (`reachClient`, `gaugeClient`, `profileApiUrl`): Newer typed API layer for reach details and gauge data

### Service Layer Pattern
Services in `src/app/services/` follow consistent patterns:
- Export named functions (not default exports)
- Always re-export in `src/app/services/index.js`
- WordPress services require `wpID` (not reach ID) - obtain via `getReachWPID(reachId)`
- Example: `getReachAccidents(wpID)`, `getReachArticles(wpID)`, `getDamReleases(wpID)`

### Vuex Store Modules
Each module (`src/app/store/modules/`) follows standard structure:
```javascript
{
  namespaced: true,
  state: { data, loading, error },
  mutations: { ...mutations }, // from store/mutations
  actions: { ...actions, getProperty() }, // from store/actions + custom
  getters: {} // domain-specific computed values
}
```

**Critical Pattern**: For WordPress-backed data, components must watch for `reach.wpID` availability:
```javascript
// In river-detail.vue or child components
watch: {
  reach: {
    handler(newReach) {
      if (newReach && newReach.wpID) {
        this.$store.dispatch('ModuleName/getProperty', newReach.wpID);
      }
    },
    immediate: true
  }
}
```

## Key Workflows

### Development
- **Start dev server**: `npm ci` → `cp .env.example .env` → `npm run serve`
- **Dev URL**: `https://rivers.americanwhitewater.localhost:8080` (note HTTPS in serve script)
- **Testing**: `npm run test:unit` (Jest), `npm run test:coverage`
- **Linting**: `npm run lint:js` and `npm run lint:scss` (auto-fix enabled)

### River Detail Page Load Sequence
1. User navigates to `/river-detail/:id/:tab?`
2. `river-detail.vue` watches `reachId` → calls `loadReachData()`
3. Parallel dispatches: `RiverDetail/getProperty`, `RiverCredits/getProperty`, `RiverAlerts/getProperty`, etc.
4. `RiverDetail/getProperty` fetches reach data AND calls `getReachWPID()` to attach `wpID`
5. Separate watcher on `reach` triggers when `wpID` available → dispatches `RiverDamReleases/getProperty(wpID)`
6. Tab components render as data arrives

### Dam Releases (WordPress Tribe Events)
Two-step API process implemented in `getDamReleases(wpID)`:
1. Query `tribe_events` endpoint with `reachid` and `tribe_events_cat=12832` (Dam Release category)
2. Extract event IDs, query `../tribe/events/v1/events?include=<ids>` for full details
3. Data stored directly in `river-dam-releases.js` store module (see `getProperty` action)

## Project-Specific Conventions

### File Organization
- `src/app/`: Application code (not src/ root like typical Vue apps)
- `src/app/global/`: Shared components, layout, mixins, services
- `src/app/views/river-detail/`: Largest feature - uses tab-based routing with child components
- Global mixins auto-loaded via `src/app/global/mixins/global-mixins.js` (includes `formatDate`, `assetUrl`)

### Environment Variables
All env vars MUST start with `VUE_APP_` prefix (Vue CLI requirement). Key vars:
- `VUE_APP_API_BASE_URL`: Laravel GraphQL endpoint
- `VUE_APP_WP_API_URL`: WordPress REST API base
- `VUE_APP_TRPC_API_URL`: tRPC endpoint
- `VUE_APP_LARAVEL_DEPLOY`: Boolean flag for Shadow DOM embedding

Access via `src/app/environment/index.js` exports (not direct `process.env` access).

### State Management
- Use `mapState` for simple state access, getters for computed/derived data
- Mutations follow pattern: `DATA_REQUEST`, `DATA_SUCCESS`, `DATA_ERROR` (imported from `store/mutations`)
- Actions follow pattern: `getProperty(context, payload)` for data fetching

### Component Patterns
- Carbon Design System components prefixed with `cv-` (`<cv-button>`, `<cv-modal>`)
- Edit mode: Global `editMode` state enables inline editing UI - check via `mapState` or `this.$store.state.Global.editMode`
- Modals use ref access pattern: `this.$refs.modalName.show()`

### Routing
- Main routes: `river-detail/:id/:tab?` where tab = `main|flow|map|reports|gallery|news|accidents|credits`
- Tab switching via `this.$router.replace()` (not `push()`) to avoid history bloat
- Route names match tab keys with `-tab` suffix (e.g., `main-tab`, `flow-tab`)

## Common Pitfalls
- Don't use reach ID with WordPress services - always convert to wpID first
- Don't call services directly in components - use Vuex actions for consistency
- Don't forget to watch for `reach.wpID` when adding new WordPress-backed features
- Don't create standalone components in `src/` - use `src/app/` structure
- Shadow DOM deployment: CSS must be scoped or injected differently (see `vue.config.js` `enableShadowCss`)

## Integration Points
- **Mapbox GL**: Map rendering with custom draw controls (`@mapbox/mapbox-gl-draw`)
- **TinyMCE**: Rich text editing for reach descriptions
- **Apollo Client**: GraphQL (older pattern, being phased out for tRPC)
- **Sentry**: Error tracking configured in `src/app/plugins/sentry.js`
- **Service Worker**: PWA support via `registerServiceWorker.js`

## Build & Deploy
- **Production**: `npm run build` → static files in `dist/`
- **S3 Beta**: `npm run builds3beta` (mode: s3beta)
- **S3 Prod**: `npm run builds3prod` (mode: s3prod)
- Modern build: `npm run build:modern` (differential loading for modern browsers)
