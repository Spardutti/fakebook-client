import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

//CURRENT USER POST DISPLAYED IN THE PROFILE
const CurrentUserPosts = (props) => {
  return props.posts.map((post, index) => {
    return (
      <Row key={post._id} className="mb-2">
        <Col className="text-center">
          <Card body className="bg-dark text-light">
            <CardTitle>{post.title}</CardTitle>
            <Button color="success">Go to post</Button>
          </Card>
        </Col>
      </Row>
    );
  });
};

export default CurrentUserPosts;