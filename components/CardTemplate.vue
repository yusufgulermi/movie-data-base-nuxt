<template>
    <div v-for="card in fetchedData"
        :key="card.id">
        <div v-if="card?.poster_path" 
        class="relative flex justify-between items-center flex-col min-w-52 w-52 border-[1px] rounded-lg mb-2 shadow-lg h-[max-content]">
            <HeartIcon @click="updateFavoriteState(card.id)"
                class="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#fff] opacity-70 p-[1px] cursor-pointer text-center z-[1]"
                :class="{'!text-[#e40158]': favoriteStore.favorite[card.id]}"/>
            <NuxtLink :to="`/${ type }/${ card.id }`">
                <div class="mb-[10px] relative">
                    <img class="rounded-t-lg mb-2 h-[310px]" :src="`https://media.themoviedb.org/t/p/w220_and_h330_face${ card.poster_path }`">
                    <div class="flex justify-center items-center w-[50px] h-[50px] absolute bg-black rounded-[25px] bottom-[-16px] left-[10px]">
                        <span class="text-white text-[14px]">{{ Number(card.vote_average?.toFixed(1) ?? 0) * 10 }}%</span>
                        <canvas class="absolute top-0" :data-percent="`${ Number(card.vote_average?.toFixed(1) ?? 0) * 10 }`" width="50" height="50"></canvas>
                    </div>
                </div>
                <div class="h-[50px] font-bold w-full line-clamp-2 px-[10px] items-end flex">
                    {{ card.title ?? card.name }}
                </div>
                <div class="opacity-50 font-semibold px-[10px] pb-[10px] w-full">
                    {{ card.release_date ?? card.first_air_date}}
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    import { useFavoriteStore } from '../stores/favorite';
    import { HeartIcon } from '@heroicons/vue/24/solid';

    const { fetchedData, type } = defineProps(['fetchedData', 'type']);
    const favoriteStore =  useFavoriteStore();
    let isActive = false;

    const updateFavoriteState = (id) => {
        favoriteStore.updateStatus(id);
        isActive = !isActive;
    }

    const drawCircle = (ctx, color, lineWidth, percent) => {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth
        ctx.stroke();
    };

    const createVoteCanvas = () => {
        document.querySelectorAll('canvas').forEach((element) => {
            const ctx = element.getContext('2d');
            const percentage = Number(element.getAttribute('data-percent'))
            ctx.translate(25, 25);
            ctx.rotate((-0.5) * Math.PI);
            drawCircle(ctx, '#204529', 6,  100 / 100);
            drawCircle(ctx, percentage < 70 ? '#d2d531' : '#21d07a', 4, percentage / 100);
        });
    }

    onMounted(() => createVoteCanvas());
</script>