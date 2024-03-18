import axios from 'axios';
import config from "../config";

const baseURL = config.API_BASE_URL;

function makeApiRequest(url, method = 'get', headers = {}, data = {}, timeout = 0) {
    const config = {
        method,
        url,
        headers,
        data,
        maxBodyLength: Infinity,
        timeout
    };

    return axios.request(config)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

export const login = async (username, password) => (
    await makeApiRequest(baseURL + 'readers/login/', 'post', {}, { username, password })
);

export const verifyToken = async (token) => (
    await makeApiRequest(
        baseURL + 'readers/token-verify/',
        'post',
        {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json',
        }
    )
);

export const allBooks = async () => (
    await makeApiRequest(baseURL + 'books/')
);

export const allReaders = async () => (
    await makeApiRequest(baseURL + 'readers/')
);

export const loanBookToReader = async (token, book, user) => (
    await makeApiRequest(
        baseURL + 'book/loan/',
        'post',

        {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json',
        },
        { book, user })
);