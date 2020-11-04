import React, { Component } from "react";

import CategoryService from "../../../services/category.service";


export default class CategoryCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            createResponse: '',
            error: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const newCategory = {name: this.state.name};

        CategoryService.create(newCategory).then(
            () => {
                this.setState({
                    name: '',
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

    render() {
        return (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Create Category</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label
                                            className="col-3 col-form-label form-control-label"
                                            htmlFor="create_name"
                                        >Name</label>
                                        <input
                                            className="form-control col-8" type="text" id="create_name" required
                                            value={this.state.name} onChange={this.handleChangeName} />
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
