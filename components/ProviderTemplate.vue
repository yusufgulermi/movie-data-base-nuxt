<template>
    <li
    v-for="card in fetchedData"
    :key="card.id"
    :data-value="card.provider_id"
    class="group rounded-lg relative hover:bg-[#01b4e4e6]"
    @click="e => {
        e.currentTarget.querySelector('span').classList.toggle('!flex');
        e.currentTarget.querySelector('img').classList.toggle('opacity-[0.3]');
        e.currentTarget.classList.toggle('selected');
        }">
        <img class="rounded-lg w-[50px] h-[50px] group-hover:opacity-[0.3]" :src="`https://media.themoviedb.org/t/p/original${card.logo_path}`">
        <span class="check-mark top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 absolute w-[35px] h-[35px] hidden group-hover:!flex" />
    </li>
</template>

<script setup>
    const { fetchedData } = defineProps(['fetchedData']);
</script>