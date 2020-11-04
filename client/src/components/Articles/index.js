import React, { Component } from "react";

import Article from "./Article";
import ArticleService from "../../services/article.service";
import CategoryService from "../../services/category.service"
import "./style.css";


export default class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            categories: [],
            error: ''
        };

        this.onDeleteArticle = this.onDeleteArticle.bind(this);
        this.onChangeContentRadio = this.onChangeContentRadio.bind(this);
    }

    onDeleteArticle(id) {
        this.setState((state) => {
            return {
                articles: state.articles.filter(article => article._id !== id)
            };
        });
    }

    onChangeContentRadio(event) {
        // console.log(event.target.value);
        if (event.target.value === 'noContent') {
            this.getArticles();
        } else if (event.target.value === 'withContent') {
            this.getArticlesWithContent();
        }
    }

    getArticlesSuccess() {
        return (
            response => {
                this.setState({
                    articles: response.data
                });
            }
        )
    }

    getArticlesError() {
        return (
            error => {
                this.setState({
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        )
    }

    getArticles() {
        ArticleService.get()
            .then(
                this.getArticlesSuccess(),
                this.getArticlesError
            );
    }

    getArticlesWithContent() {
        ArticleService.getWithContent()
            .then(
                this.getArticlesSuccess(),
                this.getArticlesError
            );
    }

    getCategories() {
        CategoryService.get()
            .then(
                response => {
                    console.log(response.data);
                    this.setState({
                        categories: response.data
                    });
                },
                error => {
                    this.setState({
                        error:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
    }

    componentDidMount() {
        this.getArticles();
        this.getCategories();
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-3 text-left" onChange={this.onChangeContentRadio}>
                        <div className="col-12">
                            <input type="radio" value="noContent" name="contentRadios" /> No Content
                        </div>
                        <div className="col-12">
                            <input type="radio" value="withContent" name="contentRadios" /> With Content
                        </div>
                        <div className="col-12 mt-3 form-group">
                            <label
                                htmlFor="selectCategory"
                            >Category</label>
                            <select className="form-control" id="selectCategory">
                                <option value="">Please select</option>
                                {Object.entries(this.state.categories).map(([key, value], i) => {
                                    return (
                                        <option key={value._id}>{value.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-9">
                        {Object.entries(this.state.articles).map(([key, value], i) => {
                            return (
                                <Article
                                    key={value._id}
                                    id={value._id}
                                    title={value.title}
                                    content={value.content}
                                    description={value.description}
                                    onDeleteArticle={this.onDeleteArticle}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
