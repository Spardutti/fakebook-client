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
import FriendRequestButton from "./FriendRequestButton";

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
          <Col className=" col-md-3 bg-light  d-none d-md-block">1</Col>
          <Col className=" col-md-6" sm="12">
            {nonFriends ? (
              <div>
                <p className="text-monospace text-center pt-2 text-dark">
                  <u>Users you might be interested in:</u>
                </p>

                <Row className="">
                  {nonFriends.map((user) => {
                    return (
                      <Col
                        md="3"
                        sm="6"
                        xs="6"
                        className="pt-1 p-1"
                        key={user._id}
                      >
                        <Card className="rounded-5">
                          <CardImg
                            className="bg-dark nonFriend-pics"
                            src={user.profilePic}
                          />
                          <CardTitle
                            tag="p"
                            className="text-center font-italic mb-1"
                          >
                            {user.username}
                          </CardTitle>
                          {user.request
                            .map((e) => e.user)
                            .indexOf(userData._id) > -1 ? (
                            <FriendRequestButton
                              token={token}
                              friendRequestSent={true}
                              id={user._id}
                            />
                          ) : (
                            <FriendRequestButton
                              token={token}
                              friendRequestSent={false}
                              id={user._id}
                            />
                          )}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
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
          <Col className="col-md-3 bg-light d-none d-md-block">3 </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
