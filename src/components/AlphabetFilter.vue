<script setup lang="ts">

const emit = defineEmits<{
    (e: 'select', letter: string): void
}>()

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
</script>

<template>
    <div class="alphab">
        <button v-for="letter in alphabet" :key="letter" @click="emit('select', letter)">
            {{ letter }}
        </button>
    </div>
</template>

<style scoped lang="scss">
.alphabet {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    button {
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 6px;
        background: #eee;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background: #ddd;
        }
    }
}
</style>