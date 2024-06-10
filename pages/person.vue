<template>
    <div class="flex flex-col w-[80%] relative left-[50%] -translate-x-[50%] mt-[30px] gap-[20px]">
        <h1 class="text-[24px] font-bold">Popular People</h1>
        <div class="flex flex-wrap justify-between gap-10">
            <div
                class="relative flex flex-col w-[250px] border-[1px] rounded-lg mb-2 shadow-lg h-[max-content]"
                v-for="person in personData.list"
                :key="person.id">
                <img class="rounded-t-lg mb-2 h-[310px]" :src="`${person.profile_path ? 'https://media.themoviedb.org/t/p/w220_and_h330_face' + person.profile_path : '/_nuxt/public/1.jpg'} `">
                <div class="flex items-center h-10 text-center font-bold w-full px-2">
                    {{ person.name }}
                </div>
                <div class="flex flex-wrap h-[50px] text-[14px] opacity-70 px-2">
                    <p> {{ person.known_for[0].title ?? person.known_for[0].name }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const nuxtApp = useNuxtApp();

    const personData = reactive({
        list: [],
    });

    const { data } = await useFetch('/api/person', {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    onMounted(() => {
        personData.list = data._rawValue.results

        console.log(personData.list[3])
    })
</script>