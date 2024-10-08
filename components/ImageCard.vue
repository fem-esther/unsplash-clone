<template>
    <div :style="{ backgroundImage: `url(${photo.urls.small})` }"
        class="bg-cover bg-center bg-no-repeat bg-black rounded-lg h-80 flex flex-col justify-end items-start text-white pb-6 px-4">
        <p class="font-normal">{{ photo.user.name }}</p>
        <span class="text-sm mt-1 font-light">{{ photo.user.location || 'Unknown Location' }}</span>
    </div>
</template>

<script setup>
defineProps({
    photo: {
        type: Object,
        required: true
    }
});
</script>
