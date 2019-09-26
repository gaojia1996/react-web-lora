const navnavWithNoAuth = {
  items: [
    {
      name: '首页',
      url: '/home',
      icon: 'icon-home',
    },
  ],
};

const navWithAuth = {
  items: [
    {
      name: '首页',
      url: '/home',
      icon: 'icon-home',
    },
    {
      name: '网关管理',
      url: '/gateway',
      icon: 'icon-feed',
    },
    {
      name: '应用管理',
      url: '/application',
      icon: 'icon-handbag',
    },
    {
      name: '设备管理',
      url: '/device',
      icon: 'icon-layers',
    },
  ],
};

const nav = { navnavWithNoAuth, navWithAuth };
export default nav;