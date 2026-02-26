import { MenuBuilder, type MenuItemConfig } from '../../ts-menu'

export class AdminMenuBuilder extends MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (menuName !== 'admin') {
      return menu
    }

    const items: MenuItemConfig[] = [
      {
        id: 'dashboard',
        title: 'Dashboard dddddd',
        icon: 'LayoutDashboard',
        path: '/',
        children: [],
        order: 10,
      },
      {
        id: 'users',
        title: 'Felhasználók',
        icon: 'Users',
        path: '/users',
        children: [
          {
            id: 'orders',
            title: 'Rendelések',
            icon: 'ShoppingCart',
            path: '/orders',
            children: [],
            order: 30,
          },
          {
            id: 'analytics',
            title: 'Analitika',
            icon: 'BarChart3',
            path: '/analytics',
            children: [],
            order: 40,
          },
          {
            id: 'content',
            title: 'Tartalom',
            icon: 'FileText',
            path: '/content',
            children: [],
            order: 50,
          },
          {
            id: 'settings',
            title: 'Beállítások',
            icon: 'Settings',
            path: '/settings',
            children: [],
            order: 60,
          },
        ],
        order: 20,
      },
    ]

    items.forEach(item => this.addMenuItem(menu, item))

    return menu
  }
}
