import React, { Component } from "react";

import ArticleService from "../../../services/article.service";


export default class ArticleCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            description: '',
            error: ''
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleSubmit(event) {
        console.log(event);
        let newArticle;
        if (this.state.description) {
            newArticle = {title: this.state.title, content: this.state.content, description: this.state.description};
        } else {
            newArticle = {title: this.state.title, content: this.state.content};
        }
        console.log(newArticle);
        event.preventDefault();

        ArticleService.create(newArticle).then(
            () => {
                this.setState({
                    title: '',
                    content: '',
                    description: ''
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
            <div className="container mt-3">
                <div className="row justify-content-center">
                <div className="col-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="create_title">Title</label>
                            <input className="form-control" type="text" id="create_title" required
                                   value={this.state.title} onChange={this.handleChangeTitle} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="create_content">Content</label>
                            <textarea className="form-control" id="create_content" rows="3" required
                                      value={this.state.content} onChange={this.handleChangeContent} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="create_description">Description</label>
                            <textarea className="form-control" id="create_description" rows="3"
                                      value={this.state.description} onChange={this.handleChangeDescription} />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}
