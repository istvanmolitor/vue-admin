<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useMenu } from '@admin/index'
import { watchEffect } from 'vue'

const { menuItems, hasChildren } = useMenu('settings')

// Debug: log menu items
watchEffect(() => {
  console.log('Settings menu items:', menuItems.value)
  console.log('Menu items count:', menuItems.value?.length)
})
</script>

<template>
  <div class="settings-page">
    <h1 class="text-3xl font-bold mb-6">Beállítások</h1>

    <nav class="settings-menu">
      <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.id" class="menu-item">
          <!-- Parent item with children -->
          <div v-if="hasChildren(item)" class="menu-parent">
            <div class="menu-header">
              <component v-if="item.icon" :is="item.icon" class="menu-icon" />
              <span class="menu-title">{{ item.title }}</span>
            </div>

            <ul class="submenu-list">
              <li v-for="child in item.children" :key="child.id" class="submenu-item">
                <RouterLink v-if="child.path" :to="child.path" class="menu-link">
                  <component v-if="child.icon" :is="child.icon" class="menu-icon" />
                  <span class="menu-title">{{ child.title }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Single item without children -->
          <RouterLink v-else-if="item.path" :to="item.path" class="menu-link">
            <component v-if="item.icon" :is="item.icon" class="menu-icon" />
            <span class="menu-title">{{ item.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 1200px;
  margin: 0 auto;
}

.settings-menu {
  width: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.menu-item {
  background-color: hsl(var(--color-card));
  border: 1px solid hsl(var(--color-border));
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
}

.menu-item:hover {
  border-color: hsl(var(--color-primary));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.menu-parent {
  display: flex;
  flex-direction: column;
}

.menu-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: hsl(var(--color-foreground));
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
  color: hsl(var(--color-muted-foreground));
  transition: all 0.2s;
  border-radius: 0.375rem;
}

.menu-link:hover {
  background-color: hsl(var(--color-accent));
  color: hsl(var(--color-accent-foreground));
}

.menu-link.router-link-active {
  background-color: hsl(var(--color-primary) / 0.1);
  color: hsl(var(--color-primary));
  font-weight: 500;
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.menu-title {
  font-size: 0.875rem;
}

.submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.submenu-item {
  /* No additional styles needed */
}
</style>


