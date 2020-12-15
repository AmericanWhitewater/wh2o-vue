export default [
  {
    path: '/user',
    component: () => import('@/app/views/user/app-user.vue'),
    children: [
      {
        path: 'access',
        name: 'access',
        component: () => import('@/app/views/user/components/access/user-access.vue'),
        children: [
          {
            path: 'login',
            name: 'login',
            meta: {
              crumbLabel: 'Login'
            },
            component: () => import('@/app/views/user/components/access/user-login.vue')
          },
          {
            path: 'logout',
            name: 'logout',
            meta: {
              crumbLabel: 'Logout'
            },
            component: () => import('@/app/views/user/components/access/user-logout.vue')
          },
          {
            path: 'register',
            name: 'register',
            meta: {
              crumbLabel: 'Register'
            },
            component: () => import('@/app/views/user/components/access/user-register.vue')
          },
          {
            path: 'forgot',
            name: 'forgot',
            meta: {
              crumbLabel: 'Password Reset'
            },
            component: () => import('@/app/views/user/components/access/user-forgot.vue')
          }
        ]
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