import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

// Artificial delay helper (so loader is visible on refresh)
const lazyWithDelay = (factory) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(factory()), 800); // 800ms delay
  });

// Lazy loading components
const Home = lazy(() => lazyWithDelay(() => import("./src/components/Home.jsx")));
const About = lazy(() => lazyWithDelay(() => import("./src/components/About.jsx")));
const Contact = lazy(() => lazyWithDelay(() => import("./src/components/Contact.jsx")));

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center flex-column p-5">
    <Spinner animation="border" role="status" variant="primary" />
    <span className="mt-3 text-muted">Loading component...</span>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Exp 5.1: Lazy Loading
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1 className="text-center mb-4">React Lazy Loading Experiment</h1>

        {/* Suspense wrapper */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>

        <div className="mt-5 border-top pt-3 text-center text-muted small">
          <p>
            Check DevTools → Network tab to observe dynamic chunk loading.
          </p>
        </div>
      </Container>
    </Router>
  );
};

export default App;