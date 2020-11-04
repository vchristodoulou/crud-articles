import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Articles from "./components/Articles"
import ArticleCreate from "./components/Articles/create";
import ArticleView from "./components/Articles/view";
import ArticleEdit from "./components/Articles/edit";
import CategoryCreate from "./components/Categories/create";
import CategoryDelete from "./components/Categories/delete";
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
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >Admin actions</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to={"/admin/create_article"} className="dropdown-item"
                  >Create Article</Link>
                  <Link to={"/admin/create_category"} className="dropdown-item"
                  >Create Category</Link>
                  <Link to={"/admin/delete_category"} className="dropdown-item"
                  >Delete Category</Link>
                </div>
              </div>
            </nav>

            <Route exact path={["/", "/articles"]} component={Articles}/>
            <Route exact path={["/articles/:articleId"]} component={ArticleView}/>
            <Route exact path={["/articles/edit/:title"]} component={ArticleEdit}/>
            <Route exact path={["/admin/create_article"]} component={ArticleCreate}/>
            <Route exact path={["/admin/create_category"]} component={CategoryCreate}/>
            <Route exact path={["/admin/delete_category"]} component={CategoryDelete}/>

          </div>
        </Router>
    );
  }
}

export default App;
