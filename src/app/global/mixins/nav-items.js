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
        ]
      },
      {
        label: 'Map',
        path: '/river-index',
        children: null
      },
      {
        label: 'Community',
        path: null,
        children: [
          {
            label: 'Clubs',
            path: '/community/clubs'
          },
          { label: 'Events', path: '/community/events' }
        ]
      }
    ]
  })
}

export default navItems
