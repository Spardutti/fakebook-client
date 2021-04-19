import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./styles.css";
import { useState, useEffect } from "react";

const Home = (props) => {
  const [posts, setPosts] = useState();
  const [nonFriends, setNonFriends] = useState();
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();

  //GET NON FRIEND USERS
  const getNonFriends = async () => {
    if (userData) {
      const response = await fetch("/users/" + userData._id + "/all", {
        method: "GET",
      });
      const data = await response.json();
      setNonFriends(data);
    }
  };

  //SEND FRIEND REQUEST
  const friendRequest = async (id) => {
    const response = await fetch("/users/" + id + "/request", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData) {
      userData = JSON.parse(userData);
      setUserData(userData);
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getNonFriends();
  }, [userData]);

  return (
    <div className="home-container">
      <Container className="h-100 w-100" fluid>
        <Row className="h-100">
          <Col className=" col-md-3 bg-light">1</Col>
          <Col className=" col-md-6 ">
            {nonFriends ? (
              <Row className="">
                {nonFriends.map((user) => {
                  return (
                    <Col md="3" className="pt-1 mx-auto" key={user._id}>
                      <Card className="rounded-5">
                        <CardImg className="bg-dark" src={user.profilePic} />
                        <CardTitle
                          tag="p"
                          className="text-center font-italic mb-1"
                        >
                          {user.username}
                        </CardTitle>
                        {user.request.map((e) => e.user).indexOf(userData._id) >
                        -1 ? (
                          <Button disabled className="btn-sm p-0 btn-success">
                            Request sent
                          </Button>
                        ) : (
                          <Button
                            onClick={() => friendRequest(user._id)}
                            className="btn-sm p-0 mb-0 btn btn-info"
                          >
                            Add Friend
                          </Button>
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : null}
            <Button className="btn-block rounded-5 mt-2 bg-primary">
              Create Something
            </Button>
            {posts ? (
              <p>posts</p>
            ) : (
              <div className="text-center pt-1">
                <p>Here you will see your fake friends activity... </p>
                <p>if you had any!</p>
              </div>
            )}
          </Col>
          <Col className="col-md-3 bg-light">3 </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
