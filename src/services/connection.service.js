import Axios from './callerAxios.service';

const connection = (infos) => {
    return Axios.post('/admin/testConnection', infos);
};

const getThisAdmin = () => {
    return Axios.get('/admin/getThisAdmin');
};

const addAdmin = (admin) => {
    Axios.post('/admin/addAdmin', admin);
};



export const accountService = {
    connection,
    getThisAdmin,
    addAdmin
};