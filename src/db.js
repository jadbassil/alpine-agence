import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_DB_URL);

export default pb;