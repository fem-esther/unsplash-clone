import { defineStore } from 'pinia';
import axios from 'axios';

export const useImageStore = defineStore('image', {
    state: () => ({
        photos: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchRandomPhotos() {
            this.loading = true;
            this.error = null;
            try {
                const accessKey = 'GqpnE0gOEvUdGysV307oTyOH7Huca-KpNjDyELdTm40'; // Add your access key here
                const response = await axios.get(`https://api.unsplash.com/photos/random`, {
                    headers: {
                        Authorization: `Client-ID ${accessKey}`,
                    },
                    params: { count: 9 },
                });

                console.log(response);


                this.photos = response.data.map(photo => ({
                    id: photo.id,
                    url: photo.urls.small,
                    name: photo.user.name,
                    location: photo.user.location || 'Unknown Location',
                }));

                console.log(this.photos);

            } catch (error) {
                this.error = 'Failed to fetch images. Please try again later.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async searchImages(query) {
            this.loading = true;
            this.error = null;
            try {
                const accessKey = 'GqpnE0gOEvUdGysV307oTyOH7Huca-KpNjDyELdTm40'; // Add your access key here
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: { query },
                    headers: {
                        Authorization: `Client-ID ${accessKey}`,
                    },
                });

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
