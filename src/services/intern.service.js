import Axios from './callerAxios.service';

const getAllInterns = () => {
    return Axios.get('/intern/getAll');
};

const addIntern = (data) => {
    return Axios.post('/intern/addIntern', data);
};

const update = (id, data) => {
    return Axios.patch(`/intern/updating/${id}`, data);
};

const destroy = (id) => {
    return Axios.delete(`intern/delete/${id}`);
};

export const internService = {
    getAllInterns,
    addIntern,
    update,
    destroy
};