import React, { Component } from "react";

import qs from 'query-string';

import ArticleService from "../../../services/article.service";


export class ArticleView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
            description: '',
            category_name: '',
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
                    description: response.data.description,
                    category_name: response.data.category_name
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
        const { id } = this.props.match.params;
        let queryParams = qs.parse(this.props.location.search);

        if (queryParams.content) {
            ArticleService.getByIdWithContent(id)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        } else {
            ArticleService.getById(id)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{this.state.title}</h1>
                    </div>
                    <div className="col-12">
                        <p className="text-right">{this.state.category_name}</p>
                    </div>
                    <div className="col-12">
                        <small>{this.state.description}</small>
                    </div>
                    {(this.state.content) &&
                    <div className="col-12">
                        <hr/>
                    </div>
                    }
                    {(this.state.content) &&
                    <div className="col-12">
                        <p style={{'word-wrap': 'break-word'}}>{this.state.content}</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}


export class ArticleViewByTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
            description: '',
            category_name: '',
            error: ''
        };
    }

    getArticleSuccess() {
        return (
            response => {
                this.setState({
                    id: response.data[0]._id,
                    title: response.data[0].title,
                    content: response.data[0].content,
                    description: response.data[0].description,
                    category_name: response.data[0].category_name
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
        const { title } = this.props.match.params;
        let queryParams = qs.parse(this.props.location.search);

        if (queryParams.content) {
            ArticleService.getByTitleWithContent(title)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        } else {
            ArticleService.getByTitle(title)
                .then(
                    this.getArticleSuccess(),
                    this.getArticleError()
                );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{this.state.title}</h1>
                    </div>
                    <div className="col-12">
                        <p className="text-right">{this.state.category_name}</p>
                    </div>
                    <div className="col-12">
                        <small>{this.state.description}</small>
                    </div>
                    {(this.state.content) &&
                    <div className="col-12">
                        <hr/>
                    </div>
                    }
                    {(this.state.content) &&
                    <div className="col-12">
                        <p style={{'word-wrap': 'break-word'}}>{this.state.content}</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}
