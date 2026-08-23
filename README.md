# vue-admin

A Vue 3 admin UI component library with layout and UI components.

## Installation

This package is not published to npm. It is registered as `@molitor/vue-admin` and resolved via
the `@admin` alias configured in the root `vite.config.js` and `tsconfig.json`
(`resources/js/packages/vue-admin`). Import it as `@admin` (e.g. `@admin/lib/AdminMenuBuilder`),
never by npm package name.

It depends on `clsx`, `tailwind-merge`, and `class-variance-authority`, which are already listed
in the root `package.json`.

## Peer Dependencies

Make sure you have `vue` installed in your project:

```bash
npm install vue
```

## Routing

The admin package provides routes with `/admin` prefix for all admin pages:

### Auth Routes
- `/admin/login` - Admin login page
- `/admin/forgot-password` - Password reset page
- `/admin/logout` - Logout endpoint
- `/admin/profile` - User profile page
- `/admin/change-password` - Change password page

### Dashboard
- `/admin` - Admin dashboard (default admin page)

### User Management
- `/admin/users` - User list
- `/admin/users/create` - Create new user
- `/admin/users/:id/edit` - Edit user

### User Groups
- `/admin/user-groups` - User groups list
- `/admin/user-groups/create` - Create new user group
- `/admin/user-groups/:id/edit` - Edit user group

### Permissions
- `/admin/permissions` - Permissions list
- `/admin/permissions/create` - Create new permission
- `/admin/permissions/:id/edit` - Edit permission

All admin routes require authentication and admin role, except for auth pages (login, forgot-password).

## Components

### Layout
- `AdminLayout` – Main admin layout wrapper
- `AppHeader` – Top navigation header
- `AppSidebar` – Side navigation bar

### UI
- `Button` – Button component with variants
- `DataCard` – Card for displaying data
- `StatsCard` – Statistics card
- `StatusBadge` – Badge for status display
- `Icon` – Icon wrapper component

### Utilities
- `cn` – Class name utility (`clsx` + `tailwind-merge`)

