import React from "react";
import { Card, ListGroup, Button, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ListCard = (props) => {
  return (
    <div className="container-fluid">
      <div className="container">
        <Card style={{ width: "20rem" }}>
          <Card.Header>To Do:</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>{props.content}</Accordion.Header>
                  <Accordion.Body>{props.description}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button variant="danger" onClick={props.onClickDelete}>
                Delete
              </Button>
              <Button variant="light" onClick={props.onClickEdit}>
                Edit
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default ListCard;
