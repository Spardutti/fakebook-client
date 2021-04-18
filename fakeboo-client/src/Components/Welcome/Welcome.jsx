import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useState } from "react";
import "./welcome.css";
import CreateAccountModal from "../Modal/CreateAcc/CreateAccountModal";

const Welcome = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginErrors, setLoginErros] = useState();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //INPUTS
  const usernameValue = (e) => {
    setUsername(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  //CHECK CREDENTIALS AND LOG IN OR DISPLAY ERROR
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.status === 401) {
      setLoginErros(data);
    } else {
      setLoginErros();
      localStorage.setItem("token", data.token);
      props.setToken(data.token);
    }
  };

  return (
    <div className="welcome-container">
      <Container className="align-items-center h-75">
        <Row className="align-items-center h-75">
          <Col sm="12" md="6">
            <h1 className="title  text-primary font-weight-bold">fakebook</h1>
            <p>Connect with your fake friends</p>
          </Col>
          <Col sm="12" md="6">
            <Form className="bg-light p-3 rounded-lg">
              <FormGroup>
                <Input
                  onChange={usernameValue}
                  className="form-control-lg"
                  placeholder="Username"
                  type="text"
                  name="username"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Input
                  onChange={passwordValue}
                  className="form-control-lg"
                  placeholder="password"
                  name="password"
                  type="password"
                />
              </FormGroup>
              {loginErrors ? (
                <FormGroup>
                  <p>{loginErrors}</p>
                </FormGroup>
              ) : null}
              <FormGroup>
                <Button
                  onClick={loginUser}
                  size="lg"
                  className="login"
                  color="primary"
                >
                  Log In
                </Button>
              </FormGroup>
              <hr />
              <div className="create">
                <Button
                  size="lg"
                  color="success"
                  onClick={() => {
                    toggle();
                    setLoginErros();
                  }}
                >
                  Create A New Account
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        {modal ? <CreateAccountModal modal={modal} toggle={toggle} /> : null}
      </Container>
    </div>
  );
};

export default Welcome;
