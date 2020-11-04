import React, { Component } from "react";

import queryString from 'query-string';

import ArticleService from "../../../services/article.service";


export default class ArticleView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
            description: '',
            error: ''
        };
    }

    getArticleSuccess() {
        return (
            response => {
                this.setState({
                    id: response.data._id,
                    title: response.data.title,
                    content: response.data.content,
                    description: response.data.description
                });
            }
        )
    }

    getArticleError() {
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

    componentDidMount() {
        const { articleId } = this.props.match.params;
        let queryParams = queryString.parse(this.props.location.search)

        if (queryParams.content) {
            ArticleService.getByIdWithContent(articleId)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        } else {
            ArticleService.getById(articleId)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <small>{this.state.description}</small>
                <hr/>
                <p>{this.state.content}</p>
            </div>
        );
    }
}
