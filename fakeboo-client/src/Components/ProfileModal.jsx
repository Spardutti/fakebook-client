import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  FormGroup,
  Form,
  Label,
} from "reactstrap";
import CurrentUserPosts from "./CurrentUserPosts";

const ProfileModal = (props) => {
  const [profilePic, setProfilePic] = useState();
  const [posts, setPosts] = useState();

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

  //GET CURRENT USER POSTS
  const getPosts = async () => {
    const response = await fetch("/posts/" + props.id + "/posts");
    const data = await response.json();
    if (data.length > 0) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.username}</ModalHeader>
        <ModalBody>
          <img
            src={props.user.profilePic}
            alt=""
            className="mx bg-dark rounded-circle"
          />
          <Form encType="multipart/form-data">
            <FormGroup className="text-center">
              <Label for="profilePic">Change Avatar</Label>
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
          {posts ? (
            <CurrentUserPosts posts={posts} toggle={props.toggleModal} />
          ) : (
            <p className="text-center"> No post created yet</p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfileModal;
