<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "./index.ts"
import { Primitive } from "reka-ui"
import { cn } from "@admin/lib/utils"
import { buttonVariants } from "./index.ts"

interface Props {
  variant?: ButtonVariants["variant"] | 'primary'
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  as?: string
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  asChild: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
