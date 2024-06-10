<template>
    <div class="flex justify-center items-center">
        <div class="flex overflow-x-scroll relative gap-4 flex-wrap items-center flex justify-evenly max-w-[1400px]">
            <FilterDataTemplate :endPoint="`primary_release_date.gte=${ currentTime }&primary_release_date.lte=${ endTime }&sort_by=popularity.desc`" :type="'movie'"/>
        </div>
    </div>
</template>

<script setup>
    let start = new Date();
    let end = new Date(start);

    end.setMonth(end.getMonth() + 5);

    const currentTime = start.toISOString().split('T')[0];
    const endTime = end.toISOString().split('T')[0];

    import FilterDataTemplate from '../../components/FilterDataTemplate.vue';
</script>