export default [
  {
    path: '/user',
    component: () => import('@/app/views/user/app-user.vue'),
    children: [
      {
        path: 'logout',
        name: 'logout',
        meta: {
          crumbLabel: 'Logout'
        },
        component: () => import('@/app/views/user/components/user-logout.vue')
      },
      {
        path: 'account/:userId',
        name: 'account',
        component: () => import('@/app/views/user/components/account/user-account.vue'),
        children: [
          {
            path: 'alerts',
            name: 'alerts',
            component: () => import('@/app/views/user/components/account/user-alerts.vue')
          },
          {
            path: 'gages',
            name: 'gages',
            component: () => import('@/app/views/user/components/account/user-gages.vue')
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('@/app/views/user/components/account/user-settings.vue')
          },
          {
            path: 'profile',
            name: 'profile',
            component: () => import('@/app/views/user/components/account/user-profile.vue')
          }
        ]
      }
    ]
  }
]