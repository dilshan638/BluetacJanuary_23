import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function getAllUser(page) {
    return axios
        .get(`/admin/users?page=${page}`)
        .then((res) => {
            return res.data
        })
} 

export function loginUser(userData) {
    return axios
        .post('/admin/Login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            return res;
        });
}

const setAuthorizationHeader = (token) => {
    const FBIdAdminToken = `Bearer ${token}`;
    localStorage.setItem('FBIdAdminToken', FBIdAdminToken);
    axios.defaults.headers.common['Authorization'] = FBIdAdminToken;
};

export function logoutUser() {
    localStorage.removeItem('FBIdAdminToken');
    delete axios.defaults.headers.common['Authorization'];
}

export function getUserData(user_id) {
    const userId = user_id || getUserIdFromToken().user_id;
    return axios
        .get(`/user/${userId}`)
        .then((res) => {
            return res.data;
        });
}

export function getUserIdFromToken() {
    const token = localStorage.getItem('FBIdAdminToken');
    const {user_id} = jwtDecode(token);
    return {user_id, token};
}

export const isAutheticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("FBIdAdminToken")) {
        getUserIdFromToken();
    } else {
        return false;
    }
};


export const addConst = (CaseId, data) => {

    const {user_id, token} = getUserIdFromToken();

    return axios
        .put(`/addCons/${user_id}/${CaseId}`, data, {
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

export function updateSpec(specId, data) {
    const {user_id, token} = getUserIdFromToken();

    return axios
        .put(`/admin/updateSpec/${user_id}/${specId}`, data, {
            headers: {
                'Authorization': `${token}`
            }
        })
}

export function addSpec(data) {
    const {user_id, token} = getUserIdFromToken();

    return axios
        .post(`/admin/addSpec/${user_id}`, data, {
            headers: {
                'Authorization': `${token}`
            }
        })
}


export function getAllAlertCases(){
    const {user_id, token} = getUserIdFromToken();
    return axios
        .get(`/admin/getAllAlertCases/${user_id}`,{
            headers:{
                'Authorization': `${token}`
            }
        })
}


