import Community from './community.vue'

const communityRoutes = [
  {
    path: '/community',
    name: 'community',
    component: Community,
    children: [
      {
        path: 'events',
        name: 'community-events',
        component: () => import('./community-events/community-events.vue')
      },
      {
        path: 'partners',
        name: 'community-partners',
        component: () => import('./community-partners/community-partners.vue')
      },
      {
        path: 'clubs',
        name: 'community-clubs',
        component: () => import('./community-clubs/community-clubs.vue')
      }
    ]
  }
]

export default communityRoutes
