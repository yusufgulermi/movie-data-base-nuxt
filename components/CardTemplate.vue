<template>
    <div
        class="relative flex justify-between items-center flex-col min-w-52 w-52 border-[1px] rounded-lg mb-2 shadow-lg h-[max-content]"
        v-for="card in fetchedData"
        :key="card.id">
        <HeartIcon @click="updateFavoriteState(card.id)"
            class="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#fff] opacity-70 p-[1px] cursor-pointer text-center"
            :class="{'!text-[#e40158]': favoriteStore.favorite[card.id]}"/>
        <img class="rounded-t-lg mb-2 h-[310px]" :src="`${card.poster_path ? 'https://media.themoviedb.org/t/p/w220_and_h330_face' + card.poster_path : '/_nuxt/public/1.jpg'} `">
        <div class="h-[50px] text-center font-bold w-full line-clamp-2">
            {{ card.title ?? card.name }}
        </div>
        <div class="opacity-50 font-semibold">
            {{ card.release_date ?? card.first_air_date}}
        </div>
        <div class="font-semibold">
            Vote: {{ Number(card.vote_average?.toFixed(1) ?? 0) * 10 }}%
        </div>
    </div>
</template>

<script setup>
    import { useFavoriteStore } from '../stores/favorite';
    import { HeartIcon } from '@heroicons/vue/24/solid';

    const { fetchedData } = defineProps(['fetchedData']);
    const favoriteStore =  useFavoriteStore();
    let isActive = false;

    const updateFavoriteState = (id) => {
        favoriteStore.updateStatus(id);
        isActive = !isActive;
    }
</script>