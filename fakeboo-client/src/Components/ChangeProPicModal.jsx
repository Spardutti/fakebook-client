import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  FormGroup,
  Form,
} from "reactstrap";

const ChangeProPicModal = (props) => {
  const [profilePic, setProfilePic] = useState();

  //GET THE PIC PATH WITH MULTER
  const picHandler = (e) => {
    setProfilePic(e.target.files[0]);
  };

  //USE FORMdaTA TO UPLOAD FILES
  const changePic = async () => {
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    const response = await fetch("/users/" + props.id + "/profile", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>
          Change Profile Image
        </ModalHeader>
        <ModalBody>
          <Form encType="multipart/form-data">
            <FormGroup>
              <Input onChange={picHandler} type="file" name="profilePic" />
            </FormGroup>
            <FormGroup>
              <Button
                onClick={() => {
                  changePic();
                  props.toggleModal();
                }}
                className="bg-primary btn-block"
              >
                Change
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangeProPicModal;
