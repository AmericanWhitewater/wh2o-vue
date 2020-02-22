const navItems = {
  data: () => ({
    navItems: [
      {
        label: 'Our Organization',
        path: null,
        children: [
          {
            legacy: true,
            label: 'About AW',
            path: '/content/Wiki/aw:about/?'
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
            legacy: true,
            label: 'Professional Staff',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'Outdoor Alliance',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'Stewardship',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'Contact Us',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          }
        ]
      },
      {
        label: 'Support AW',
        path: null,
        children: [
          {
            legacy: true,
            label: 'Join or Renew',
            path: '/content/Wiki/aw:about/?'
          },
          { legacy: true, label: 'Gift Membership', path: '/news' },
          { legacy: true, label: 'Become a Volunteer', path: '/safety' },
          {
            legacy: true,
            label: 'Advertising Information',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'Donate',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'Giving',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
          },
          {
            legacy: true,
            label: 'AW Store',
            path: '/content/News/view/?showarchive=1&type=frontpagenews'
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
            legacy: true,
            label: 'Photo/Video',
            path: '/content/Wiki/aw:about/?'
          },
          { legacy: true, label: 'AW Journal', path: '/news' },
          {
            label: 'Login',
            path: '/user/access/login'
          }
        ]
      },
      {
        label: 'Community',
        path: null,
        children: [
          { legacy: true, label: 'Clubs', path: '/content/Wiki/aw:about/?' },
          { legacy: true, label: 'Events', path: '/news' },
          { legacy: true, label: 'Industry Partners', path: '/safety' }
        ]
      }
    ]
  })
}

export default navItems
