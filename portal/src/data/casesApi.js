import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function getCases() {
    return axios
        .get('/cases');
};

export function getCase(caseId) {
    return axios
        .get(`/case/${caseId}`);
};


export function postCase(newCase) {
    return axios
        .post('/case', newCase);
};

export function deleteCase(caseId) {
    return axios
        .delete(`/case/${caseId}`);
}

export function getUserIdFromToken(){
    const token = localStorage.getItem('FBIdToken');
    const {user_id} = jwtDecode(token);
    return {user_id, token};
}

export function getConsultants(){
    const {user_id, token} = getUserIdFromToken();
    return axios
        .get(`/getConsultants/${user_id}`,{
            headers: {
                'Authorization': `${token}`
            }
        })
}


export function getAllSpec() {
    const {user_id, token} = getUserIdFromToken();

    return axios
        .get(`/admin/getAllSpec/${user_id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })
}

export function getNotification(){
    const {user_id, token} = getUserIdFromToken();

    return axios
        .get(`/getBadgeCount/${user_id}`,{
            headers: {
                'Authorization': `${token}`
            }
        })
}
