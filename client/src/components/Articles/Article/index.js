import React, { Component } from "react";

import { Link } from "react-router-dom";

import ArticleDelete from "../delete";


export default class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const  { id, title, content, description } = this.props;

        return (
            <div className="col-md-4">
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

                                <button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal"
                                        data-target={`#deleteArticleModal${id}`}>
                                    Delete
                                </button>
                                <ArticleDelete id={id} title={title} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
