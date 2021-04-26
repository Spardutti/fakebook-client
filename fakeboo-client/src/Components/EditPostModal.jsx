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

const EditPost = (props) => {
  const [title, setTitle] = useState(props.post.title);
  const [description, setDescription] = useState(props.post.body);
  const [image, setImage] = useState(props.post.image);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHanlder = (e) => {
    setDescription(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const updatePost = async () => {
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

    const response = await fetch("/posts/" + props.post._id + "/edit", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      body: formData,
    });

    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal isOpen={props.editModal} toggle={props.toggleEdit}>
        <ModalHeader tag="h1" toggle={props.toggleEdit}>
          Edit Post
        </ModalHeader>
        <ModalBody>
          <Form encType="multipart/from-data">
            <FormGroup>
              <Input
                onChange={titleHandler}
                placeholder="Post Title"
                type="text"
                name="title"
                value={title}
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={descriptionHanlder}
                type="textarea"
                placeholder="Post Description"
                name="description"
                value={description}
                style={{ height: "150px" }}
              />
            </FormGroup>
            <FormGroup className="text-center d-flex justify-content-center  flex-column">
              {props.post.image ? (
                <div>
                  <img
                    src={props.post.image}
                    alt="post"
                    className="h-25 w-25"
                  />
                  <Label for="image">Upload Image</Label>
                  <Input onChange={imageHandler} type="file" name="image" />
                </div>
              ) : null}
            </FormGroup>
            <Button onClick={updatePost} className="bg-primary btn-block">
              Update Post
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditPost;
