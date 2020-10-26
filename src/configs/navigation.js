import adminMenuPages from './menus/admin-pages.menu'

export default {
  menu: [
    {
      items: [
        {
          text: 'Our Organization',
          icon: 'mdi-domain',
          items: [
            {
              text: 'About AW'
            },
            {
              text: 'News'
            },
            {
              text: 'Safety'
            },
            {
              text: 'Professional Staff'
            },
            {
              text: 'Outdoor Alliance'
            },
            {
              text: 'Stewardship'
            },
            {
              text: 'Contact Us'
            }
          ]
        }
      ]
    },
    {
      items: [
        {
          text: 'Support AW',
          icon: 'mdi-lifebuoy',
          items: [
            {
              text: 'Join or Renew'
            },
            {
              text: 'Gift Membership'
            },
            {
              text: 'Volunteer'
            },
            {
              text: 'Advertising Information'
            },
            {
              text: 'Donate'
            },
            {
              text: 'Giving'
            },
            {
              text: 'Store'
            }
          ]
        }
      ]
    },
    {
      items: [
        {
          icon: 'mdi-waves',
          text: 'River Information',
          items: [
            {
              text: 'Map',
              link: '/river-index',
            },
            {
              text: 'Stream Team'
            },
            {
              text: 'Permits'
            },
            {
              text: 'Dam Releases'
            }
          ]
        }
      ]
    },
    {
      items: [
        {
          text: 'Library',
          icon: 'mdi-image-multiple',
          items: [
            {
              text: 'Photo/Video'
            },
            {
              text: 'AW Journal'
            },
            {
              text: 'Logos'
            }
          ]
        }
      ]
    },
    {
      items: [
        {
          text: 'Community',
          icon: 'mdi-account-multiple',
          items: [
            {
              text: 'Clubs'
            },
            {
              text: 'Events'
            },
            {
              text: 'Industry Partners'
            }
          ]
        }
      ]
    }
  ],
  adminMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Dashboard', link: '/admin/dashboard/analytics' },
      { icon: 'mdi-file-outline', key: 'menu.blank', text: 'Blank Page', link: '/blank' }
    ]
  },
  {
    text: 'Admin Pages',
    key: 'admin-menu.pages',
    items: adminMenuPages
  }],

  // footer links
  footer: [{
    text: 'Docs',
    key: 'menu.docs',
    href: 'https://vuetifyjs.com',
    target: '_blank'
  }]
}
