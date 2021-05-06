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
  const [comment, setComment] = useState(
    props.post.comments[props.commentIndex].comment
  );

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  //EDIT THE SELECTED COMMENT
  const editComment = async () => {
    await fetch(
      "https://glacial-wildwood-15974.herokuapp.com/posts/comment/" +
        props.post._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
        body: JSON.stringify({
          comment,
          index: props.commentIndex,
        }),
      }
    );
    const commentsArr = props.comments;
    commentsArr[props.commentIndex].comment = comment;
    props.setIsOpen(!props.isOpen);
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Edit Comment</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Input onChange={commentHandler} name="comment" value={comment} />
          <Button
            onClick={() => {
              editComment();
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
