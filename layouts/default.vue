<template>
    <div class="flex gap-10 bg-[#242E34] text-white flex-col">
        <nav class="flex gap-10 justify-between w-full">
            <div class="flex gap-10 items-center pl-5">
                <a href="/"><img src="/public/logo.png" width="50" height="50" /></a>
                <div class="group relative cursor-pointer h-full content-center">
                    Movies
                    <div class="absolute flex item-center justify-center z-10 flex-col bg-[#fff] text-black rounded w-[170px] py-2 gap-2 top-12 hidden group-hover:flex shadow-lg shadow-black">
                        <NuxtLink to="/movie/popular" class="!pl-6 hover:bg-[#d7c5f7]">Popular</NuxtLink>
                        <NuxtLink to="/movie/now-playing" class="!pl-6 hover:bg-[#d7c5f7]">Now Playing</NuxtLink>
                        <NuxtLink to="/movie/upcoming" class="!pl-6 hover:bg-[#d7c5f7]">Upcoming</NuxtLink>
                        <NuxtLink to="/movie/top-rated" class="!pl-6 hover:bg-[#d7c5f7]">Top Rated</NuxtLink>
                    </div>
                </div>
                <div class="group relative cursor-pointer h-full content-center">
                    TV Shows
                    <div class="absolute flex item-center justify-center z-10 flex-col bg-[#fff] text-black rounded w-[170px] py-2 gap-2 top-12 hidden group-hover:flex shadow-lg shadow-black">
                        <NuxtLink to="/tv/popular" class="!pl-6 hover:bg-[#d7c5f7]">Popular</NuxtLink>
                        <NuxtLink to="/tv/airing-today" class="!pl-6 hover:bg-[#d7c5f7]">Airing Today</NuxtLink>
                        <NuxtLink to="/tv/on-the-air" class="!pl-6 hover:bg-[#d7c5f7]">On TV</NuxtLink>
                        <NuxtLink to="/tv/top-rated" class="!pl-6 hover:bg-[#d7c5f7]">Top Rated</NuxtLink>
                    </div>
                </div>
                <div class="group relative cursor-pointer h-full content-center">
                    People
                    <div class="absolute flex item-center justify-center z-10 flex-col bg-[#fff] text-black rounded w-[170px] py-2 gap-2 top-12 hidden group-hover:flex shadow-lg shadow-black">
                        <NuxtLink to="/person" class="!pl-6 hover:bg-[#d7c5f7]">Popular People</NuxtLink>
                    </div>
                </div>
                <div class="group relative cursor-pointer h-full content-center">
                    More
                    <div class="absolute flex item-center justify-center z-10 flex-col bg-[#fff] text-black rounded w-[170px] py-2 gap-2 top-12 hidden group-hover:flex shadow-lg shadow-black">
                        <NuxtLink to="/more/discuss" class="!pl-6 hover:bg-[#d7c5f7]">Discussions</NuxtLink>
                        <NuxtLink to="/more/leader-board" class="!pl-6 hover:bg-[#d7c5f7]">Leader Board</NuxtLink>
                        <NuxtLink to="/more/talk" class="!pl-6 hover:bg-[#d7c5f7]">Support</NuxtLink>
                        <NuxtLink to="/more/docs" class="!pl-6 hover:bg-[#d7c5f7]">API</NuxtLink>
                    </div>
                </div>
            </div>
            <div class="flex gap-5 items-center mr-5">
                <div class="flex items-center justify-center text-white bg-[#0C66E4] gap-1 cursor-pointer rounded text-sm py-1.5 pr-2.5 p-1.5">
                    <span class="flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                            <path d="M13 11V7a1 1 0 00-2 0v4H7a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z"
                                fill="currentColor" fill-rule="evenodd">
                            </path>
                        </svg>
                    </span>
                    <span>Create</span>
                </div>
                <div class="relative w-max">
                    <span class="absolute w-4 h-4 text-white top-2 left-2">
                        <svg class="w-4 h-4 text-black" width="24" height="24" viewBox="0 0 24 24" role="presentation">
                            <path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                                fill="currentColor" fill-rule="evenodd">
                            </path>
                        </svg>
                    </span>
                    <input @input="searchKeywords" class="h-8 w-full outline-none rounded-sm text-sm text-black bg-search-grey pr-3.5 pl-7 border-gray-400 border-solid border-2" placeholder="Search">
                </div>
                <div v-if="filteredData.value.length > 0" class="absolute top-16 z-10 bg-white text-black max-h-[250px] overflow-y-scroll w-full left-0">
                    <SearchKeywordsTemplate
                        v-for="card in filteredData.value" 
                        :key="card.id" 
                        :title="card.title"
                        :name="card.name"
                        :media="card.media_type"
                    />
                </div>
                <div class="flex items-center cursor-pointer hover:rounded-full hover:bg-gray-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                        <path d="M6.485 17.669a2 2 0 002.829 0l-2.829-2.83a2 2 0 000 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 00.64-6.356 1.01 1.01 0 10-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 00-2.788-.84 5.036 5.036 0 00-3.57 1.478z"
                            fill="white" fill-rule="evenodd">
                        </path>
                    </svg>
                </div>
                <div class="border-solid border cursor-pointer px-1.5 py-0.5 border-gray-400">EN</div>
                <div class="cursor-pointer">
                    <svg width="32" height="32" viewBox="-1.8 -1.8 21.60 21.60" fill="#ffffff" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path fill="#ffffff" d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z">
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
        </nav>
    </div>
    <div>
        <slot />
    </div>
</template>

<script setup>
    import SearchKeywordsTemplate from '../components/SearchKeywordsTemplate.vue';
    import debounce from 'debounce';
    
    let filteredData = reactive({
        value: []
    });

    const getSearchData = async(endPoint) => {
        return await $fetch(`https://api.themoviedb.org/3/search/multi?query=${ endPoint }`, {
            headers: {
                'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
                'accept': 'application/json',
            },
        });
    }

    const searchKeywords = debounce(async(event) => {
        if (event.target.value.length >= 3) {
            filteredData.value = (await getSearchData(event.target.value)).results
        } else {
            filteredData.value = [];
        }
    }, 500);
</script>
