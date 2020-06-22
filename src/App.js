import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Nav from "./components/NavBar";
import { useAuth0 } from "./auth";
import PrivateRoute from "./components/PrivateRoute";
import "antd/dist/antd.css";

import "./App.css";

import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <p>Please Wait...</p>;
  }

  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/new" component={Upload} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
