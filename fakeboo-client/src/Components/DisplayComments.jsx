import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardHeader,
  Row,
  Col,
  Collapse,
} from "reactstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import DisplayReplies from "./DisplayReplies";

const DisplayComments = (props) => {
  const [comment, setComment] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    const response = await fetch("/posts/" + props.post._id + "/comment", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <InputGroup className="mt-2">
        <Input name="comment" onChange={commentHandler} />
        <InputGroupAddon addonType="append">
          <Button onClick={addComment}>add</Button>
        </InputGroupAddon>
      </InputGroup>
      {props.post.comments.map((comment, index) => {
        return (
          <div key={comment._id} id={index}>
            <Card className="mt-2 text-dark text-left">
              <Row
                className=" p-1 d-flex align-items-center 
                  w-100 mx-auto"
              >
                <Col md={1} sm="2" xs="1" className="pl-0">
                  <img
                    className="circle-image"
                    src={comment.profilePic}
                    alt="avatar"
                  />
                </Col>
                <Col className="col-md-9 " sm="9" xs="8">
                  <h5>{comment.username} @2h</h5>
                </Col>
                {props.currentUser._id === comment.author ? (
                  <Col
                    md={2}
                    sm={1}
                    xs={3}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <p size={"sm"} className="text-right  ">
                      <Trash />
                    </p>
                    <p size={"sm"} className="text-right btn ml-1">
                      <Pencil />
                    </p>
                  </Col>
                ) : null}
              </Row>
              <CardBody className=" p-1">
                <CardText>{comment.comment}</CardText>
              </CardBody>
              <Button onClick={toggleOpen}> Reply</Button>
              <Collapse isOpen={isOpen}>
                <DisplayReplies
                  reply={comment.reply}
                  comment={comment}
                  token={props.token}
                  index={index}
                  currentUser={props.currentUser}
                />
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayComments;
