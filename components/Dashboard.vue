<script setup lang="ts">
import DashboardLayout from './layout/DashboardLayout.vue'
import Card from './ui/Card.vue'
import CardHeader from './ui/CardHeader.vue'
import CardTitle from './ui/CardTitle.vue'
import CardDescription from './ui/CardDescription.vue'
import CardContent from './ui/CardContent.vue'
import { TrendingUp, Users, ShoppingCart, DollarSign, BarChart3, LayoutDashboard } from 'lucide-vue-next'

const stats = [
  {
    title: 'Összes bevétel',
    value: '2,450,000 Ft',
    change: '+20.1%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Felhasználók',
    value: '1,234',
    change: '+15.3%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Rendelések',
    value: '892',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-purple-600'
  },
  {
    title: 'Növekedés',
    value: '+12.5%',
    change: '+4.1%',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

const recentActivities = [
  { user: 'Nagy Péter', action: 'Új rendelés', time: '5 perce' },
  { user: 'Kovács Anna', action: 'Profil frissítés', time: '12 perce' },
  { user: 'Szabó János', action: 'Termék vásárlás', time: '23 perce' },
  { user: 'Tóth Éva', action: 'Komment hozzáadva', time: '1 órája' },
]
</script>

<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Page Header -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground mt-1">Üdvözöljük a vezérlőpulton</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card v-for="stat in stats" :key="stat.title" class="hover:shadow-md transition-shadow">
          <CardContent class="p-6">
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <p class="text-sm font-medium text-muted-foreground">{{ stat.title }}</p>
                <h3 class="text-2xl font-bold tracking-tight">{{ stat.value }}</h3>
                <div class="flex items-center gap-1 text-xs">
                  <TrendingUp :size="12" class="text-emerald-600" />
                  <span class="font-medium text-emerald-600">{{ stat.change }}</span>
                  <span class="text-muted-foreground">vs előző hónap</span>
                </div>
              </div>
              <div class="p-2.5 rounded-lg bg-muted">
                <component :is="stat.icon" :size="20" class="text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart Card -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-base">
              <BarChart3 :size="18" />
              Értékesítési áttekintés
            </CardTitle>
            <CardDescription>Havi értékesítési adatok</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div class="text-center">
                <BarChart3 :size="40" class="mx-auto mb-2 text-muted-foreground" />
                <p class="text-sm text-muted-foreground">Diagram helye</p>
                <p class="text-xs text-muted-foreground">Integráljon chart library-t</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Activity -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-base">
              <Users :size="18" />
              Legutóbbi tevékenységek
            </CardTitle>
            <CardDescription>A legfrissebb felhasználói események</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="activity in recentActivities"
                :key="activity.time"
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {{ activity.user.split(' ').map(n => n[0]).join('') }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ activity.user }}</p>
                  <p class="text-xs text-muted-foreground truncate">{{ activity.action }}</p>
                </div>
                <span class="text-xs text-muted-foreground">{{ activity.time }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Full Width Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-base">
            <LayoutDashboard :size="18" />
            Projekt áttekintés
          </CardTitle>
          <CardDescription>Aktuális projektek és státuszok</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border">
                  <th class="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Projekt</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Státusz</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Előrehaladás</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Határidő</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-border hover:bg-accent/50 transition-colors">
                  <td class="py-3 px-4 text-sm font-medium">Weboldal újratervezés</td>
                  <td class="py-3 px-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Folyamatban</span></td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" style="width: 75%"></div>
                      </div>
                      <span class="text-xs font-medium text-muted-foreground">75%</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-sm text-muted-foreground">2026. feb. 15.</td>
                </tr>
                <tr class="border-b border-border hover:bg-accent/50 transition-colors">
                  <td class="py-3 px-4 text-sm font-medium">Mobil alkalmazás</td>
                  <td class="py-3 px-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">Tervezés</span></td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" style="width: 30%"></div>
                      </div>
                      <span class="text-xs font-medium text-muted-foreground">30%</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-sm text-muted-foreground">2026. márc. 01.</td>
                </tr>
                <tr class="border-b border-border hover:bg-accent/50 transition-colors">
                  <td class="py-3 px-4 text-sm font-medium">API integráció</td>
                  <td class="py-3 px-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Felülvizsgálat</span></td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" style="width: 90%"></div>
                      </div>
                      <span class="text-xs font-medium text-muted-foreground">90%</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-sm text-muted-foreground">2026. jan. 30.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
</template>
