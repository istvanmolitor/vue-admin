# vue-admin

A Vue 3 admin UI component library with layout and UI components.

## Installation

```bash
npm install vue-admin
```

This will also install the required peer dependencies:
- `clsx`
- `tailwind-merge`
- `class-variance-authority`

## Peer Dependencies

Make sure you have `vue` installed in your project:

```bash
npm install vue
```

9## Routing

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

