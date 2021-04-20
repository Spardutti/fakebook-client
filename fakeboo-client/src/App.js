import Welcome from "./Components/Welcome";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import jwt from "jsonwebtoken";

function App() {
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();

  const getToken = async () => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const decodedToken = jwt.decode(localToken);
      const expiresAt = new Date(decodedToken.exp * 1000);
      if (expiresAt < new Date(Date.now())) {
        localStorage.clear();
      } else {
        const response = await fetch("/users/" + decodedToken._id + "/current");
        const data = await response.json();
        setCurrentUser(data);
        setToken(localToken);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <HashRouter>
      {!token ? (
        <div>
          <Redirect to="/welcome" />
          <Welcome setToken={setToken} />
        </div>
      ) : (
        <div>
          <Redirect to="/home" />{" "}
        </div>
      )}
      <Switch>
        <Route path="/welcome">
          <Welcome setToken={setToken} />
        </Route>
        <Route path="/home">
          <Navbar setToken={setToken} currentUser={currentUser} />
          <Home currentUser={currentUser} token={token} />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
