<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDrinkById } from '../services/drinksService'

const route = useRoute()

const drink = ref<any>(null)
const loading = ref(false)

const loadDrink = async () => {
    loading.value = true
    try {
        const { data } = await getDrinkById(route.params.id as string)
        drink.value = data.drinks[0]
    } catch (error) {
        console.error(error)
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
    <div class="details" v-if="drink">
        <button class="back" @click="$router.back()">← Voltar</button>

        <div v-if="loading">Carregando...</div>

        <div class="content">
            <img :src="drink.strDrinkThumb" :alt="drink.strDrink" />

            <div class="info">
                <h1>{{ drink.strDrink }}</h1>

                <h3>Ingredientes</h3>
                <ul>
                    <li v-for="item in ingredients" :key="item">
                        {{ item }}
                    </li>
                </ul>

                <h3>Modo de preparo</h3>
                <p>{{ drink.strInstructions }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.details {
    padding: 2rem;

    .back {
        margin-bottom: 1rem;
        border: none;
        background: none;
        cursor: pointer;
        font-weight: bold;
    }

    .content {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;

        img {
            max-width: 400px;
            width: 100%;
            border-radius: 12px;
        }

        .info {
            flex: 1;
            min-width: 250px;

            h1 {
                margin-bottom: 1rem;
            }

            h3 {
                margin-top: 1.5rem;
            }

            ul {
                padding-left: 1rem;
            }
        }
    }
}
</style>