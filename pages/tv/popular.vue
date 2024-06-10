<template>
    <div class="flex justify-center items-center">
        <div class="flex overflow-x-scroll relative gap-4 flex-wrap items-center flex justify-evenly max-w-[1400px]">
            <FilterDataTemplate :endPoint="'sort_by=popularity.desc'" :type="'tv'"/>
        </div>
    </div>
</template>

<script setup>
    import FilterDataTemplate from '../../components/FilterDataTemplate.vue';
</script>
