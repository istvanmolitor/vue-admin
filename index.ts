// Re-export menu system from @menu package
export { menuRegistry, getMenu, getMenuNames, findMenuItemById, useMenu, debugMenuRegistry, validateMenus, getMenuTree, searchMenusByTitle, exportMenusAsJSON, getMenuStats } from '@menu/index'
export type { MenuItemConfig, PackageMenuConfig, MenuBuilder } from '@menu/index'

// Config
export { AdminMenuBuilder } from './config/adminMenuBuilder'
export { SettingsMenuBuilder } from './config/settingsMenuBuilder'

// Utils
export { getBackandUrl } from './lib/utils'
export { useDevError } from './lib/useDevError'

// Router
export { default as adminRoutes } from './router/index'

// Components
export { default as AdminMenu } from './components/AdminMenu.vue'
export { default as ProfileMenu } from './components/layout/ProfileMenu.vue'
export { default as Settings } from './components/Settings.vue'
export { EditButton, DeleteButton, IconButton } from './components/ui/button'
export { default as RowActions } from './components/ui/RowActions.vue'
export { default as ConfirmDialog } from './components/ui/ConfirmDialog.vue'
export { default as FieldError } from './components/ui/FieldError.vue'
export { default as DevErrorModal } from './components/ui/DevErrorModal.vue'

