import axios from 'axios';
import {getUserIdFromToken} from "./adminApi";

export function getCases() {
    const {user_id,token} = getUserIdFromToken();
    return axios
        .get(`/admin/getAllCase/${user_id}`,{
                headers: {
                    'Authorization': `${token}`
                }
          })

}

export function getCase(caseId) {
    return axios
        .get(`/case/${caseId}`);
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