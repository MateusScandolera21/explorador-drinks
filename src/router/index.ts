import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import DrinkDetails from '../pages/DrinkDetails.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/drink/:id',
            name: 'drink-details',
            component: DrinkDetails,
            props: true
        }
    ]
})

export default router