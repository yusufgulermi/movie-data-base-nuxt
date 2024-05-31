<template>
    <div class="flex justify-center items-center">
        <div class="p-10 flex flex-col max-w-[1400px]">
            <h1 class="py-4 text-[26px] font-bold font-sans">Populer Movies</h1>
            <div class="flex m-[auto]">
                <div class="flex flex-col gap-4 w-[250px]">
                    <div>Sort</div>
                    <div>Where to Watch</div>
                    <div>Filters</div>
                </div>
                <div class="flex overflow-x-scroll relative gap-4 flex-wrap w-9/12 items-center justify-center">
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

