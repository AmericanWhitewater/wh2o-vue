module.exports = {
  title: 'wh2o-vue',
  description: 'A frontend for the American Whitewater API built with Vue.js',
  themeConfig: {
    logo: '/aw-logo-small.svg',
    lastUpdated: 'Last updated',
    smoothScroll: true,
    repo: 'https://github.com/AmericanWhitewater/wh2o-vue',
    editLinks: true,
    editLinkText: 'Recommend a change',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Guide',
        link: '/guide/'
      }
    ],
    sidebar: [
      {
        title: 'Guide',
        path: '/guide/',
      },
      {
        title: 'Project Architecture',
        path: '/architecture/'
      },
      {
        title: 'State Management',
        path: '/state/',
        children: [
          '/state/model.md',
          '/state/actions.md',
          '/state/mutations.md',
        ]
      },
      {
        title: 'Views',
        path: '/views/'
      },
      {
        title: 'Testing',
        path: '/testing/',
        children: [
          '/testing/unit.md',
          '/testing/end-to-end.md',
        ]
      },
      {
        title: 'Standards',
        path: '/standards/',
        children: [
          '/standards/api-requests.md',
          '/standards/linting.md',
          '/standards/naming.md',
          '/standards/styling.md'
        ]
      }
    ],
    plugins: ['@vuepress/active-header-links']
  }
}
