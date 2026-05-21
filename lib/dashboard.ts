import type { Component } from 'vue'

export interface DashboardWidgetConfig {
  id: string
  component: Component
  order?: number
}

export abstract class DashboardWidgetBuilder {
  abstract build(widgets: DashboardWidgetConfig[]): DashboardWidgetConfig[]

  addWidget(widgets: DashboardWidgetConfig[], widget: DashboardWidgetConfig): void {
    widgets.push(widget)
  }
}

