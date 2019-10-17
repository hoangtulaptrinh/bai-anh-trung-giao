import axios from 'axios'

export function Data(url, method, body) {
    return axios({
        method: method,
        url: url,
        data: body
    })
        .catch(error => {
            console.log(error)
        });
};

export function Params(url, method = 'GET', body) {
    return axios({
        method: method,
        url: url,
        params: body
    })
        .catch(error => {
            console.log(error)
        });
};