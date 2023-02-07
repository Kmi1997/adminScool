import Axios from './callerAxios.service';

const getAllInterns = () => {
    return Axios.get('/intern/getAll');
};

const addIntern = (data) => {
    return Axios.post('/intern/addIntern', data);
};

const update = (id, data) => {
    return Axios.patch(`/intern/update/${id}`, data);
};

const destroy = (id) => {
    return Axios.delete(`intern/destroy/${id}`);
};

export const internService = {
    getAllInterns,
    addIntern,
    update,
    destroy
};