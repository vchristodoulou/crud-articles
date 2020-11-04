import React, { Component } from "react";

import { Link } from "react-router-dom";

import ArticleService from "../../../services/article.service";


export default class Article extends Component {
    constructor(props) {
        super(props);
    }

    onDeleteById() {
        if (window.confirm("Are you sure? This will delete the article and all the data related to it!")) {
            ArticleService.deleteById(this.props.id)
                .then(
                    response => {
                        console.log(response);
                        this.props.onDeleteArticle(this.props.id);
                    },
                    error => {
                        console.log(error);
                    }

                )
        }
    }

    onDeleteByTitle() {
        if (window.confirm("Are you sure? This will delete the article and all the data related to it!")) {
            ArticleService.deleteByTitle(this.props.title)
                .then(
                    response => {
                        console.log(response);
                        this.props.onDeleteArticle(this.props.id);
                    },
                    error => {
                        console.log(error);
                    }

                )
        }
    }

    render() {
        const  { id, title, content, description } = this.props;

        return (
            <div className="col-12">
                <div className="card mb-4 box-shadow">
                    <h5 className="card-header">{title}</h5>
                    <div className="card-body">
                        <small className="card-text">{description}</small>
                        <hr/>
                        <p>{content}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <div className="dropdown">
                                    <button className="tn btn-sm btn-outline-secondary dropdown-toggle" type="button"
                                            id="dropdownView" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        View
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownView">
                                        <Link className="dropdown-item"
                                              to={`/articles/${id}`}
                                        >No content</Link>
                                        <Link className="dropdown-item"
                                              to={`/articles/${id}/?content=true`}
                                        >With content</Link>
                                    </div>
                                </div>
                                <Link className="btn btn-sm btn-outline-secondary" type="button"
                                      to={`/articles/edit/${title}`}
                                >Edit
                                </Link>

                                <div className="dropdown">
                                    <button className="tn btn-sm btn-outline-secondary dropdown-toggle" type="button"
                                            id="dropdownDelete" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        Delete
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownDelete">
                                        <button className="dropdown-item" onClick={() => this.onDeleteById()}
                                        >By Id</button>
                                        <button className="dropdown-item" onClick={() => this.onDeleteByTitle()}
                                        >By Title</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
