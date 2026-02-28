<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '../services/drinksService'

const emit = defineEmits<{
    (e: 'select', category: string): void
}>()

const categories = ref<any[]>([])

onMounted(async () => {
    const { data } = await getCategories()
    categories.value = data.drinks
})
</script>

<template>
    <div class="category-filter">
        <select @change="emit('select', ($event.target as HTMLSelectElement).value)">
            <option value="">Filtrar por categoria</option>
            <option v-for="category in categories" :key="category.strCategory" :value="category.strCategory">
                {{ category.strCategory }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
.category-filter {
    margin-bottom: 1.5rem;

    select {
        padding: 0.6rem;
        border-radius: 8px;
        border: 1px solid #ddd;
        width: 100%;
    }
}
</style>