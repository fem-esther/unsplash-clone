<template>
    <div class="bg-cover bg-center bg-no-repeat rounded-lg h-80 flex flex-col justify-end items-start text-white pb-6 px-4"
        :style="{ backgroundImage: `url(${photo.url})` }">
        <p class="font-normal">{{ photo.name }}</p>
        <span class="text-sm mt-1 font-light">{{ photo.location }}</span>
    </div>
</template>

<script setup>
defineProps(['photo']);
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
