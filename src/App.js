import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewMerch from "./pages/NewMerch";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { useAuth0 } from "./auth";
import PrivateRoute from "./components/PrivateRoute";
import "antd/dist/antd.css";

import "./App.css";

import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Dashboard from "./pages/Dashboard";
import NewImage from "./pages/NewImage";
import ImageGallery from "./pages/ImageGallery";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <p>Please Wait...</p>;
  }

  return (
    <Router>
      <Main>
        <Container>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/new" component={NewMerch} />
            <PrivateRoute exact path="/newImage" component={NewImage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/media" component={ImageGallery} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
