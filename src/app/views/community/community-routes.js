import Community from './community.vue'

const communityRoutes = [
  {
    path: '/community',
    name: 'community',
    component: Community,
    children: [
      {
        path: 'community-events',
        name: 'community-events',
        component: () => import('./community-events/community-events.vue')
      },
      {
        path: 'community-partners',
        name: 'community-partners',
        component: () => import('./community-partners/community-partners.vue')
      }
    ]
  }
]

export default communityRoutes
