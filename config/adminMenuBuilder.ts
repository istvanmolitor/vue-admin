
import { MenuBuilder, type MenuItemConfig } from '../../vue-menu/types/menu'

export class AdminMenuBuilder extends MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (menuName === 'admin') {
      this.addMenuItem(menu, {
        title: 'Vezérlőpult',
        path: 'dashboard'
      })
    }

    return menu
  }
}
