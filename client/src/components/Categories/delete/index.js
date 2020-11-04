import React, { Component } from "react";

import CategoryService from "../../../services/category.service";


export default class CategoryDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedCategoryName: '',
            deleteResponse: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        this.setState({
            selectedCategoryName: e.target.value
        });
    }

    componentDidMount() {
        this.getCategories();
    }

    deleteCategorySuccess() {
        return (
            response => {
                this.setState((state) => {
                    return {
                        deleteResponse: 'SUCCESS',
                        categories: state.categories.filter(category => category._id !== response.data.msg._id)
                    };
                });
                setTimeout(
                    () => this.setState({ deleteResponse: '' }),
                    3000
                );
            }
        )
    }

    deleteCategoryError() {
        return (
            error => {
                this.setState({
                    deleteResponse: 'ERROR',
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
                setTimeout(
                    () => this.setState({ deleteResponse: '' }),
                    3000
                );
            }
        )
    }

    onDeleteById() {
        if (!this.state.selectedCategoryName) {
            return
        }
        const category = this.state.categories.filter(category => category.name === this.state.selectedCategoryName);
        const category_id = category[0]._id;

        if (window.confirm("Are you sure? This will delete the category and all the data related to it!")) {
            CategoryService.deleteById(category_id)
                .then(
                    this.deleteCategorySuccess(),
                    this.deleteCategoryError()
                )
        }
    }

    onDeleteByName() {
        if (!this.state.selectedCategoryName) {
            return
        }
        if (window.confirm("Are you sure? This will delete the category and all the data related to it!")) {
            CategoryService.deleteByName(this.state.selectedCategoryName)
                .then(
                    this.deleteCategorySuccess(),
                    this.deleteCategoryError()
                )
        }
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Delete Category</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label
                                        className="col-3 col-form-label form-control-label"
                                        htmlFor="selectDeleteCategory"
                                    >Category</label>
                                    <select
                                        className="col-8 form-control" id="selectDeleteCategory"
                                        value={this.state.selectedCategoryName}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Please select</option>
                                        {Object.entries(this.state.categories).map(([key, value], i) => {
                                            return (
                                                <option key={value._id}>{value.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-primary mt-2 dropdown-toggle" type="button"
                                            id="dropdownCategoryDelete" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        Delete
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownCategoryDelete">
                                        <button className="dropdown-item" onClick={() => this.onDeleteById()}
                                        >By Id</button>
                                        <button className="dropdown-item" onClick={() => this.onDeleteByName()}
                                        >By Name</button>
                                    </div>
                                </div>
                                {this.state.deleteResponse === 'SUCCESS' &&
                                    <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                                        <p className="text-center">Deleted successfully!</p>
                                    </div>
                                }
                                {this.state.deleteResponse === 'ERROR' &&
                                    <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                        <p className="text-center">{this.state.error}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
