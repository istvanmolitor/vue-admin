<script setup lang="ts">
import { useMenu } from '@admin/index.ts'
import AdminLayout from "@admin/components/layout/DashboardLayout.vue";

const { menuItems, hasChildren } = useMenu('settings')

</script>

<template>
  <AdminLayout>
    <div class="p-6">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        <template v-for="item in menuItems" :key="item.path || item.id">
          <router-link
            v-if="item.path"
            :to="item.path"
            class="flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
            :class="{
              'bg-blue-500 text-white border-blue-600 shadow-md': $route.path === item.path,
              'bg-white text-gray-700 border-gray-200 hover:border-blue-300': $route.path !== item.path
            }"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              :size="48"
              class="mb-3"
              :stroke-width="1.5"
            />
            <span class="text-lg font-semibold text-center">{{ item.title }}</span>
          </router-link>
        </template>
      </div>

      <div v-for="item in menuItems" :key="item.path || item.id">
        <div v-if="hasChildren(item)" class="mb-6">
          <h3 class="text-xl font-bold text-gray-800 mb-3 px-2">{{ item.title }}</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <template v-for="child in item.children" :key="child.path || child.id">
              <router-link
                v-if="child.path"
                :to="child.path"
                class="flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md"
                :class="{
                  'bg-blue-500 text-white border-blue-600': $route.path === child.path,
                  'bg-white text-gray-700 border-gray-200 hover:border-blue-300': $route.path !== child.path
                }"
              >
                <component
                  v-if="child.icon"
                  :is="child.icon"
                  :size="32"
                  :stroke-width="1.5"
                />
                <span class="text-base font-medium">{{ child.title }}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <router-view />
      </div>
    </div>
  </AdminLayout>
</template>
