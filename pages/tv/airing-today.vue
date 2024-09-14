<template>
    <div class="flex justify-center items-center">
        <div class="flex overflow-x-scroll relative gap-4 flex-wrap items-center flex justify-evenly max-w-[1400px]">
            <FilterDataTemplate :endPoint="`air_date.gte=${ pastTime }&air_date.lte=${ currentTime }`" :type="'tv'" />
        </div>
    </div>
</template>

<script setup>
    import FilterDataTemplate from '../../components/FilterDataTemplate.vue';
    import { useHead } from '@vueuse/head';

    let start = new Date();
    let end = new Date(start);

    end.setMonth(end.getMonth() - 1);

    const currentTime = start.toISOString().split('T')[0];
    const pastTime = end.toISOString().split('T')[0];

    useHead({
      title: 'Wacu - Airing Today'
    });
</script>