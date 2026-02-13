// Re-export menu system from @menu package
export { menuRegistry, getMenu, getMenuNames, findMenuItemById, useMenu, debugMenuRegistry, validateMenus, getMenuTree, searchMenusByTitle, exportMenusAsJSON, getMenuStats } from '@menu/index'
export type { MenuItemConfig, PackageMenuConfig, MenuBuilder } from '@menu/index'

// Utils
export { getBackandUrl } from './lib/utils'

// Components
export { default as AdminMenu } from './components/AdminMenu.vue'
export { default as ProfileMenu } from './components/layout/ProfileMenu.vue'
export { default as EditButton } from './components/ui/EditButton.vue'
export { default as DeleteButton } from './components/ui/DeleteButton.vue'
export { default as RowActions } from './components/ui/RowActions.vue'
export { default as ConfirmDialog } from './components/ui/ConfirmDialog.vue'

