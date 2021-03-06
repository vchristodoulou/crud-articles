import axios from 'axios';
require('dotenv').config()


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';


class CategoryService {
    get() {
        return axios.get(`${API_URL}categories/`);
    }

    create(category) {
        return axios.post(`${API_URL}categories/`, category);
    }

    deleteById(id) {
        return axios.delete(`${API_URL}categories/${id}`);
    }

    deleteByName(name) {
        return axios.delete(`${API_URL}categories/name/${name}`);
    }
}

export default new CategoryService();
