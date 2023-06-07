import { Row, Col, Card, ListGroup, Button, Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [userData, setUserData] = useState({});
  const [apartments, setApartments] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [bedsFilter, setBedsFilter] = useState("");
  const [bathsFilter, setBathsFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const fetchApartments = async () => {
    const res = await axios.get("http://localhost:3001/apartsFilter", {
      params: {
        price: priceFilter,
        beds: bedsFilter,
        baths: bathsFilter,
        search: searchQuery,
      },
    });
    setApartments(res.data);
  };

  useEffect(() => {
    fetchApartments();
  }, [priceFilter, bedsFilter, bathsFilter, searchQuery]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-4">
        {Object.keys(userData).length ? (
          <Card className="card">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{`Welcome, ${userData.username}!`}</Card.Title>
                <Card.Text className="mb-2 text-muted">
                  Happy to see you
                </Card.Text>
                <Button variant="primary" onClick={handleLogOut}>
                  Log Out
                </Button>
              </Card.Body>
            </Card>
          </Card>
        ) : (
          <div className="registration-box text-center">
            <h2>Register for our rent app</h2>
            <Link to="/login" className="btn btn-outline-primary mx-2">
              Login
            </Link>
            <Link to="/registration" className="btn btn-outline-primary mx-2">
              Registration
            </Link>
          </div>
        )}
      </div>

      <Container className="my-5">
        <h1 className="text-center mb-5">
          <FaHome className="me-2" />
          Available Apartments for Rent
        </h1>
        <div className="filter-container">
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="priceFilter">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="text"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="bedsFilter">
                  <Form.Label>Beds:</Form.Label>
                  <Form.Control
                    type="text"
                    value={bedsFilter}
                    onChange={(e) => setBedsFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="bathsFilter">
                  <Form.Label>Baths:</Form.Label>
                  <Form.Control
                    type="text"
                    value={bathsFilter}
                    onChange={(e) => setBathsFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="searchQuery">
                  <Form.Label>Search:</Form.Label>
                  <Form.Control
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" onClick={fetchApartments}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Row xs={1} md={2} className="g-4">
          {apartments.map((apartment) => (
            <Col key={apartment.id}>
              <Card className="shadow-sm">
                <Link to={`./RentPage/${apartment.id}`}>
                  <Card.Img
                    variant="top"
                    src={apartment.image}
                    alt={apartment.name}
                  />
                  <Card.Body>
                    <Card.Title>{apartment.name}</Card.Title>
                    <Card.Text>{apartment.description}</Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Price: {apartment.price}
                      </ListGroup.Item>
                      <ListGroup.Item>Beds: {apartment.beds}</ListGroup.Item>
                      <ListGroup.Item>
                        Baths: {apartment.baths}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">Rent this Apartment</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
