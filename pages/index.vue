<template>
    <main class="overflow-y-hidden max-w-[1400px]">
        <div class="flex w-full h-96 items-center justify-center flex-col relative">
            <div class="home-background w-full absolute bg-no-repeat bg-center bg-cover h-full blur-sm brightness-75"></div>
            <p class="relative text-4xl text-white w-[90%] mb-5 font-semibold">Welcome.<br>Millions of movies, TV shows and people to discover. Explore now.</p>
            <label class="w-[90%] relative h-10">
                <input class="w-full absolute h-full rounded-full focus:outline-none pl-5" type="text" placeholder="Search for a movie, tv show, person......">
                <button @click="searchKeywords()"
                    class="w-28 h-full text-white rounded-full absolute bg-[#17819B] right-0 hover:text-black font-semibold">Search</button>
            </label>
        </div>
        <div class="flex w-max items-center pl-10">
            <p class="text-2xl font-semibold">Movies</p> 
            <div class="m-5 flex rounded-full border-[1px] border-solid border-[#032541] w-max">
                <button 
                @click="switchData('pm', 'first', 'movieList')" 
                class="w-40 h-[32px] relative"
                :class="{'button-change': isActive.movieList?.first}">
                    Most Popular
                </button>
                <button 
                @click="switchData('tm', 'second', 'movieList')" 
                class="w-40 h-[32px] relative"
                :class="{'button-change': isActive.movieList?.second}">
                    Top Rated
                </button>
            </div>
        </div>
        <div class="flex overflow-x-scroll relative mx-10 gap-4">
            <CardTemplate :fetchedData="fetchedData.movieList" :type="'movie'"/>
        </div>
        <div class="flex w-max items-center pl-10">
            <p class="text-2xl font-semibold">TV Series</p> 
            <div class="m-5 flex rounded-full border-[1px] border-solid border-[#032541] w-max">
                <button 
                @click="switchData('pt', 'first', 'tvList')" 
                class="w-40 h-[32px] relative"
                :class="{'button-change': isActive.tvList?.first}">
                    Most Popular
                </button>
                <button 
                @click="switchData('tt', 'second', 'tvList')" 
                class="w-40 h-[32px] relative"
                :class="{'button-change': isActive.tvList?.second}">
                    Top Rated
                </button>
            </div>
        </div>
        <div class="flex overflow-x-scroll relative mx-10 gap-4">
            <CardTemplate :fetchedData="fetchedData.tvList" :type="'tv'"/>
        </div> 
    </main>
</template>

<script setup>
    import CardTemplate from '../components/CardTemplate.vue';

    const nuxtApp = useNuxtApp();
    const fetchedData = reactive({
        movieList: [],
        tvList: [],
    });
    let isActive = reactive({
        movieList: {
            first: true,
        },
        tvList: {
            first: true,
        },
    })

    const { data } = await useFetch('/api/movie', {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
    });

    const searchKeywords = () => {
        const keywords = document.querySelector('label input')?.value;

        if (keywords) {
            useRouter().push(`search/${ keywords }`)
        }
    }

    const switchData = (endpoint, status, list) =>{
        fetchedData[list] = data._rawValue[endpoint].results;

        isActive[list] = {};
        isActive[list][status] = true;
    }

    onMounted(() => {
        fetchedData.movieList = data._rawValue.pm.results;
        fetchedData.tvList = data._rawValue.pt.results;
    })
</script>