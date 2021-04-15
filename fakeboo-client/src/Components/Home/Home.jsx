import {
  Container,
  Col,
  Row,
  FormGroup,
  Button,
  Form,
  Input,
} from "reactstrap";
import "./home.css";
import { useState, useEffect } from "react";

const Home = (props) => {
  const [posts, setPosts] = useState();
  return (
    <div className="home-container">
      <Container className="h-100 w-100" fluid>
        <Row className="h-100">
          <Col className=" col-md-3 bg-light">1</Col>
          <Col className=" col-md-6 ">
            <Button className="btn-block rounded-5">Create Something</Button>
            {posts ? (
              <p>posts</p>
            ) : (
              <div className="text-center pt-1">
                <p>Here you will see your fake friends activity... </p>
                <p>if you had any!</p>
              </div>
            )}
          </Col>
          <Col className="col-md-3 bg-light">3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
