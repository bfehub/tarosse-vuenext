export default defineAppConfig({
  pages: [
    // ================ 首页 ======================================
    'pages/index/index',
    // ...
    // ================ 我的 ======================================
    'pages/mine/index',
    // ...
  ],
  tabBar: {
    color: '#000000',
    selectedColor: '#478EF2',
    list: [
      {
        text: '项目',
        pagePath: 'pages/index/index',
        iconPath: 'assets/tabbar/index.png',
        selectedIconPath: 'assets/tabbar/index-active.png',
      },
      {
        text: '我的',
        pagePath: 'pages/mine/index',
        iconPath: 'assets/tabbar/mine.png',
        selectedIconPath: 'assets/tabbar/mine-active.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro',
    navigationBarTextStyle: 'black',
  },
})
