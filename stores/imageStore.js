import { defineStore } from 'pinia';
import axios from 'axios';

export const useImageStore = defineStore('image', {
    state: () => ({
        photos: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchImages(query = 'latest') {
            this.loading = true;
            this.error = null;
            try {
                const accessKey = 'GqpnE0gOEvUdGysV307oTyOH7Huca-KpNjDyELdTm40'; // Add your access key here
                const response = await axios.get(`https://api.unsplash.com/photos/${query}`, {
                    headers: {
                        Authorization: `Client-ID ${accessKey}`,
                    },
                });

                // Map the response to the format you need
                this.photos = response.data.map(photo => ({
                    id: photo.id,
                    url: photo.urls.small,
                    name: photo.user.name,
                    location: photo.user.location || 'Unknown Location', // Handle if location is not provided
                }));
            } catch (error) {
                this.error = 'Failed to fetch images. Please try again later.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async searchImages(query) {
            // You can use the search endpoint for queries
            this.loading = true;
            this.error = null;
            try {
                const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY'; // Add your access key here
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: { query },
                    headers: {
                        Authorization: `Client-ID ${accessKey}`,
                    },
                });

                // Map the response to the format you need
                this.photos = response.data.results.map(photo => ({
                    id: photo.id,
                    url: photo.urls.small,
                    name: photo.user.name,
                    location: photo.user.location || 'Unknown Location',
                }));
            } catch (error) {
                this.error = 'Failed to fetch images. Please try again later.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
