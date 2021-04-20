import { Card, Button, CardTitle } from "reactstrap";

const DropdownRequests = (props) => {
  const acceptFriendRequest = async () => {
    const response = await fetch(`/users/${props.id}/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: props.index,
      }),
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const rejectFriendRequest = async () => {
    const response = await fetch(`/users/${props.id}/reject`);
  };
  return (
    <div>
      <Card body inverse className="bg-info p-0 m-1">
        <CardTitle tag="h5" className=" p-0 m-0 text-dark text-center">
          {props.user.username}
        </CardTitle>
        <Button onClick={acceptFriendRequest} className="m-1 p-0 bg-success">
          Accept
        </Button>
        <Button onClick={rejectFriendRequest} className="m-1 p-0 bg-danger">
          Decline
        </Button>
      </Card>
    </div>
  );
};

export default DropdownRequests;
