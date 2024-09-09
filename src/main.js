import Alpine from "alpinejs";
import pb from "./db";
import auth from "./components/auth";
import housesList from "./components/housesList";
import formHandler from "./components/formHandler";
import register from "./components/register";

console.log(pb.authStore.token);

Alpine.data('housesList', housesList);
Alpine.data('formHandler', formHandler);
Alpine.data('auth', auth);
Alpine.data('register', register);

Alpine.store('auth', {
    isLoggedIn: false,
    checkLoginStatus() {
        // Implement your authentication check logic here
        // For example, you could check for a token in localStorage
        this.isLoggedIn = localStorage.getItem('userToken') !== null;
        console.log('checking login...',  this.isLoggedIn);
    }
});

window.alpine = Alpine;
Alpine.start() 