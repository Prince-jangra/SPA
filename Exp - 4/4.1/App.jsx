import React from "react";
import { ThemeProvider, useTheme } from "./src/ThemeContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card } from "react-bootstrap";

const ThemeDisplay = () => {
  const { theme } = useTheme();
  return (
    <Card
      className={`text-center mt-3 shadow-sm ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      <Card.Body>
        <Card.Title>Current Theme: {theme.toUpperCase()}</Card.Title>
        <Card.Text>
          This component consumes the global theme state from the Context API
          using the <code>useContext</code> hook.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="text-center mt-4">
      <Button
        variant={theme === "light" ? "dark" : "light"}
        size="lg"
        onClick={toggleTheme}
        className="shadow"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Container
        className="mt-5 p-5 rounded-4 shadow-lg bg-white border border-info"
        style={{ maxWidth: "600px" }}
      >
        <header className="text-center mb-5 border-bottom pb-4">
          <h1 className="display-5 text-primary fw-bold">Experiment 4.1</h1>
          <p className="lead text-muted">
            Global State Management with Context API
          </p>
        </header>

        <section>
          <p className="text-secondary mb-4">
            React's <strong>Context API</strong> provides a way to share data
            through multiple components without manually passing props at every
            level (Prop Drilling).
          </p>
          <ThemeDisplay />
          <ThemeToggle />
        </section>

        <footer className="mt-5 pt-3 border-top text-center text-muted small">
          <p>
            This UI uses bootstrap and a global <code>ThemeContext</code>.
          </p>
        </footer>
      </Container>
    </ThemeProvider>
  );
};

export default App;
