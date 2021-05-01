import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardImg,
  CardTitle,
} from "reactstrap";
import { useState, useEffect } from "react";
import FriendRequestButton from "./FriendRequestButton";
import CreatePostModal from "./CreatePost";
import FriendPosts from "./FriendPosts";

const Home = (props) => {
  const [posts, setPosts] = useState();
  const [nonFriends, setNonFriends] = useState();
  const [postModal, setPostModal] = useState(false);

  //TOGGLES CREATE POST MODAL
  const toggle = () => setPostModal(!postModal);

  //GET NON FRIEND USERS
  const getNonFriends = async () => {
    if (props.currentUser) {
      const response = await fetch("/users/" + props.currentUser._id + "/all", {
        method: "GET",
      });
      const data = await response.json();
      setNonFriends(data);
    }
  };

  //GET CURRENT USER & FRIENDS POST
  //TODO FIX THIS
  const getFriendPosts = async () => {
    if (props.currentUser) {
      const response = await fetch("/posts/" + props.currentUser._id + "/home");
      const data = await response.json();
      setPosts(data);
    }
  };

  useEffect(() => {
    getNonFriends();
    getFriendPosts();
  }, []);

  return (
    <div className="home-container">
      <Container className="h-100 w-100" fluid>
        <Row className="h-100">
          <Col className=" col-md-1 bg-light  d-none d-md-block" lg="3">
            1
          </Col>
          <Col className=" col-md-10" lg="6" sm="12">
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
                        className="mx-auto p-1"
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
                            .indexOf(props.currentUser._id) > -1 ? (
                            <FriendRequestButton
                              token={props.token}
                              friendRequestSent={true}
                              id={user._id}
                            />
                          ) : (
                            <FriendRequestButton
                              token={props.token}
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
            <Button
              className="btn-block rounded-5 mt-2 bg-primary x"
              onClick={() => {
                toggle();
              }}
            >
              Create Something
            </Button>
            {posts ? (
              posts.map((postByUser, index) => {
                return postByUser.map((post, postIndex) => {
                  return post.votes.indexOf(props.currentUser._id) === -1 ? (
                    <FriendPosts
                      currentUser={props.currentUser}
                      key={post._id}
                      post={post}
                      token={props.token}
                      liked={false}
                    />
                  ) : (
                    <FriendPosts
                      currentUser={props.currentUser}
                      key={post._id}
                      post={post}
                      token={props.token}
                      liked={true}
                    />
                  );
                });
              })
            ) : (
              <div className="text-center pt-1">
                <p>Here you will see your fake friends activity... </p>
                <p>if you had any!</p>
              </div>
            )}
          </Col>
          <Col className="col-md-1 bg-light d-none d-md-block" lg="3">
            3{" "}
          </Col>
        </Row>
      </Container>
      {postModal ? (
        <CreatePostModal
          postModal={postModal}
          token={props.token}
          toggle={toggle}
        />
      ) : null}
    </div>
  );
};

export default Home;
