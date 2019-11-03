export const navItems = {
  data: () => {
    return {
      navItems: {
        primary: [
          {
            title: "River Info",
            path: "/nwi-map"
          },
          {
            title: "News",
            path: "/news"
          },
          {
            title: "Safety",
            path: "/safety"
          }
        ],
        topbar: [
          {
            title: "Search",
            icon: "search",
            path: "/river-search"
          },
          {
            title: "My Account",
            icon: "user",
            path: "/my-account"
          }
        ],
        footer: [
          {
            title: "Accident Database",
            path: "/accident-database"
          }
        ]
      }
    };
  }
};
