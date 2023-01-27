import axios from 'axios';
import router from '@/router';

const Axios = axios.create({
    baseURL: 'http://localhost:3200'
});


Axios.interceptors.request.use(request => {
    let token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
});


Axios.interceptors.response.use(response => {
    return response;
},
    error => {
        if (error.response.status == 401) {
            localStorage.removeItem('token');
            router.push('/');
            alert(error.response.data.message);
        }
    });


export default Axios;