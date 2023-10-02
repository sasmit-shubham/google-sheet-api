import axios from 'axios'
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        Accept: 'application/json'
    },
});

export const getsheets = () => api.get('/api/sheets')
export const addRow = (data) =>api.post('/api/add',data)