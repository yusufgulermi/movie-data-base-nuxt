<template>
    <div class="flex justify-center items-center flex-col w-full">
        <div class="max-w-[1400px] flex py-10 gap-10 px-10">
            <div class="flex min-w-[300px] flex-col">
                <img class="rounded-xl"
                :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${ fetchedData.list.profile_path }`">
                <div class="mt-[20px] flex flex-col gap-[5px]">
                    <span class="font-bold text-[20px]">Personal Info</span>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Known For</span>
                        <span>{{ fetchedData.list?.known_for_department }}</span>
                    </div>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Known Credits</span>
                        <span>{{ fetchedData.list?.popularity }}</span>
                    </div>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Gender</span>
                        <span>{{ fetchedData.list?.gender ? 'Male' : 'Female' }}</span>
                    </div>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Birthday</span>
                        <span>{{ fetchedData.list?.birthday }}</span>
                    </div>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Place of Birth</span>
                        <span>{{ fetchedData.list?.place_of_birth }}</span>
                    </div>
                    <div class="flex flex-col border-[1px] rounded-lg mb-2 shadow-lg py-[2px] px-[10px]">
                        <span class="font-medium">Also Known As</span>
                        <ul>
                            <li v-for="known in fetchedData.list?.also_known_as" :key="known.id">
                                <span>{{ known }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-[10px]">
                <h1 class="font-bold text-[32px]">{{ fetchedData.list?.name }}</h1>
                <span class="font-medium text-[20px]">Biography</span>
                <span>{{ fetchedData.list.biography}}</span>
                <span class="font-medium text-[20px]">Known For</span>
                <div class="flex max-w-[70vw] overflow-x-scroll py-[20px]">
                    <ul class="flex relative gap-[15px] w-max">
                        <li v-for="movies in fetchedData.list?.combined_credits?.cast.slice(0,8)" :key="movies.id">
                            <div v-if="movies?.poster_path"
                            class="w-[130px] flex flex-col border-[1px] rounded-lg shadow-lg overflow-hidden">
                                <img :src="`https://image.tmdb.org/t/p/w150_and_h225_bestv2${ movies?.poster_path }`">
                                <span class="text-[12px] px-[5px] pt-[5px] opacity-[0.7]">{{ movies?.original_title }}</span>
                            </div>
                        </li>
                    </ul>
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

    const { data } = await useFetch(`/api/person/${ id }`, {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    onMounted(() => {
        fetchedData.list = data._rawValue;
    });

    useHead({
      title: 'Wacu - Person'
    });
</script>