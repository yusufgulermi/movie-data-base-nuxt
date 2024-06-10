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
                @click="switchData('mp', 'first')" 
                class="w-40 h-10 relative"
                :class="{'button-change': isActive.list?.first}">
                    Most Popular
                </button>
                <button 
                @click="switchData('tp', 'second')" 
                class="w-40 h-10 relative"
                :class="{'button-change': isActive.list?.second}">
                    Top Rated
                </button>
            </div>
        </div>
        <div class="flex overflow-x-scroll relative mx-10 gap-4">
            <CardTemplate :fetchedData="fetchedData.list"/>
        </div>
    </main>
</template>

<script setup>
    import CardTemplate from '../components/CardTemplate.vue';

    const nuxtApp = useNuxtApp();
    const fetchedData = reactive({
        list: [],
    });
    let isActive = reactive({
        list: {
            first: true,
        },
    })

    const { data } = await useFetch('/api/movie', {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    const switchData = (endpoint, status) =>{
        fetchedData.list = data._rawValue[endpoint];

        isActive.list = {};
        isActive.list[status] = true;
    }

    onMounted(() => {
        fetchedData.list = data._rawValue.mp;
    })
</script>