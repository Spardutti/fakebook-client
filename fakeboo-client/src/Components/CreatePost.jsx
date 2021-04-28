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
import { useState } from "react";

const CreatePostModal = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHanlder = (e) => {
    setDescription(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // VALIDATE THE FIELDS AND CREATES A POST
  const createPost = async () => {
    const formData = new FormData();

    if (!description && !image) {
      alert("Please add a title, description and/or an image");
    }
    if (title && image && description) {
      formData.append("title", title);
      formData.append("image", image);
      formData.append("body", description);
    } else if (title && image) {
      formData.append("title", title);
      formData.append("image", image);
    } else if (title && description) {
      formData.append("title", title);
      formData.append("body", description);
    }

    const response = await fetch("/posts/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      body: formData,
    });

    const data = await response.json();
    if (!data.errors) {
      props.toggle();
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal isOpen={props.postModal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Create Post</ModalHeader>
        <ModalBody>
          <Form encType="multipart/from-data">
            <FormGroup>
              <Input
                onChange={titleHandler}
                placeholder="Post Title"
                type="text"
                name="title"
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={descriptionHanlder}
                type="textarea"
                placeholder="Post Description"
                name="description"
                value={description}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Upload Image</Label>
              <Input onChange={imageHandler} type="file" name="image" />
            </FormGroup>
            <Button onClick={createPost} className="bg-primary btn-block">
              Create
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
