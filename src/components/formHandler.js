import pb from "../db";

export default () => ({
    responseMessage: '',
    async submitForm(event) {
        try {
            const form = event.target; 
            const formData = new FormData(form);
            await pb.collection('maison').create(formData);
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
})