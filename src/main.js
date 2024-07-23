import Alpine from "alpinejs";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
// const authData = await pb.admins.authWithPassword('jadbassil1@gmail.com', 'jbassil,25');
// console.log(pb.authStore.isValid);
console.log(pb.authStore.token);

async function getHousesData() {
    const houses = await pb.collection('maison').getFullList({});
    return houses;
}

Alpine.data('housesList', (favori=false) => ({
    housesList: {},
    favori: false,
    async init() {
        const houses = await pb.collection('maison').getFullList({});
        this.housesList = houses.map(house => {
            house.imageUrl = pb.getFileUrl(house, house.image);
            return house;
        });
        console.log(this.housesList);
    },
}))

Alpine.data('formHandler', () => ({
    responseMessage: '',
    async submitForm(event) {
        try {
            const form = event.target 
            const formData = new FormData(form)
            await pb.collection('maison').create(formData)
            this.responseMessage = 'Form submitted successfully!';
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