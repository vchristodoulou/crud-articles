import React, { Component } from "react";

import { Link } from "react-router-dom";


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
                        <p className="card-text">{description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <Link
                                    to={`/articles/${id}`}
                                    className="btn btn-sm btn-outline-secondary"
                                >View
                                </Link>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
