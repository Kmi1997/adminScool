import Axios from './callerAxios.service';

const getAllAdmin = () => {
    return Axios.get('/admin/getAll');
};

const addAdmin = (data) => {
    return Axios.post('/admin/addAdmin', data);
};

const update = (id, data) => {
    return Axios.patch(`/admin/update/${id}`, data);
};

const destroy = (id) => {
    return Axios.delete(`admin/delete/${id}`);
};

export const adminService = {
    getAllAdmin,
    addAdmin,
    update,
    destroy
};