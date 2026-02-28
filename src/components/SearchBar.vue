<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
    (e: 'search', value: string): void
}>()

const search = ref('')
let timeout: number | undefined

watch(search, (value) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
        emit('search', value)
    }, 500)
})
</script>

<template>
    <div class="search-bar">
        <input v-model="search" type="text" placeholder="Buscar drink pelo nome..." />
    </div>
</template>

<style scoped lang="scss">
.search-bar {
    margin-bottom: 1.5rem;

    input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 1rem;
    }
}
</style>