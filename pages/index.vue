<template>
    <section class="min-h-screen w-full flex flex-col items-center">
        <div class="h-96 w-full bg-gray-200 flex items-center justify-center 2xl:px-40 lg:px-24 md:px-12 px-4">
            <div class="relative w-full">
                <input v-model="query" type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-[#46242E] placeholder:text-[#46242E80] text-sm rounded-lg focus:ring-primary-300 focus:border-primary-300 block w-full p-5 pl-12"
                    :placeholder="searchPlaceholder" @keyup.enter="searchPhotos" />
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#46242E80]" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
                    </svg>
                </span>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center">
            <p>Loading...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="text-center text-red-500">
            <p>{{ error }}</p>
        </div>

        <!-- Display photos array for debugging -->
        <div v-if="!loading && photos.length" class="hidden">
            <pre>{{ photos }}</pre> <!-- Display raw photo data for debugging -->
        </div>

        <!-- Grid of Cards -->
        <div v-if="!loading && photos.length"
            class="w-full grid grid-cols-3 gap-16 2xl:px-56 ld:px-28 md:px-16 px-6 relative -top-20">
            <ImageCard v-for="photo in photos" :key="photo.id" :photo="photo" />
        </div>

        <!-- Loading Placeholders for Search -->
        <div v-if="loading && query"
            class="w-full grid grid-cols-3 gap-16 2xl:px-56 ld:px-28 md:px-16 px-6 relative -top-20">
            <div v-for="index in 9" :key="index" class="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
        </div>

        <!-- No Results -->
        <div v-if="!loading && photos.length === 0" class="text-center">
            <p>No results found.</p>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useImageStore } from '~/stores/imageStore';
import ImageCard from '@/components/ImageCard.vue';

const store = useImageStore();
const query = ref('');
const searchPlaceholder = ref('Search for photos');

// Fetch random photos on page load
onMounted(async () => {
    await store.fetchRandomPhotos();
});

// Search Photos
const searchPhotos = async () => {
    if (query.value.trim() === '') {
        return; // Don't search if the query is empty
    }
    searchPlaceholder.value = `Showing results for "${query.value}"`;
    await store.searchImages(query.value);
    console.log('Search Results:', store.photos); // Log the search results for debugging
};

// Watch for changes in photos and log them
watch(() => store.photos, (newPhotos) => {
    console.log('Updated Photos:', newPhotos);
});

// Destructure state from the store
const loading = computed(() => store.loading);
const error = computed(() => store.error);
const photos = computed(() => store.photos);
</script>
