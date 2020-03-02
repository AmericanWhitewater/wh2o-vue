const navItems = {
  data: () => ({
    navItems: [
      {
        label: 'Our Organization',
        path: null,
        children: [
          {
            label: 'About',
            path: '/about'
          },
          {
            label: 'News',
            path: '/news'
          },
          {
            label: 'Safety',
            path: '/safety'
          }
          // {
          //   label: 'Professional Staff',
          //   path: '/staff'
          // },
          // {
          //   label: 'Outdoor Alliance',
          //   path: '/outdoor-alliance'
          // },
          // {
          //   label: 'Stewardship',
          //   path: '/stewardship'
          // },
          // {
          //   label: 'Contact',
          //   path: '/contact'
          // }
        ]
      },
      // {
      //   label: 'Support',
      //   path: null,
      //   children: [
      //     {
      //       label: 'Join or Renew',
      //       path: '/membership/join-renew'
      //     },
      //     { label: 'Gift Membership', path: '/membership/gift' },
      //     { label: 'Become a Volunteer', path: '/volunteer' },
      //     {
      //       label: 'Advertising Information',
      //       path: '/advertising'
      //     },
      //     {
      //       label: 'Donate',
      //       path: '/donate'
      //     },
      //     {
      //       label: 'Giving',
      //       path: '/giving'
      //     },
      //     {
      //       label: 'Store',
      //       path: '/store'
      //     }
      //   ]
      // },
      {
        label: 'River Index',
        path: '/river-index',
        children: null
      },
      // {
      //   label: 'Library',
      //   path: null,
      //   children: [
      //     {
      //       label: 'Photo/Video',
      //       path: '/library'
      //     },
      //     {
      //       label: 'Journal',
      //       path: '/journal'
      //     }
      //   ]
      // },
      {
        label: 'Community',
        path: null,
        children: [
          {
            label: 'Clubs',
            path: '/community/clubs'
          },
          { label: 'Events', path: '/community/events' }
          // {
          //   label: 'Industry Partners',
          //   path: '/community/partners'
          // }
        ]
      }
    ]
  })
}

export default navItems
