import { Card, Button, CardTitle } from "reactstrap";

const DropdownRequests = (props) => {
  //ACCEPT FRIEND REQUEST
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
  // DELETE FRIEND REQUEST
  const rejectFriendRequest = async () => {
    const response = await fetch(`/users/${props.id}/reject`, {
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
  return (
    <div>
      <Card body inverse className="bg-info p-0 m-1">
        <CardTitle tag="h5" className=" p-0 m-0 text-dark text-center">
          {props.user.username}
        </CardTitle>
        <Button onClick={acceptFriendRequest} className="m-1 p-0 bg-success">
          <i class="fas fa-user-plus"></i>
        </Button>
        <Button onClick={rejectFriendRequest} className="m-1 p-0 bg-danger">
          <i class="fas fa-user-minus"></i>
        </Button>
      </Card>
    </div>
  );
};

export default DropdownRequests;
