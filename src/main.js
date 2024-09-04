import Alpine from "alpinejs";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

console.log(pb.authStore.token);

Alpine.data('housesList', () => ({
    housesList: [],
    async init() {
        await this.fetchHouses();
    },
    async fetchHouses() {
        const houses = await pb.collection('maison').getFullList({});
        this.housesList = houses.map(house => {
            house.imageUrl = pb.getFileUrl(house, house.image);
            return house;
        });
        console.log(this.housesList);
    },
    updateList() {
        this.fetchHouses();
    },
    async setFavori(house) {
        console.log("setFavori called!");
        await pb.collection('maison').update(house.id, {favori: !house.favori});
        house.favori = !house.favori;
    },
    async deleteHouse(id) {
        try {
            await pb.collection('maison').delete(id);
            console.log('success');
            document.dispatchEvent(new CustomEvent('house-added'));
        } catch (err) {
            console.error('Error deleting record:', err);
        }
    }
}))

Alpine.data('formHandler', () => ({
    responseMessage: '',
    async submitForm(event) {
        try {
            const form = event.target 
            const formData = new FormData(form)
            await pb.collection('maison').create(formData)
            this.responseMessage = 'Form submitted successfully!';
            document.dispatchEvent(new CustomEvent('house-added'));
        } catch (error) {
            console.log(error);
            console.error(error.message);
            // Print the error response data
                if (error.data) {
                console.error(error.data);
                }
            this.responseMessage = 'An error occurred. Please try again.';
        }
    }
}));


window.alpine = Alpine;
Alpine.start() 