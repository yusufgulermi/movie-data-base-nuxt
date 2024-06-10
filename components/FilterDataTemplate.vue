<template>
    <div class="flex justify-center items-center">
        <div class="p-10 flex flex-col">
            <h1 class="py-4 text-[26px] font-bold font-sans">Popular Movies</h1>
            <div class="flex m-[auto] max-w-[1400px]">
                <div class="flex flex-col w-[258px] gap-2">
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex h-[58px] duration-100 flex-col overflow-hidden gap-[20px]"
                    :class="{'!h-[148px]': isExtended.sort}"
                    @click="isExtended.sort = !isExtended.sort">
                        <div class="flex justify-between w-full">
                            <span class="text-[18px]">Sort</span>
                            <span>›</span>
                        </div>
                        <div class="flex gap-[10px] flex-col py-[3px] w-full border-t-[1px] border-[#00000020]">
                            <span class="font-thin">Sort Results By</span>
                            <select id="filter" class="font-normal border-solid border-[1px] border-[#777570] rounded text-[14px] py-[5px]"
                            @click="(event) => event.stopPropagation()">
                                <option value="popularity.desc">Popular Descending</option>
                                <option value="popularity.asc">Popular Ascending</option>
                                <option value="vote_average.desc">Rating Descending</option>
                                <option value="vote_average.asc">Rating Ascending</option>
                                <option value="primary_release_date.desc">Release Descending</option>
                                <option value="primary_release_date.asc">Release Ascending</option>
                                <option value="title.desc">Title(A-Z)</option>
                            </select>
                        </div>
                    </div>
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex h-[58px] duration-100 flex-col overflow-hidden gap-[20px]"
                    :class="{'!h-[max-content]': isExtended.provider}"
                    @click="isExtended.provider = !isExtended.provider">
                        <div class="flex justify-between w-full">
                            <span class="text-[18px]">Where to Watch</span>
                            <span>›</span>
                        </div>
                        <div class="flex pt-3 w-full border-t-[1px] border-[#00000020]">
                                <CloudIcon class="h-6 w-6 text-white-500" />
                                <h2>Providers</h2>
                            </div>
                        <ul id="providers-id" class="flex flex-wrap gap-[5px]" 
                        @click="(event) => event.stopPropagation()">
                            <ProviderTemplate :fetchedData="fetchedData.providers"/>
                        </ul>
                    </div>
                    <div class="px-[14px] py-[16px] border-[1px] rounded-lg shadow-lg font-semibold cursor-pointer flex h-[58px] duration-100 flex-col overflow-hidden gap-[20px]"
                    :class="{'!h-[max-content]': isExtended.filter}"
                    @click="isExtended.filter = !isExtended.filter">
                        <div class="flex justify-between w-full">
                            <span class="text-[18px]">Filters</span>
                            <span>›</span>
                        </div>
                        <div class="flex flex-col py-3 w-full border-t-[1px] border-[#00000020]" 
                        @click="(event) => event.stopPropagation()">
                            <div class="mb-[10px] flex w-full">
                                <FilmIcon class="h-6 w-6 text-black" />
                                <h2>Genres</h2>
                            </div>
                            <ul id="genres-id" class="flex flex-wrap gap-[7px]">
                                <li
                                v-for="genre in fetchedData.genres"
                                :key="genre.id"
                                class="group rounded-full relative hover:bg-[#01b4e4] hover:text-white h-[max-content] flex justify-center items-center overflow-hidden"
                                @click="e => e.currentTarget.querySelector('span').classList.toggle('selected')">
                                    <span class="rounded-full font-normal text-[14px] w-full h-full py-[4px] px-2 hover:border-[#01b4e4] border-[1px] border-[#9e9e9e]"
                                    :data-value="genre.id">
                                        {{genre.name}}
                                    </span>
                                </li> 
                            </ul>
                            <div class="flex pt-3 mt-2 w-full border-t-[1px] border-[#00000020]">
                                <CalendarDaysIcon class="h-6 w-6 text-white-500" />
                                <h2>Release Date</h2>
                            </div>
                            <DatePicker/>
                        </div>
                    </div>
                    <div class="flex justify-center w-full h-[48px] items-center border-[1px] border-solid rounded-full bg-[#01b4e4] text-white cursor-pointer"
                    @click="filterData()">
                        <span>Search</span>
                    </div>
                </div>
                <div v-if="fetchedData.list.length" class="flex overflow-x-scroll relative gap-4 flex-wrap w-9/12 flex h-[max-content] pl-[30px]">
                    <CardTemplate :fetchedData="fetchedData.list"/>
                </div>
                <div v-else class="w-[calc(100vw-800px)] pl-[30px]">There is no data.</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CardTemplate from '../components/CardTemplate';
    import ProviderTemplate from '../components/ProviderTemplate';
    import DatePicker from '../components/DatePickerTemplate.vue';
    import { CalendarDaysIcon, FilmIcon, CloudIcon } from '@heroicons/vue/24/solid';

    const fetchedData = reactive({
        list: [],
        providers: [],
        genres: [],
    });
    let { endPoint, type } = defineProps(['endPoint', 'type']);
    let isExtended = ref({
        sort: false,
        provider: false,
        filter: false,
    });
    let filterEndPoint = ref({
        genres: '',
        providers: '',
    });

    const payloadHeader = {
        headers: {
            'Authorization': import.meta.env.VITE_MOVIE_TOKEN,
            'accept': 'application/json',
        }
    }

    const getSearchData = async(endPoint) => {
        return await $fetch(`https://api.themoviedb.org/3/discover/${ type }?page=1&with_runtime.gt=0&with_runtime.lte=400&vote_average.lte=10&vote_count.gte=0&vote_average.gte=0&${ endPoint }`,
            payloadHeader
        );
    }

    const getProviders = async() => {
        return await $fetch(`https://api.themoviedb.org/3/watch/providers/${ type }?watch_region=us`,
            payloadHeader
        );
    }

    const getGenres = async() => {
        return await $fetch(`https://api.themoviedb.org/3/genre/${ type }/list?language=en`,
            payloadHeader
        );
    }

    const filterData = async() => {
        filterEndPoint.genres = '';
        filterEndPoint.providers = '';

        document.querySelectorAll('#genres-id li .selected').forEach((e) => {
            filterEndPoint.genres += `${e.getAttribute('data-value')},`
        });
        
        document.querySelectorAll('#providers-id .selected').forEach((e) => {
            filterEndPoint.providers += `${e.getAttribute('data-value')}|`
        });

        endPoint = `sort_by=${ document.querySelector('#filter').value }&with_genres=${ filterEndPoint
        .genres }&release_date.lte=${document.querySelector('#end-date')
        .textContent}&with_watch_providers=${ filterEndPoint.providers}`;

        fetchedData.list = (await getSearchData(endPoint)).results;
        fetchedData.providers = (await getProviders()).results;
        fetchedData.genres = (await getGenres()).genres;
    }
    onMounted(async() => {
        fetchedData.list = (await getSearchData(endPoint)).results;
        fetchedData.providers = (await getProviders()).results;
        fetchedData.genres = (await getGenres()).genres;

        console.log(fetchedData)
    })
</script>

