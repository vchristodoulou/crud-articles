import React, { Component } from "react";

import ArticleService from "../../../services/article.service";


export default class ArticleEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
            description: '',
            category_name: '',
            editResponse: '',
            error: ''
        };

        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleEditSubmit(event) {
        const { title } = this.props.match.params;
        event.preventDefault();

        ArticleService.edit(title, this.state.content)
            .then(
                response => {
                    this.setState({
                        id: response.data._id,
                        title: response.data.title,
                        content: response.data.content,
                        description: response.data.description,
                        category_name: response.data.category_name,
                        editResponse: 'SUCCESS'
                    });
                    setTimeout(
                        () => this.setState({ editResponse: '' }),
                        3000
                    );
                },
                error => {
                    this.setState({
                        editResponse: 'ERROR',
                        error:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                    setTimeout(
                        () => this.setState({ editResponse: '' }),
                        3000
                    );
                }

            )
    }

    componentDidMount() {
        const { title } = this.props.match.params;

        ArticleService.getByTitleWithContent(title)
            .then(
                this.getArticleSuccess(),
                this.getArticleError()
            )
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
                    <div className="col-12">
                        <hr/>
                    </div>
                    <form className="col-12" onSubmit={this.handleEditSubmit}>
                        <div className="form-group">
                            <textarea className="form-control" rows="10"
                                      value={this.state.content} onChange={this.handleChangeContent} />
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                        {this.state.editResponse === 'SUCCESS' &&
                            <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                                <p className="text-center">Saved successfully!</p>
                            </div>
                        }
                        {this.state.editResponse === 'ERROR' &&
                            <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                <p className="text-center">{this.state.error}</p>
                            </div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}
