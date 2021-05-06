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
import EditReply from "./EditReplyModal";
import uniqid from "uniqid";

const DisplayReplies = (props) => {
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [replies, setReplies] = useState(props.comment.reply);
  const [replyIdx, setReplyIdx] = useState();

  //TOGGLE EDIT REPLY MODAL
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const getIdx = (e) => {
    setReplyIdx(e.target.id);
  };

  const replyHandler = (e) => {
    setReply(e.target.value);
  };

  //ADD A REPLY TO A COMMENT
  const addReply = async () => {
    const resposne = await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/" +
        props.post._id +
        "/reply",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: props.index,
          username: props.currentUser.username,
          reply,
        }),
      }
    );
    const data = await resposne.json();

    const arr = [...replies];
    arr.push(data);
    setReplies(arr);
    setReply("");
    props.comments[props.index].reply.push(data);
  };

  //DELETES A REPLY
  const deleteReply = async (replyIndex) => {
    const arr = [...replies];
    arr.splice(replyIndex, 1);
    setReplies(arr);
    props.post.comments[props.index].reply.splice(replyIndex, 1);

    await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/comment/" +
        props.post._id +
        "/reply",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentIndex: props.index,
          replyIndex: replyIndex,
        }),
      }
    );
  };
  return (
    <div>
      <InputGroup className="mt-2">
        <Input
          name="reply"
          onChange={replyHandler}
          placeholder="Reply comment"
          className=""
          value={reply}
        />
        <InputGroupAddon addonType="append" className="">
          <Button onClick={addReply} className="btn-light">
            <i className="far fa-paper-plane"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {replies
        ? replies.map((reply, replyIndex) => {
            return (
              <div key={uniqid()}>
                <Card className="reply-container mt-2 mb-2 text-dark pl-1 text-left">
                  <Row
                    className=" p-1 d-flex align-items-center 
                  w-100 "
                  >
                    <Col className="col-md-9 " sm="9" xs="8">
                      <h5>{reply.username}</h5>
                    </Col>
                    {/* IF THE CURRENT USER IS THE AUTHOR OF THE REPLY, DISPLAY BUTTONS TO
                EDIT OR DELETE THE REPLY */}
                    {props.currentUser._id === reply.author ? (
                      <Col
                        md={2}
                        sm={1}
                        xs={3}
                        className="d-flex justify-content-start align-items-center"
                      >
                        <p size={"sm"} className="text-right btn mr-1">
                          <Trash
                            onClick={() => {
                              deleteReply(replyIndex);
                            }}
                          />
                        </p>
                        <p size={"sm"} className="text-right btn mr-1">
                          <Pencil
                            onClick={(e) => {
                              toggle();
                              getIdx(e);
                            }}
                            id={replyIndex}
                          />
                        </p>
                      </Col>
                    ) : null}
                  </Row>
                  <CardBody className=" p-1">
                    <CardText>{reply.reply}</CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })
        : null}
      {isOpen ? (
        <EditReply
          toggle={toggle}
          isOpen={isOpen}
          token={props.token}
          commentIndex={props.index}
          replyIndex={replyIdx}
          reply={reply.reply}
          post={props.post}
          replies={replies}
        />
      ) : null}
    </div>
  );
};

export default DisplayReplies;
