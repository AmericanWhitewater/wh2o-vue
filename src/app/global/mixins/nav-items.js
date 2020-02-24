const navItems = {
  data: () => ({
    navItems: [
      {
        label: 'Our Organization',
        path: null,
        children: [
          {
            legacy: false,
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
          },
          {
            legacy: false,
            label: 'Professional Staff',
            path: '/staff'
          },
          {
            legacy: false,
            label: 'Outdoor Alliance',
            path: '/outdoor-alliance'
          },
          {
            legacy: false,
            label: 'Stewardship',
            path: '/stewardship'
          },
          {
            legacy: false,
            label: 'Contact',
            path: '/contact'
          }
        ]
      },
      {
        label: 'Support',
        path: null,
        children: [
          {
            legacy: false,
            label: 'Join or Renew',
            path: '/membership/join-renew'
          },
          { legacy: false, label: 'Gift Membership', path: '/membership/gift' },
          { legacy: false, label: 'Become a Volunteer', path: '/volunteer' },
          {
            legacy: false,
            label: 'Advertising Information',
            path: '/advertising'
          },
          {
            legacy: false,
            label: 'Donate',
            path: '/donate'
          },
          {
            legacy: false,
            label: 'Giving',
            path: '/giving'
          },
          {
            legacy: false,
            label: 'Store',
            path: '/store'
          }
        ]
      },
      {
        label: 'River Index',
        path: '/river-index',
        children: null
      },
      {
        label: 'Library',
        path: null,
        children: [
          {
            legacy: false,
            label: 'Photo/Video',
            path: '/library'
          },
          { legacy: false, label: 'Journal', path: '/journal' }
        ]
      },
      {
        label: 'Community',
        path: null,
        children: [
          { legacy: false, label: 'Clubs', path: '/community/clubs' },
          { legacy: false, label: 'Events', path: '/community/events' },
          {
            legacy: false,
            label: 'Industry Partners',
            path: '/community/partners'
          }
        ]
      }
    ]
  })
}

export default navItems
