<template>
    <div class="flex flex-col w-[80%] relative left-[50%] -translate-x-[50%] mt-[30px] gap-[20px] h-[80vh]">
        <h1 class="text-[24px] font-bold">Search Result</h1>
        <div class="flex">
            <ul class="flex flex-col">
                <li
                v-for="search in searchData.list"
                :key="search.id">
                <div v-if="search?.poster_path" 
                class="flex h-[160px] w-[90%] my-[10px] rounded-lg overflow-hidden border-[1px] rounded-lg mb-2 shadow-lg">
                    <NuxtLink :to="`/${ search?.media_type }/${ search.id }`">
                        <img class="h-full max-w-[138px]" :src="`https://media.themoviedb.org/t/p/w94_and_h141_bestv2${ search?.poster_path }`">
                    </NuxtLink>
                    <div class="flex flex-col">
                        <span class="font-bold pt-[10px] px-[10px]">{{ search?.name ?? search?.title }}</span>
                        <span class="px-[10px] text-[16px]">{{ search?.overview }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script setup>
    import { useHead } from '@vueuse/head';

    const { keywords } = useRoute().params;
    const nuxtApp = useNuxtApp();
    const searchData = reactive({
        list: [],
    });

    const { data } = await useFetch(`/api/search/${ keywords }`, {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        }
    });

    onMounted(() => {
        searchData.list = data._rawValue.results;
    });

    
    useHead({
      title: `Wacu - ${ keywords }`
    });
</script>