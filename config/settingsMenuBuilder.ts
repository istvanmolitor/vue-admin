import { MenuBuilder, type MenuItemConfig } from '@menu/types/menu'

/**
 * Settings Menu Builder
 * Initializes the settings menu structure
 */
export class SettingsMenuBuilder extends MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (menuName === 'settings') {
      // Settings menu is initialized here, packages can subscribe to it
      // No default items needed initially
    }

    return menu
  }
}


