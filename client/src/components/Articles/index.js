import React, { Component } from "react";

import Article from "./Article";
import ArticleService from "../../services/article.service";
import "./style.css";


export default class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            error: ""
        };
    }

    componentDidMount() {
        ArticleService.get().then(
            response => {
                this.setState({
                    articles: response.data
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
                <div className="row">
                    {Object.entries(this.state.articles).map(([key, value], i) => {
                        return (
                            <Article key={value._id}
                                     id={value._id}
                                     title={value.title}
                                     content={value.content}
                                     description={value.description}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
