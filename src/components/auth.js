import pb from "../db";

export default () => ({
    email: '',
    password: '',
    rememberMe: false,
    errMsg: '',
    async login(event) {
        console.log('login:', this.email, this.password);
        try {
            const authData = await pb.collection('users').authWithPassword(this.email, this.password);
            console.log(authData);
            console.log(pb.authStore.isValid);
            console.log(pb.authStore.token);
            console.log(pb.authStore.model.id);
            if(this.rememberMe){
                console.log('rememberMe:', this.rememberMe);
                localStorage.setItem('userToken', pb.authStore.token);
            }
            window.location.href = "../pages/houses.html";
        } catch (error) {
            switch (error.status) {
                case 400:
                    this.errMsg = "Incorrect email or password"
                    break;
                case 500:
                    this.errMsg = 'Internal Server Error';
                    break;

                default:
                    this.errMsg = 'Unknown  Error';

            }
            console.log(error);
        }
    }
});
