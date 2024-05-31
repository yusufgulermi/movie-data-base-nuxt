<template>
    <div
        class="relative flex justify-between items-center flex-col min-w-52 w-52 border-[1px] rounded-lg mb-2 shadow-lg"
        v-for="card in fetchedData.list"
        :key="card.id">
        <img @click="updateFavoriteState(card.id)"
            class="absolute top-6 right-6 w-5 h-5 rounded-full bg-[#fff] opacity-90 p-[1px] cursor-pointer"
            :class="{'!bg-[#FFFF00]': favoriteStore.favorite[card.id]}"
            src="/public/star.png">
        <img class="rounded-t-lg mb-2" :src="'https://media.themoviedb.org/t/p/w220_and_h330_face' + card.poster_path">
        <div class="flex items-center h-10 justify-center text-center font-bold w-full">
            {{ card.title }}
        </div>
        <div class="opacity-50 font-semibold">
            {{ card.release_date }}
        </div>
        <div class="font-semibold">
            Vote: {{ Number(card.vote_average.toFixed(1)) * 10 }}%
        </div>
    </div>
</template>

<script setup>
    import { useFavoriteStore } from '../stores/favorite';

    const { fetchedData } = defineProps(['fetchedData']);
    const favoriteStore =  useFavoriteStore();
    let isActive = false;

    const updateFavoriteState = (id) => {
        favoriteStore.updateStatus(id);
        isActive = !isActive;
    }
</script>