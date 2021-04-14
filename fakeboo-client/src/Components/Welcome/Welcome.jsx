import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./welcome.css";

const Welcome = (props) => {
  return (
    <Container className="welcome-container" fluid>
      <Row className="row">
        <Col className="col1" sm="6">
          <h1>fakebook</h1>
          <p>Connect with your fake friends</p>
        </Col>
        <Col className="col2" sm={{ sise: "auto" }}>
          <Form className="form">
            <FormGroup>
              <Input
                placeholder="Email or Username"
                type="text"
                name="username"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Input placeholder="password" name="password" type="passowrd" />
            </FormGroup>
            <FormGroup>
              <Button className="login" color="primary">
                Log In
              </Button>
            </FormGroup>
            <hr />
            <div className="create">
              <Button color="success">Create A New Account</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
