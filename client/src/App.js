import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Articles from "./components/Articles"
import ArticleCreate from "./components/Articles/create";
import ArticleView from "./components/Articles/view";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                Blog
              </Link>
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/articles"} className="nav-link">
                    Articles
                  </Link>
                </li>
              </div>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin Articles
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to={"/create_article"} className="dropdown-item">
                    Create
                  </Link>
                </div>
              </div>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </li>
              </div>
            </nav>

            <Route exact path={["/", "/articles"]} component={Articles}/>
            <Route exact path={["/articles/:articleId"]} component={ArticleView}/>
            <Route exact path={["/create_article"]} component={ArticleCreate}/>

          </div>
        </Router>
    );
  }
}

export default App;
