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
} from "reactstrap";
import { useState } from "react";

const DisplayComments = (props) => {
  const [comment, setComment] = useState();

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
      {props.post.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <Card className="mt-2 text-dark text-left">
              <Row
                className=" p-1 d-flex align-items-center 
                rounded  w-100 mx-auto"
              >
                <Col md={2}>
                  <img
                    className="comment-avatar"
                    src={comment.profilePic}
                    alt="avatar"
                  />
                </Col>
                <Col className="col-md-6 m-0">
                  <h5>{comment.username} @2h</h5>
                </Col>
                {props.currentUser._id === comment.author ? (
                  <Col md={4} xs={1} className="d-flex justify-content-end">
                    <Button size={"sm"} className="text-right btn-danger ">
                      del
                    </Button>
                    <Button size={"sm"} className="text-right btn-warning ml-1">
                      edit
                    </Button>
                  </Col>
                ) : null}
              </Row>
              <CardBody className=" p-1">
                <CardText>{comment.comment}</CardText>
              </CardBody>
              <Button> Reply</Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayComments;
