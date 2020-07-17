module.exports = {
  title: 'wh2o-vue',
  description: 'A frontend for the American Whitewater API build with Vue.js',
  themeConfig: {
    logo: '/aw-logo-small.png',
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
        text: 'Guides',
        link: '/guide/'
      }
    ],
    sidebar: [
      {
        title: 'Guides',
        path: '/guide/',
        children: [
          {
            title: 'Getting Started',
            path: '/guide/getting-started.md'
          },
          {
            title: 'Contributing',
            path: '/guide/contributing.md'
          },
          {
            title: 'Generate Docs',
            path: '/guide/generate-docs.md'
          }
        ]
      },
      {
        title: 'Views',
        path: '/views/',
        children: [
          {
            title: 'Gage Detail',
            path: '/views/gage-detail.md'
          },
          {
            title: 'News Page',
            path: '/views/news-page.md'
          },
          {
            title: 'River Detail',
            path: '/views/river-detail.md'
          },
          {
            title: 'River Index',
            path: '/views/river-index.md'
          },
          {
            title: 'River Search',
            path: '/views/river-search.md'
          },
          {
            title: 'Static Routes',
            path: '/views/static-routes.md'
          },
          {
            title: 'User',
            path: '/views/user.md'
          }
        ]
      },
      {
        title: 'Plugins',
        path: '/plugins/'
      }
    ],
    plugins: ['@vuepress/active-header-links']
  }
}
