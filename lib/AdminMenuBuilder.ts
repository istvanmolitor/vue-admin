import { MenuBuilder, type MenuItemConfig } from '../../ts-menu'

export class AdminMenuBuilder extends MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (menuName !== 'admin') {
      return menu
    }

    const items: MenuItemConfig[] = [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'LayoutDashboard',
        path: '/',
        children: [],
        order: 10,
      },
    ]

    items.forEach(item => this.addMenuItem(menu, item))

    return menu
  }
}
