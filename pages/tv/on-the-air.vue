<template>
    <div class="flex justify-center items-center">
        <div class="flex overflow-x-scroll relative gap-4 flex-wrap items-center flex justify-evenly max-w-[1400px]">
            <FilterDataTemplate :endPoint="`air_date.gte=${ currentTime }&air_date.lte=${ endTime }&sort_by=popularity.desc`" :type="'tv'"/>
        </div>
    </div>
</template>

<script setup>
    import FilterDataTemplate from '../../components/FilterDataTemplate.vue';
    import { useHead } from '@vueuse/head';

    let start = new Date();
    let end = new Date(start);

    end.setMonth(end.getMonth() + 5);

    const currentTime = start.toISOString().split('T')[0];
    const endTime = end.toISOString().split('T')[0];

    useHead({
      title: 'Wacu - On the Air'
    });
</script>