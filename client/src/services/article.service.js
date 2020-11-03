import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


class ArticleService {
    get() {
        return axios.get(`${API_URL}articles/`);
    }

    getById(id) {
        return axios.get(`${API_URL}articles/${id}`);
    }

    getByIdWithContent(id) {
        return axios.get(`${API_URL}articles/${id}?content=true`);
    }

    getByTitle(title) {
        console.log(`${API_URL}articles/title/${title}`);
        return axios.get(`${API_URL}articles/title/${title}`);
    }

    getByTitleWithContent(title) {
        return axios.get(`${API_URL}articles/title/${title}?content=true`);
    }

    create(article) {
        return axios.post(`${API_URL}articles/`, article);
    }
}

export default new ArticleService();
