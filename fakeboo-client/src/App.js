import Welcome from "./Components/Welcome/Welcome";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateAccountModal from "./Components/Modal/CreateAcc/CreateAccountModal";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import jwt from "jsonwebtoken";

function App() {
  const [token, setToken] = useState();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getToken = () => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      localToken = jwt.decode(localToken);
      setToken(localToken);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <HashRouter>
      {token ? (
        <div>
          <Navbar token={token} />
          <Redirect to="/posts/" />
        </div>
      ) : (
        <div>
          <Welcome toggle={toggle} setToken={setToken} />
          <CreateAccountModal modal={modal} toggle={toggle} />
        </div>
      )}
      <Switch>
        <Route path="/posts/" component={Home} />
      </Switch>
    </HashRouter>
  );
}

export default App;
