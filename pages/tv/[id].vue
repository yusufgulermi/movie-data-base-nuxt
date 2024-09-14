<template>
    <div class="flex justify-center items-center flex-col w-full">
        <div class="w-full bg-no-repeat bg-cover bg-center"
            :style="`background-image:url(https://media.themoviedb.org/t/p/w1920_and_h800_face${ fetchedData.list.backdrop_path })`">
            <div class="custom-background w-full flex justify-center items-center">
                <div class="p-[40px] flex gap-10 max-w-[1400px]">
                    <img class="w-[300px] h-[450px] rounded-[20px]"
                        :src="`https://media.themoviedb.org/t/p/w600_and_h900_face${ fetchedData.list.poster_path }`">
                    <div class="text-white">
                        <div class="flex flex-col py-[20px]">
                            <h1 class="text-[36px] font-bold">{{ fetchedData.list.name }}</h1>
                            <div class="flex w-full">
                                <span> {{ fetchedData.list.first_air_date }} •&nbsp;</span>
                                <ul class="flex">
                                    <li 
                                    v-for="genre in fetchedData.list.genres"
                                    :key="genre.id">
                                    {{genre.name }}&nbsp;
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex">
                            <span class="text-[18px] italic opacity-[0.7]">{{ fetchedData.list.tagline }}</span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[21px] my-[8px] font-bold">Overview</h1>
                            <span>{{ fetchedData.list.overview }}</span>
                        </div>
                        <div class="relative h-[70px] flex items-center gap-[10px] mt-[30px]">
                            <div class="flex justify-center items-center w-[70px] h-[70px] bg-black rounded-[35px]">
                                <span class="text-white text-[16px]">{{ Number(fetchedData.list.vote_average?.toFixed(1) ?? 0) * 10 }}%</span>
                                <canvas class="absolute top-0" :data-percent="`${ Number(fetchedData.list.vote_average?.toFixed(1) ?? 0) * 10 }`" width="70" height="70"></canvas>
                            </div>
                            <span>User Score</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-full overflow-hidden max-w-[1400px] flex-col">
            <h1 class="mt-[10px] ml-[10px] font-medium text-[22px]">Top Billed Cast</h1>
            <div class="flex gap-[50px]">
                <div class="overflow-x-scroll w-[70%]">
                    <ul v-if="fetchedData.list.credits?.cast.length" class="flex relative w-max">
                        <li class="flex flex-col h-[260px] w-[138px] m-[10px] rounded-lg overflow-hidden border-[1px] rounded-lg mb-2 shadow-lg"
                            v-for="index in 10"
                            :key="fetchedData.list.credits?.cast[index - 1]?.cast_id">
                            <img class="w-[138px]"
                                :src="`${ fetchedData.list.credits?.cast[index - 1]?.profile_path ? 'https://media.themoviedb.org/t/p/w138_and_h175_face'+ fetchedData.list.credits?.cast[index - 1]?.profile_path : '/_nuxt/public/1.jpg' }`">
                            <span class="font-bold pt-[10px] px-[10px]">{{ fetchedData.list.credits?.cast[index - 1]?.original_name }}</span>
                            <span class="px-[10px] text-[14px]">{{ fetchedData.list.credits?.cast[index - 1]?.character }}</span>
                        </li>
                    </ul>
                </div>
                <div class="w-[30%] flex flex-col items-start gap-[10px] justify-center">
                    <div class="w-[50%] flex justify-center flex-col items-start border-[1px] rounded-lg shadow-lg px-[10px] py-[2px]">
                        <h1 class="font-bold">Status</h1>
                        <span>{{ fetchedData.list.status }}</span>
                    </div>
                    <div class="w-[50%] flex justify-center flex-col items-start border-[1px] rounded-lg shadow-lg px-[10px] py-[2px]">
                        <h1 class="font-bold">Original Language</h1>
                        <span>{{ fetchedData.list.spoken_languages?.[0]?.english_name ?? 'Unknown' }}</span>
                    </div>
                    <div class="w-[50%] flex justify-center flex-col items-start border-[1px] rounded-lg shadow-lg px-[10px] py-[2px]">
                        <h1 class="font-bold">Type</h1>
                        <span>{{ fetchedData.list.type }}</span>
                    </div>
                    <div class="w-[50%] flex justify-evenly flex-col items-start border-[1px] rounded-lg shadow-lg px-[10px] py-[2px] h-[80px]">
                        <h1 class="font-bold">Network</h1>
                        <img :src="`https://media.themoviedb.org/t/p/h30/${ fetchedData.list?.networks?.[0]?.logo_path }`"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useHead } from '@vueuse/head';

    const { id } = useRoute().params;
    const nuxtApp = useNuxtApp();
    let fetchedData = reactive({
        list:[],
    });

    const { data } = await useFetch(`/api/product/tv/${ id }`, {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    const drawCircle = (ctx, color, lineWidth, percent) => {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, 27, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth
        ctx.stroke();
    };

    const createVoteCanvas = () => {
        document.querySelectorAll('canvas').forEach((element) => {
            const ctx = element.getContext('2d');
            const percentage = Number(element.getAttribute('data-percent'))
            ctx.translate(35, 35);
            ctx.rotate((-0.5) * Math.PI);
            drawCircle(ctx, '#204529', 6,  100 / 100);
            drawCircle(ctx, percentage < 70 ? '#d2d531' : '#21d07a', 4, percentage / 100);
        });
    }

    onMounted(() => {
        fetchedData.list = data._rawValue;
        setTimeout(()=>createVoteCanvas(), 100);
    });

    useHead({
      title: 'Wacu - Tv Series'
    });
</script>