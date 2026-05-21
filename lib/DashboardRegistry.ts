import { ref } from 'vue'
import { DashboardWidgetBuilder, type DashboardWidgetConfig } from './dashboard'

export const dashboardUpdateTrigger = ref(0)

class DashboardRegistry {
  private builders: DashboardWidgetBuilder[] = []

  register(builder: DashboardWidgetBuilder): void {
    this.builders.push(builder)
    dashboardUpdateTrigger.value++
  }

  unregister(builder: DashboardWidgetBuilder): boolean {
    const index = this.builders.indexOf(builder)
    if (index === -1) {
      return false
    }

    this.builders.splice(index, 1)
    dashboardUpdateTrigger.value++

    return true
  }

  getWidgets(): DashboardWidgetConfig[] {
    let widgets: DashboardWidgetConfig[] = []

    this.builders.forEach((builder) => {
      widgets = builder.build(widgets)
    })

    return widgets.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER

      return orderA - orderB
    })
  }

  clear(): void {
    this.builders = []
    dashboardUpdateTrigger.value++
  }
}

export const dashboardRegistry = new DashboardRegistry()

