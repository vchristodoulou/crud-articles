import React, { Component } from "react";

import ArticleService from "../../../services/article.service";
import CategoryService from "../../../services/category.service";


export default class ArticleCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            description: '',
            category_name: '',
            categories: [],
            createResponse: '',
            error: ''
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
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

    handleChangeCategory(event) {
        this.setState({category_name: event.target.value});
    }

    handleSubmit(event) {
        let newArticle;

        if (this.state.description) {
            newArticle = {title: this.state.title, content: this.state.content,
                description: this.state.description, category_name: this.state.category_name};
        } else {
            newArticle = {title: this.state.title, content: this.state.content,
                category_name: this.state.category_name};
        }
        event.preventDefault();

        ArticleService.create(newArticle).then(
            () => {
                this.setState({
                    title: '',
                    content: '',
                    description: '',
                    category_name: '',
                    createResponse: 'SUCCESS'
                });
                setTimeout(
                    () => this.setState({ createResponse: '' }),
                    3000
                );
            },
            error => {
                this.setState({
                    createResponse: 'ERROR',
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
                setTimeout(
                    () => this.setState({ createResponse: '' }),
                    3000
                );
            }
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
        this.getCategories();
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Create Article</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label
                                            className="col-3 col-form-label form-control-label"
                                            htmlFor="create_title"
                                        >Title</label>
                                        <input
                                            className="form-control col-8" type="text" id="create_title" required
                                            value={this.state.title} onChange={this.handleChangeTitle} />
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            className="col-3 col-form-label form-control-label mt-4"
                                            htmlFor="create_content"
                                        >Content</label>
                                        <textarea
                                            className="form-control col-8" id="create_content" rows="3" required
                                            value={this.state.content} onChange={this.handleChangeContent} />
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            className="col-3 col-form-label form-control-label mt-4"
                                            htmlFor="create_description"
                                        >Description</label>
                                        <textarea
                                            className="form-control col-8" id="create_description" rows="3"
                                            value={this.state.description} onChange={this.handleChangeDescription} />
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            className="col-3 col-form-label form-control-label"
                                            htmlFor="selectCategoryCreateArticle"
                                        >Category</label>
                                        <select
                                            className="form-control col-8" id="selectCategoryCreateArticle"
                                            value={this.state.category_name}
                                            onChange={this.handleChangeCategory}
                                        >
                                            <option value="">Please select</option>
                                            {Object.entries(this.state.categories).map(([key, value], i) => {
                                                return (
                                                    <option key={value._id}>{value.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <button className="btn btn-primary mt-2" type="submit">Submit</button>
                                    {this.state.createResponse === 'SUCCESS' &&
                                        <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                                            <p className="text-center">Created successfully!</p>
                                        </div>
                                    }
                                    {this.state.createResponse === 'ERROR' &&
                                        <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                            <p className="text-center">{this.state.error}</p>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
