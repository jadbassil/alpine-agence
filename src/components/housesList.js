import pb from "../db";

export default () => ({
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
})