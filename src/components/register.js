import pb from "../db";

export default () => ({
    userData: {
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        emailVisibility: true
    },
    errMsg: '',
    async register() {
      console.log('register');
      if(this.userData.password !== this.userData.passwordConfirm) {
        this.errMsg = 'Password mismatch';
        return;
      }
      try {
        await  pb.collection('users').create(this.userData);
        await pb.collection('users').requestVerification(this.userData.email); 
        window.location.href = './auth.html'
      } catch(error) {
        console.log(error.data);
        this.errMsg = JSON.stringify(error.data);
      }
     
    }
})