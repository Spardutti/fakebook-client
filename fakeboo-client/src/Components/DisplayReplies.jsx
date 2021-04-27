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

const DisplayReplies = (props) => {
  const [reply, setReply] = useState();

  const replyHandler = (e) => {
    setReply(e.target.value);
  };

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
  return (
    <div>
      <InputGroup className="mt-2">
        <Input name="reply" onChange={replyHandler} />
        <InputGroupAddon addonType="append">
          <Button onClick={addReply}>add</Button>
        </InputGroupAddon>
      </InputGroup>
      {props.reply.map((reply) => {
        return (
          <div key={reply._id}>
            <Card className="mt-2 ml-5 text-dark text-left">
              <Row
                className=" p-1 d-flex align-items-center 
                  w-100 mx-auto"
              >
                <Col className="col-md-9 " sm="9" xs="8">
                  <h5>{reply.username} @2h</h5>
                </Col>
                {props.currentUser._id === reply.author ? (
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
                <CardText>{reply.reply}</CardText>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayReplies;
