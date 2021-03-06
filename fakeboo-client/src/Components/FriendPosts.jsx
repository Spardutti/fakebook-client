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
import uniqid from "uniqid";

const FriendPosts = (props) => {
  const [like, setLike] = useState(props.liked);
  const [votes, setVotes] = useState(props.post.votes.length);
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [comments, setComments] = useState(props.post.comments);

  //TOGGLES EDIT POST MODAL
  const toggleEdit = () => setEditModal(!editModal);

  //TOGGLES THE LIKE ICON
  const toggleLike = () => setLike(!like);

  //COLLAPSE THE COMMENTS
  const openCollapse = () => setIsOpen(!isOpen);

  //LIKE A POST
  const likePost = async () => {
    const response = await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/" +
        props.post._id +
        "/like",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      }
    );
    if (response.status === 200) {
      setVotes(votes + 1);
    }
  };

  //UNLIKE A POST
  const unlikePost = async () => {
    const response = await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/" +
        props.post._id +
        "/unlike",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      }
    );
    if (response.status === 200) {
      setVotes(votes - 1);
    }
  };

  //DELETE A POST
  const deletePost = async () => {
    const response = await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/" +
        props.post._id +
        "/delete",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <Row className="mb-2 mt-2" id={props.post._id}>
      <Col className="text-center">
        <Card body className="bg-dark text-light">
          <CardTitle tag="h2" className="font-weigth-bold">
            {props.post.title}
          </CardTitle>
          <p className="text-muted">Posted by {props.post.username}</p>

          {/* CHECK IF THE POST CONTAINS AN IMAGE OR TEXT ONLY*/}
          {props.post.body ? <CardText>{props.post.body}</CardText> : null}
          {props.post.image ? (
            <img
              className="mb-2 post-image"
              src={props.post.image}
              alt="Post"
            />
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
              key={uniqid()}
              post={props.post}
              token={props.token}
              currentUser={props.currentUser}
              comments={comments}
              setComments={setComments}
            />
          </Collapse>
          {/*CHECK IF THE CURRENT USER IS THE AUTHOR OF THE POST, IF SO SHOW
          DELETE AND EDIT BUTTONS  */}
          {props.currentUser._id === props.post.author ? (
            <div className=" d-flex justify-content-around">
              <Button onClick={toggleEdit} className="mt-2 btn-info">
                <i className="fas fa-pen"></i>
              </Button>
              <Button onClick={deletePost} className="mt-2 btn-danger">
                <i className="fas fa-trash-alt"></i>
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
