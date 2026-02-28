import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as string[]
    }),

    actions: {
        toggleFavorite(id: string) {
            if (this.favorites.includes(id)) {
                this.favorites = this.favorites.filter(f => f !== id)
            } else {
                this.favorites.push(id)
            }

            localStorage.setItem('favorites', JSON.stringify(this.favorites))
        },

        loadFavorites() {
            const stored = localStorage.getItem('favorites')
            if (stored) {
                this.favorites = JSON.parse(stored)
            }
        }
    }
})