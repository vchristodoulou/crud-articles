import React, { Component } from "react";

import qs from 'query-string';

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
            noContentOption: '',
            selectedCategoryName: '',
            error: ''
        };

        this.onDeleteArticle = this.onDeleteArticle.bind(this);
        this.onChangeContentRadio = this.onChangeContentRadio.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
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
        // console.log(this.state.noContentOption);
        if (event.target.value === 'noContent') {
            if (!this.state.noContentOption) {
                this.setState({noContentOption: true});
                this.getArticles();
            }
        } else if (event.target.value === 'withContent') {
            if (this.state.noContentOption) {
                this.setState({noContentOption: false});
                this.getArticlesWithContent();
            }
        }
    }

    onChangeCategory(e) {
        this.setState({selectedCategoryName: e.target.value});
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

    getArticlesWithCategory(category) {
        ArticleService.getWithCategory(category)
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

    getArticlesWithContentAndCategory(category) {
        ArticleService.getWithContentAndCategory(category)
            .then(
                this.getArticlesSuccess(),
                this.getArticlesError
            );
    }

    getCategories() {
        CategoryService.get()
            .then(
                response => {
                    // console.log(response.data);
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
        let queryParams = qs.parse(this.props.location.search);

        this.getCategories();

        if (queryParams.content) {
            this.setState({noContentOption: false});
            if (queryParams.category) {
                this.setState({selectedCategoryName: queryParams.category});
                this.getArticlesWithContentAndCategory(queryParams.category);
            } else {
                this.getArticlesWithContent();
            }
        } else {
            this.setState({noContentOption: true});
            if (queryParams.category) {
                this.setState({selectedCategoryName: queryParams.category});
                this.getArticlesWithCategory(queryParams.category);
            } else {
                this.getArticles();
            }
        }
    }

    render() {
        // console.log(this.props.location.pathname, this.props.location.search);
        // let searchParams = new URLSearchParams(this.props.location.search);
        // console.log(searchParams);
        // searchParams.set('content', 'TRUE');
        // console.log(searchParams.toString());
        // this.props.history.push({
        //     pathname: this.props.location.pathname,
        //     search: searchParams.toString()
        // });
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-3 text-left" onChange={this.onChangeContentRadio}>
                        <div className="col-12">
                            <input type="radio" value="noContent" name="contentRadios"
                                   checked={this.state.noContentOption} /> No Content
                        </div>
                        <div className="col-12">
                            <input type="radio" value="withContent" name="contentRadios"
                                   checked={!this.state.noContentOption} /> With Content
                        </div>
                        <div className="col-12 mt-3 form-group">
                            <label
                                htmlFor="selectFilterCategory"
                            >Category</label>
                            <select
                                className="col-12 form-control" id="selectFilterCategory"
                                value={this.state.selectedCategoryName}
                                onChange={this.onChangeCategory}
                            >
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
                                    category_name={value.category_name}
                                    selectedCategoryName={this.state.selectedCategoryName}
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
