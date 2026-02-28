<script setup lang="ts">
import SaveButton from './SaveButton.vue'
import CancelButton from './CancelButton.vue'

interface Props {
  isSaving?: boolean
  saveLabel?: string
  cancelLabel?: string
  saveDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSaving: false,
  saveLabel: 'Mentés',
  cancelLabel: 'Mégse',
  saveDisabled: false
})

defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="flex w-full justify-end gap-2">
    <CancelButton
        :label="cancelLabel"
        :disabled="isSaving"
        @click="$emit('cancel')"
    />
    <SaveButton
        :is-saving="isSaving"
        :label="saveLabel"
        :disabled="saveDisabled"
        @click="$emit('save')"
    />
  </div>
</template>
