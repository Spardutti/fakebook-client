import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import DisplayReplies from "./DisplayReplies";
import EditCommentModal from "./EditCommentModal";
import uniqid from "uniqid";

const DisplayComments = (props) => {
  const [comment, setComment] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [commentIndex, setCommentIndex] = useState();

  //TOGGLE THE EDIT COMMENT MODAL
  const toggle = (e) => {
    setCommentIndex(e.target.id);
    setIsOpen(!isOpen);
  };

  //DELETES A COMMENT
  const deleteComment = async (index) => {
    //UPDATE REACT STATE
    const newComments = [...props.comments];
    newComments.splice(index, 1);
    props.setComments(newComments);

    await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/comment/" +
        props.post._id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentIndex: index,
        }),
      }
    );
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  //ADDS A COMMENT
  const addComment = async () => {
    let response = await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/" +
        props.post._id +
        "/comment",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
        }),
      }
    );
    let data = await response.json();
    props.setComments((old) => [...old, data]);
    props.post.comments.push(data);
    console.log(props.comments);
  };

  return (
    <div>
      <InputGroup className="mt-2">
        <Input
          name="comment"
          onChange={commentHandler}
          placeholder="Enter comment"
        />
        <InputGroupAddon addonType="append">
          <Button onClick={addComment} className="btn-light">
            <i className="far fa-paper-plane"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {props.comments.map((comment, index) => {
        return (
          <div key={uniqid()}>
            <Card className="mt-2 text-dark text-left">
              <Row
                className=" p-1 d-flex align-items-center 
                  w-100 mx-auto"
              >
                <Col md={1} sm="2" xs="1" className="pl-0">
                  <img
                    className="circle-image"
                    src={props.currentUser.profilePic}
                    alt="avatar"
                  />
                </Col>
                <Col className="col-md-9" sm="9" xs="8">
                  <h5>{comment.username} </h5>
                </Col>
                {/*IF THE CURRENT USER IS THE AUTHOR OF THE COMMENTS, DISPLAY BUTTONS
                TO EITHER DELETE OR EDIT THE COMMENT */}
                {props.currentUser._id === comment.author ? (
                  <Col
                    md={2}
                    sm={1}
                    xs={3}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <p size={"sm"} className="text-right btn  ">
                      <Trash
                        onClick={() => {
                          deleteComment(index);
                        }}
                      />
                    </p>
                    <p size={"sm"} className="text-right btn ml-1">
                      <Pencil onClick={toggle} id={index} />
                    </p>
                  </Col>
                ) : null}
              </Row>
              <CardBody className=" p-1">
                <CardText>{comment.comment}</CardText>
              </CardBody>
              <DisplayReplies
                key={comment._id}
                reply={comment.reply}
                comment={comment}
                comments={props.comments}
                token={props.token}
                index={index}
                currentUser={props.currentUser}
                post={props.post}
                setComents={props.setComents}
              />
            </Card>
          </div>
        );
      })}
      {isOpen ? (
        <EditCommentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggle={toggle}
          post={props.post}
          token={props.token}
          commentIndex={commentIndex}
          comments={props.comments}
          setComents={props.setComments}
        />
      ) : null}
    </div>
  );
};

export default DisplayComments;
