import api from './api'

export const getDrinksByLetter = (letter: string) => {
    return api.get(`search.php?f=${letter}`)
}

export const getDrinkById = (id: string) => {
    return api.get(`lookup.php?i=${id}`)
}

export const getDrinksByName = (name: string) => {
    return api.get(`search.php?s=${name}`)
}

export const getCategories = () => {
    return api.get('list.php?c=list')
}

export const getDrinksByCategory = (category: string) => {
    return api.get(`filter.php?c=${category}`)
}