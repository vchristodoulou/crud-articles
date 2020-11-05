import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


class ArticleService {
    get() {
        return axios.get(`${API_URL}articles/`);
    }

    getWithCategory(category) {
        return axios.get(`${API_URL}articles?category=${category}`);
    }

    getWithContent() {
        return axios.get(`${API_URL}articles?content=true`);
    }

    getWithContentAndCategory(category) {
        return axios.get(`${API_URL}articles?content=true&category=${category}`);
    }

    getById(id) {
        return axios.get(`${API_URL}articles/${id}`);
    }

    getByIdWithContent(id) {
        return axios.get(`${API_URL}articles/${id}?content=true`);
    }

    getByTitle(title) {
        return axios.get(`${API_URL}articles/title/${title}`);
    }

    getByTitleWithContent(title) {
        return axios.get(`${API_URL}articles/title/${title}?content=true`);
    }

    create(article) {
        return axios.post(`${API_URL}articles/`, article);
    }

    edit(title, content) {
        return axios.post(`${API_URL}articles/edit/${title}`, {content: content});
    }

    deleteById(id) {
        return axios.delete(`${API_URL}articles/${id}`);
    }

    deleteByTitle(title) {
        return axios.delete(`${API_URL}articles/title/${title}`);
    }
}

export default new ArticleService();
