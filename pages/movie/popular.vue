<template>
    <div class="flex justify-center items-center">
        <div class="p-10 flex flex-col max-w-[1400px]">
            <h1 class="py-4 text-[26px] font-bold font-sans">Populer Movies</h1>
            <div class="flex m-[auto]">
                <div class="flex flex-col w-[250px] gap-2">
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex justify-between">
                        <span>Sort</span>
                        <span>›</span>
                    </div>
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex justify-between">
                        <span>Where to Watch</span>
                        <span>›</span>
                    </div>
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex justify-between">
                        <span>Filter</span>
                        <span>›</span>
                    </div>
                </div>
                <div class="flex overflow-x-scroll relative gap-4 flex-wrap w-9/12 items-center flex justify-evenly">
                    <CardTemplate :fetchedData="fetchedData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CardTemplate from '../../components/CardTemplate.vue';

    const nuxtApp = useNuxtApp();
    const fetchedData = reactive({
        list: [],
    });

    const { data } = await useFetch('/api/movie', {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    onMounted(() => {
        fetchedData.list = data._rawValue.mp;
    })
</script>

