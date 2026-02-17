<script setup lang="ts">

import { useRouter } from 'vue-router'
import Button from '../ui/button/Button.vue'
import ProfileMenu from './ProfileMenu.vue'
import Icon from "@admin/components/ui/Icon.vue";

const router = useRouter()


const goToSettings = () => {
  router.push('/settings')
}
</script>

<template>
  <header class="h-14 border-b px-6 flex items-center justify-end header-blue">
    <!-- Actions -->
    <div class="flex items-center gap-1">

      <Button @click="goToSettings" class="hover:bg-black/5">
        <Icon name="settings" />
      </Button>

      <ProfileMenu />
    </div>
  </header>
</template>
