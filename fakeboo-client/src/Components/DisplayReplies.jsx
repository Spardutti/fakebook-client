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

const DisplayReplies = (props) => {
  const [reply, setReply] = useState();
  const [isOpen, setIsOpen] = useState(false);

  //TOGGLE EDIT REPLY MODAL
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const replyHandler = (e) => {
    setReply(e.target.value);
  };

  //ADD A REPLY TO A COMMENT
  const addReply = async () => {
    await fetch("/posts/" + props.post._id + "/reply", {
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
    });
  };

  //DELETES A REPLY
  const deleteReply = async (replyIndex) => {
    const response = await fetch(
      "/posts/comment/" + props.post._id + "/reply",
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
    const data = await response.json();
  };
  return (
    <div>
      <InputGroup className="mt-2">
        <Input
          name="reply"
          onChange={replyHandler}
          placeholder="Reply comment"
          className=""
        />
        <InputGroupAddon addonType="append" className="">
          <Button onClick={addReply} className="btn-light">
            <i className="far fa-paper-plane"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {props.reply.map((reply, replyIndex) => {
        return (
          <div key={reply._id}>
            <Card className="mt-2 mb-1 text-dark text-left">
              <Row
                className=" p-1 d-flex align-items-center 
                  w-100 mx-auto"
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
                      <Pencil onClick={toggle} />
                    </p>
                  </Col>
                ) : null}
              </Row>
              <CardBody className=" p-1">
                <CardText>{reply.reply}</CardText>
              </CardBody>
            </Card>
            {isOpen ? (
              <EditReply
                toggle={toggle}
                isOpen={isOpen}
                token={props.token}
                commentIndex={props.index}
                replyIndex={replyIndex}
                reply={reply.reply}
                post={props.post}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayReplies;
