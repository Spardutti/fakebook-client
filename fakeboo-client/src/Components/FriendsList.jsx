import { Card, Button, CardTitle } from "reactstrap";

const FriendsList = (props) => {
  //DISPLAY FRIEND LIST WITH DELETE FRIEND BUTTON
  const deleteFriend = async () => {
    const response = await fetch("/users/" + props.id + "/delete", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
          {props.friend.username}
        </CardTitle>
        <Button className="m-1 p-0 bg-danger" onClick={deleteFriend}>
          Delete
        </Button>
      </Card>
    </div>
  );
};

export default FriendsList;
