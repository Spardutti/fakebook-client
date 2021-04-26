import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Collapse,
} from "reactstrap";
import { Chat } from "react-bootstrap-icons";
import { HandThumbsUp } from "react-bootstrap-icons";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import { useState } from "react";
import EditPostModal from "./EditPostModal";
import DisplayComments from "./DisplayComments";

const FriendPosts = (props) => {
  const [like, setLike] = useState(props.liked);
  const [votes, setVotes] = useState(props.post.votes.length);
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => setEditModal(!editModal);

  const toggleLike = () => setLike(!like);

  const openCollapse = () => setIsOpen(!isOpen);

  const likePost = async () => {
    const response = await fetch("/posts/" + props.post._id + "/like", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
    if (response.status === 200) {
      setVotes(votes + 1);
    }
  };

  const unlikePost = async () => {
    const response = await fetch("/posts/" + props.post._id + "/unlike", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
    if (response.status === 200) {
      setVotes(votes - 1);
    }
  };

  const deletePost = async (index) => {
    const response = await fetch("/posts/" + props.post._id + "/delete", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <Row className="mb-2 mt-2">
      <Col className="text-center">
        <Card body className="bg-dark text-light">
          <CardTitle tag="h2" className="font-weigth-bold">
            {props.post.title}
          </CardTitle>
          {props.post.body ? <CardText>{props.post.body}</CardText> : null}
          {props.post.image ? (
            <img className="mb-2" src={props.post.image} alt="Post" />
          ) : null}
          <div className=" d-flex flex-row mb-2  bg- justify-content-around">
            <div className="d-flex align-content-center">
              {like ? (
                <HandThumbsUpFill
                  onClick={() => {
                    toggleLike();
                    unlikePost();
                  }}
                  style={{ cursor: "pointer" }}
                  size={25}
                />
              ) : (
                <HandThumbsUp
                  onClick={() => {
                    toggleLike();
                    likePost();
                  }}
                  style={{ cursor: "pointer" }}
                  size={25}
                />
              )}
              <p className="pl-1 pt-1">{votes}</p>
            </div>
            <div className="d-flex align-cotent-center">
              <Chat size={25} />
              <p className="pl-1 pt1-">{props.post.comments.length}</p>
            </div>
          </div>
          <Button color="success" onClick={openCollapse}>
            Show Comments
          </Button>
          <Collapse isOpen={isOpen}>
            <DisplayComments
              key={props.post._id}
              post={props.post}
              token={props.token}
              currentUser={props.currentUser}
            />
          </Collapse>
          {props.currentUser._id === props.post.author ? (
            <div className=" d-flex justify-content-around">
              <Button onClick={toggleEdit} className="mt-2 btn-info">
                Edit Post
              </Button>
              <Button onClick={deletePost} className="mt-2 btn-danger">
                Delete Post
              </Button>
            </div>
          ) : null}
        </Card>
      </Col>
      {editModal ? (
        <EditPostModal
          toggleEdit={toggleEdit}
          editModal={editModal}
          post={props.post}
          token={props.token}
        />
      ) : null}
    </Row>
  );
};

export default FriendPosts;
