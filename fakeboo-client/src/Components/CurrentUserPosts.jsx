import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

//CURRENT USER POST DISPLAYED IN THE PROFILE
const CurrentUserPosts = (props) => {
  const goToDiv = (postId) => {
    const element = document.getElementById(postId);
    element.scrollIntoView();
  };
  return props.posts.map((post, index) => {
    return (
      <Row key={post._id} className="mb-2">
        <Col className="text-center">
          <Card body className="bg-dark text-light">
            <CardTitle>{post.title}</CardTitle>
            <Button
              onClick={() => {
                goToDiv(post._id);
                props.toggle();
              }}
              color="success"
            >
              Go to post
            </Button>
          </Card>
        </Col>
      </Row>
    );
  });
};

export default CurrentUserPosts;
