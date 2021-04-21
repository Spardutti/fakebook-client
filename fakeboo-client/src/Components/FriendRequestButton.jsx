import { useState } from "react";
import { Button } from "reactstrap";
import "./styles.css";

const FriendRequestButton = (props) => {
  const [requestSent, setRequestSent] = useState(props.friendRequestSent);

  //SEND FRIEND REQUEST
  const friendRequest = async (id) => {
    await fetch("/users/" + props.id + "/request", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
  };
  //TO UDPATE THE REQUEST BUTTON WITHOUT RELOADING PAGE
  const sendRequest = () => {
    setRequestSent(!requestSent);
  };

  return requestSent ? (
    <Button
      className="btn-sm p-0 bg-success"
      style={{ fontSize: "13px" }}
      disabled
    >
      Request Sent
    </Button>
  ) : (
    <Button
      className="btn-sm p-0 bg-info"
      onClick={() => {
        sendRequest();
        friendRequest();
      }}
    >
      Add Friend
    </Button>
  );
};

export default FriendRequestButton;
