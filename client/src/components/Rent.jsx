import { Row, Col, Card, ListGroup, Button, Container } from "react-bootstrap";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import axios from "axios";

import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Rent() {
  const [apartments, setApartments] = useState([]);
  //   const [visibleApartments, setVisibleApartments] = useState(6);

  useEffect(() => {
    const fetchApartments = async () => {
      const res = await axios.get("http://localhost:3001/aparts");
      setApartments(res.data);
    };
    fetchApartments();
  }, []);

  //   const showMoreApartments = () => {
  //     setVisibleApartments(visibleApartments + 6);
  //   };

  return (
    <div className="container">
      <Container className="my-5">
        <h1 className="text-center mb-5">
          <FaHome className="me-2" />
          Available Apartments for Rent
        </h1>
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
                      <ListGroup.Item>Ціна: {apartment.price}</ListGroup.Item>
                      <ListGroup.Item>Кімнати: {apartment.beds}</ListGroup.Item>
                      <ListGroup.Item>
                        Ванні кімнати: {apartment.baths}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">  Rent this Apartment </Button>
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

export default Rent;
