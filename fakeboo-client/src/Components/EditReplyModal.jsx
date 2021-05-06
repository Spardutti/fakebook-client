import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  FormGroup,
} from "reactstrap";

const EditCommentModal = (props) => {
  const [reply, setReply] = useState(
    props.post.comments[props.commentIndex].reply[props.replyIndex].reply
  );

  const replyHandler = (e) => {
    setReply(e.target.value);
  };

  //EDIT THE SELECTED REPLY
  const editReply = async () => {
    await fetch(
      "/posts/" +
        props.post._id +
        "https://glacial-wildwood-15974.herokuapp.com/comment/reply",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
        body: JSON.stringify({
          reply,
          commentIndex: props.commentIndex,
          replyIndex: props.replyIndex,
        }),
      }
    );
    const replyArr = props.post.comments[props.commentIndex].reply;
    replyArr[props.replyIndex].reply = reply;
    props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Edit Reply</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input onChange={replyHandler} name="reply" value={reply} />
          <Button
            onClick={() => {
              editReply();
            }}
            className="mt-2 bg-primary btn-block"
          >
            Edit
          </Button>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};

export default EditCommentModal;
