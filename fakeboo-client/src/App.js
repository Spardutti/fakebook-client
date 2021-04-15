import Welcome from "./Components/Welcome/Welcome";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateAccountModal from "./Components/Modal/CreateAcc/CreateAccountModal";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [token, setToken] = useState();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getToken = () => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
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
          <Redirect to="/posts/" />
          <Navbar />
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
