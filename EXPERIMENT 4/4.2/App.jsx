import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "./src/features/counter/counterSlice";
import { Container, Button, Card, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Container
      className="mt-5 p-5 bg-white border border-danger rounded-4 shadow-lg text-center"
      style={{ maxWidth: "500px" }}
    >
      <header className="mb-4">
        <h1 className="display-6 text-danger fw-bold">Experiment 4.2</h1>
        <p className="lead text-muted">Redux Toolkit Counter Application</p>
      </header>

      <Card className="shadow-sm border-0 bg-light">
        <Card.Body className="p-4">
          <Card.Subtitle className="mb-4 text-uppercase text-secondary ls-1">
            Application State
          </Card.Subtitle>
          <div className="display-1 fw-bold text-dark mb-4">{count}</div>

          <ButtonGroup className="gap-2">
            <Button
              variant="outline-danger"
              size="lg"
              onClick={() => dispatch(decrement())}
              className="px-4"
            >
              Decrement
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={() => dispatch(increment())}
              className="px-4"
            >
              Increment
            </Button>
          </ButtonGroup>

          <div className="mt-4">
            <Button
              variant="link"
              className="text-muted"
              onClick={() => dispatch(reset())}
            >
              Reset Counter
            </Button>
          </div>
        </Card.Body>
      </Card>

      <footer className="mt-5 pt-3 border-top text-muted small">
        <p>
          This app uses <strong>Redux Toolkit</strong> for state management.
        </p>
      </footer>
    </Container>
  );
};

export default App;
