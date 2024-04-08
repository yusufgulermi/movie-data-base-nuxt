<template>
    <main class="overflow-y-hidden">
        <div class="flex w-full h-96 items-center justify-center flex-col relative">
            <div class="home-background w-full absolute bg-no-repeat bg-center bg-cover h-full blur-sm brightness-75"></div>
            <p class="relative text-4xl text-white w-9/12 mb-5 font-semibold">Welcome.<br>Millions of movies, TV shows and people to discover. Explore now.</p>
            <label class="w-9/12 relative h-10">
                <input class="w-full absolute h-full rounded-full focus:outline-none pl-5" type="text" placeholder="Search for a movie, tv show, person......">
                <button class="w-28 h-full text-white rounded-full absolute bg-[#17819B] right-0 hover:text-black font-semibold"> Search </button>
            </label>
        </div>
        <div class="flex w-max items-center pl-10">
            <p class="text-2xl font-semibold">Show Case</p> 
            <div class="m-5 flex rounded-full border-[1px] border-solid border-black w-max">
                <button 
                @click="fetchData(PAYLOADS.MOST_POPULAR, 'first')" 
                class="w-40 h-10 relative"
                v-bind:class="{'button-change': isActive?.first}">
                    Most Popular
                </button>
                <button 
                @click="fetchData(PAYLOADS.TOP_RATED, 'second')" 
                class="w-40 h-10 relative"
                v-bind:class="{'button-change': isActive?.second}">
                    Top Rated
                </button>
            </div>
        </div>
        <div class="flex overflow-x-scroll relative mx-10 gap-4">
            <CardTemplate :fetchedData="fetchedData"/>
        </div>
    </main>
</template>

<script setup>
    import axios from 'axios';
    import CardTemplate from '../components/CardTemplate.vue';
    import { HEADER, PAYLOADS } from '../enums/MovieData';

    let fetchedData = ref([]);
    let isActive = ref({})

    const fetchData = async(url, order) => {
        let config = {
            method: 'get',
            maxBodyLength: 2,
            url: url,
            headers: HEADER
        };

        await axios.request(config)
        .then((response) => {
            fetchedData.value = response.data.results;
            isActive.value = {};
            isActive.value[order] = true
        })
        .catch((error) => {
            console.log(error);
        });
    };

    onBeforeMount(async() => {
        fetchData(PAYLOADS.MOST_POPULAR, 'first')
    });
</script>