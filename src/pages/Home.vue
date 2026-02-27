<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDrinksByLetter } from '../services/drinksService'
import { useRouter } from 'vue-router'

import AlphabetFilter from '../components/AlphabetFilter.vue'

const router = useRouter()
const drinks = ref<any[]>([])
const loading = ref(false)

const loadDrinks = async (letter: string) => {
    loading.value = true
    try {
        const { data } = await getDrinksByLetter(letter)
        drinks.value = data.drinks || []
    } catch (error) {
        console.error('Error fetching drinks: ', error)
    } finally {
        loading.value = false
    }
}

const goToDetails = (id: string) => {
    router.push(`/drink/${id}`)
}

onMounted(() => {
    loadDrinks('a')
})
</script>

<template>
    <div class="home">
        <h1>Explorador de Drinks</h1>

        <div v-if="loading">Carregando drinks...</div>

        <AlphabetFilter @select="loadDrinks" />

        <div class="drinks-grid">
            <div v-for="drink in drinks" :key="drink.idDrink" class="drink-card" @click="goToDetails(drink.idDrink)">
                <img :src="drink.strDrinkThumb" />
                <p>{{ drink.strDrink }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    padding: 2rem;
}

.drinks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.drink-card {
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }

    img {
        width: 100%;
    }

    p {
        text-align: center;
        padding: 0.5rem
    }
}
</style>