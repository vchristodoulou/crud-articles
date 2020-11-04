import React, { Component } from "react";

import Article from "./Article";
import ArticleService from "../../services/article.service";
import "./style.css";


export default class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            error: ''
        };

        this.onChangeContentRadio = this.onChangeContentRadio.bind(this);
    }

    onChangeContentRadio(event) {
        console.log(event.target.value);
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
        ArticleService.getWithContent().then(
            response => {
                this.setState({
                    articles: response.data
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
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row mb-3" onChange={this.onChangeContentRadio}>
                    <input className="mr-1" type="radio" value="noContent" name="contentRadios" /> No Content
                    <input className="ml-3 mr-1" type="radio" value="withContent" name="contentRadios" /> With Content
                </div>
                <div className="row">
                    {Object.entries(this.state.articles).map(([key, value], i) => {
                        return (
                            <Article key={value._id}
                                     id={value._id}
                                     title={value.title}
                                     content={value.content}
                                     description={value.description}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
