<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDrinkById } from '../services/drinksService'
import { useFavoritesStore } from '../stores/useFavoritesStore'

const route = useRoute()
const favoritesStore = useFavoritesStore()

const drink = ref<any>(null)
const loading = ref(false)

const loadDrink = async () => {
    loading.value = true
    try {
        const { data } = await getDrinkById(route.params.id as string)
        drink.value = data.drinks?.[0] ?? null
    } catch (error) {
        console.error(error)
        drink.value = null
    } finally {
        loading.value = false
    }
}

onMounted(loadDrink)

const ingredients = computed(() => {
    if (!drink.value) return []

    const list: string[] = []

    for (let i = 1; i <= 15; i++) {
        const ingredient = drink.value[`strIngredient${i}`]
        const measure = drink.value[`strMeasure${i}`]

        if (ingredient) {
            list.push(
                measure ? `${measure} - ${ingredient}` : ingredient
            )
        }
    }

    return list
})
</script>

<template>
    <!-- LOADING -->
    <div v-if="loading" class="details">
        <p>Carregando...</p>
    </div>

    <!-- DRINK ENCONTRADO -->
    <div v-else-if="drink" class="details">
        <button class="back" @click="$router.back()">← Voltar</button>

        <div class="content">
            <div class="image-wrapper">
                <img :src="drink.strDrinkThumb" :alt="drink.strDrink" />
            </div>

            <div class="info">
                <div class="title-row">
                    <h1>{{ drink.strDrink }}</h1>

                    <button class="favorite-btn" @click="favoritesStore.toggleFavorite(drink.idDrink)">
                        {{ favoritesStore.favorites.includes(drink.idDrink) ? '★' : '☆' }}
                    </button>
                </div>

                <h3>Ingredientes</h3>
                <ul class="ingredients">
                    <li v-for="item in ingredients" :key="item">
                        {{ item }}
                    </li>
                </ul>

                <h3>Modo de preparo</h3>
                <p>{{ drink.strInstructions }}</p>
            </div>
        </div>
    </div>

    <!-- NÃO ENCONTRADO -->
    <div v-else class="details">
        <p>Drink não encontrado.</p>
    </div>
</template>

<style scoped lang="scss">
.details {
    max-width: 1100px;
    margin: 2rem auto;
    padding: 1rem;

    .back {
        margin-bottom: 2rem;
        background: none;
        border: none;
        font-weight: 600;
        cursor: pointer;
    }

    .content {
        display: flex;
        gap: 3rem;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .image-wrapper {
        flex: 1;
        min-width: 300px;

        img {
            width: 100%;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
    }

    .info {
        flex: 1;
        min-width: 300px;

        .title-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 2.5rem;
            margin: 0;
        }

        .favorite-btn {
            font-size: 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
        }

        h3 {
            margin-top: 2rem;
            margin-bottom: 0.5rem;
        }

        .ingredients {
            list-style: none;
            padding: 0;

            li {
                margin-bottom: 0.3rem;
            }
        }

        p {
            line-height: 1.6;
            color: #444;
        }
    }
}
</style>