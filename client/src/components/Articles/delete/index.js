import React, { Component } from "react";

import ArticleService from "../../../services/article.service";


export default class ArticleDelete extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    handleDeleteSubmit(event) {
        event.preventDefault();

        ArticleService.deleteById(this.props.id)
            .then(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                }

            )

        // ArticleService.deleteByTitle(this.props.title)
        //     .then(
        //         response => {
        //             console.log(response);
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //
        //     )
    }

    render() {
        return (
            <div className="modal fade" id={`deleteArticleModal${this.props.id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Are you sure you want to delete <strong><em>{this.props.title}?</em></strong>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>This item will be deleted immediately. You can't undo this action.</p>
                        </div>

                        <form onSubmit={this.handleDeleteSubmit}>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal"
                                >Close</button>
                                <button className="btn btn-primary" type="submit"
                                >Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
