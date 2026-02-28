<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDrinksByLetter } from '../services/drinksService'
import { getDrinksByName } from '../services/drinksService'
import { getDrinksByCategory } from '../services/drinksService'
import { useRouter } from 'vue-router'

import { useFavoritesStore } from '../stores/useFavoritesStore'
import AlphabetFilter from '../components/AlphabetFilter.vue'
import SearchBar from '../components/SearchBar.vue'
import AppHeader from '../components/AppHeader.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

const router = useRouter()
const drinks = ref<any[]>([])
const loading = ref(false)
const favoritesStore = useFavoritesStore()

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

const searchDrinks = async (name: string) => {
    if (!name.trim()) {
        loadDrinks('a')
        return
    }

    loading.value = true

    try {
        const { data } = await getDrinksByName(name)
        drinks.value = data.drinks || []
    } catch (error) {
        console.error('Error searching drinks: ', error)
    } finally {
        loading.value = false
    }
}

const filterByCategory = async (category: string) => {
    if (!category) return

    loading.value = true

    try {
        const { data } = await getDrinksByCategory(category)
        drinks.value = data.drinks || []
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const goToDetails = (id: string) => {
    router.push(`/drink/${id}`)
}

const isFavorite = (id: string) => {
    return favoritesStore.favorites.includes(id)
}

onMounted(() => {
    loadDrinks('a')
})
</script>

<template>
    <div class="home">
        <AppHeader />
        <br />
        <div v-if="loading">Carregando drinks...</div>
        <br />
        <SearchBar @search="searchDrinks" />
        <CategoryFilter @select="filterByCategory" />
        <AlphabetFilter @select="loadDrinks" />

        <div class="drinks-grid">
            <div v-for="drink in drinks" :key="drink.idDrink" class="drink-card" @click="goToDetails(drink.idDrink)">
                <button class="favorite-btn" @click.stop="favoritesStore.toggleFavorite(drink.idDrink)">
                    {{ isFavorite(drink.idDrink) ? '★' : '☆' }}
                </button>
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
    background: white;
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    cursor: pointer;
    transition: 0.25s ease;
    position: relative;

    &:hover {
        transform: translateY(-4px);
    }

    img {
        height: 200px;
        object-fit: cover;
    }

    p {
        font-weight: 600;
        padding: 1rem;
    }

    position: relative;

    .favorite-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: white;
        border: none;
        border-radius: 50%;
        padding: 0.3rem 0.5rem;
        cursor: pointer;
        font-size: 1rem;
    }
}
</style>