module.exports = {
  title: 'Blaze & React',
  description: 'Introduction to using React in Meteor',
  // markdown: {
  //   lineNumbers: true
  // },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Guide',   // required
        collapsable: false, // optional, defaults to true
        sidebarDepth: 4,    // optional, defaults to 1
        children: [
           {title: 'Blaze/React', path: '/guide/'},
           {title: 'App', path: '/todo/'},
           {title: 'Form and Events', path: '/form/'},
          {title: 'Components', path: '/component/'},
        ]
      },
    ]
  }
}
