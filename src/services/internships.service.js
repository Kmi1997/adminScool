import Axios from './callerAxios.service';

const getAllInternships = () => {
    return Axios.get('/internship/getInternship');
};

const addInternship = (data) => {
    return Axios.post('/internship/addInternship', data);
};

const update = (id, data) => {
    return Axios.patch(`/internship/updating/${id}`, data);
};

const destroy = (id) => {
    return Axios.delete(`internship/delete/${id}`);
};

export const internshipService = {
    getAllInternships,
    addInternship,
    update,
    destroy
};