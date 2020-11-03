import React, { Component } from "react";

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

    componentDidMount() {
        const { articleId } = this.props.match.params;

        ArticleService.getById(articleId).then(
            response => {
                this.setState({
                    id: response.data._id,
                    title: response.data.title,
                    content: response.data.content,
                    description: response.data.description
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
