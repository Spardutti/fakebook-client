import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Input,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const CreateAccountModal = (props) => {
  const [success, setSuccess] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [errors, setErrors] = useState();

  //INPUT HANDLERS
  const usernameValue = (e) => {
    setUsername(e.target.value);
  };
  const emailValue = (e) => {
    setEmail(e.target.value);
  };
  const passwordValue = (e) => {
    setPassword(e.target.value);
  };
  const confirmValue = (e) => {
    setConfirm(e.target.value);
  };

  //CHECK FOR ERRORS AND DISPLAY THEM OR CREATE ACCOUNT IF
  //ALL IS VALID
  const createAccount = async () => {
    const response = await fetch("/users/new", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email,
        password,
        confirm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.errors) {
      setErrors(data.errors);
      //IF EMAIL OR USERNAME ARE IN USE
    } else if (typeof data === "string") {
      setErrors([{ msg: data }]);
    } else {
      setSuccess(true);
    }
  };

  //CLOSE MODAL AFTER ACCOUNT CREATION
  const closeModalAfterSucces = () => {
    if (success) {
      setTimeout(() => {
        props.toggle();
        setSuccess();
      }, 1000);
    }
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirm("");
    setErrors();
  };

  useEffect(() => {
    closeModalAfterSucces();
  }, [success]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Create Account</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              placeholder="Username"
              name="username"
              type="text"
              value={username}
              onChange={usernameValue}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              value={email}
              onChange={emailValue}
              name="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              value={password}
              onChange={passwordValue}
              type="password"
              placeholder="Password"
              name="password"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              value={confirm}
              onChange={confirmValue}
              type="password"
              placeholder="Confirm Password"
              name="confirm"
            ></Input>
          </FormGroup>
          {success ? (
            <ModalFooter>
              <p>Account Created Succesfully!</p>
            </ModalFooter>
          ) : (
            <Button
              color="success"
              className="btn-block"
              onClick={createAccount}
            >
              Create
            </Button>
          )}
        </ModalBody>
        {errors ? (
          <ModalFooter>
            {errors.map((e, index) => {
              return (
                <div key={index}>
                  <p>{e.msg}</p>
                </div>
              );
            })}
          </ModalFooter>
        ) : null}
      </Modal>
    </div>
  );
};

export default CreateAccountModal;
