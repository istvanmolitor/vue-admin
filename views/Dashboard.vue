<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue';
import Card from '../components/ui/Card.vue';
import CardHeader from '../components/ui/CardHeader.vue';
import CardTitle from '../components/ui/CardTitle.vue';
import CardContent from '../components/ui/CardContent.vue';
import StatsCard from '../components/ui/StatsCard.vue';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-vue-next';
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight">Admin Vezérlőpult</h1>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Összes felhasználó"
          value="120"
          :icon="Users"
          description="+4 az elmúlt hónapban"
        />
        <StatsCard
          title="Bejegyzések"
          value="45"
          :icon="FileText"
          description="+2 ma"
        />
        <StatsCard
          title="Látogatók"
          value="2,350"
          :icon="LayoutDashboard"
          description="+12% az elmúlt héten"
        />
        <StatsCard
          title="Beállítások"
          value="Módosítva"
          :icon="Settings"
          description="Legutóbb: 2 órája"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Legutóbbi tevékenység</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">Itt láthatóak majd a legutóbbi események.</p>
          </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Gyors műveletek</CardTitle>
          </CardHeader>
          <CardContent class="space-y-2">
            <button class="w-full text-left px-4 py-2 text-sm hover:bg-accent rounded-md">Új bejegyzés létrehozása</button>
            <button class="w-full text-left px-4 py-2 text-sm hover:bg-accent rounded-md">Felhasználók kezelése</button>
            <button class="w-full text-left px-4 py-2 text-sm hover:bg-accent rounded-md">Rendszerbeállítások</button>
          </CardContent>
        </Card>
      </div>
    </div>
  </AdminLayout>
</template>
