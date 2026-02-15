// Re-export menu system from @menu package
export { menuRegistry, getMenu, getMenuNames, findMenuItemById, useMenu, debugMenuRegistry, validateMenus, getMenuTree, searchMenusByTitle, exportMenusAsJSON, getMenuStats } from '@menu/index'
export type { MenuItemConfig, PackageMenuConfig, MenuBuilder } from '@menu/index'

// Config
export { AdminMenuBuilder } from './config/adminMenuBuilder'
export { SettingsMenuBuilder } from './config/settingsMenuBuilder'

// Utils
export { getBackandUrl } from './lib/utils'

// Router
export { default as adminRoutes } from './router/index'

// Components
export { default as AdminMenu } from './components/AdminMenu.vue'
export { default as ProfileMenu } from './components/layout/ProfileMenu.vue'
export { default as Settings } from './components/Settings.vue'
export { default as EditButton } from './components/ui/EditButton.vue'
export { default as DeleteButton } from './components/ui/DeleteButton.vue'
export { default as IconButton } from './components/ui/IconButton.vue'
export { default as RowActions } from './components/ui/RowActions.vue'
export { default as ConfirmDialog } from './components/ui/ConfirmDialog.vue'
export { default as FieldError } from './components/ui/FieldError.vue'

