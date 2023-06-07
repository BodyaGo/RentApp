import React, { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaBed, FaBath, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RentPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/aparts/${id}`);
        setApartment(response.data);
        fetchLandlord(response.data.email);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchApartment();
  }, [id]);

  const fetchLandlord = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/loginAparts', {
        email: email
      });
      setLandlord(response.data.aparts[0]);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const isDateReserved = (date) => {
    // Logic to check if the date is reserved
    // Replace this with your own implementation based on the apartment's reservations data
    return false;
  };

  const renderTileContent = ({ date }) => {
    if (isDateReserved(date)) {
      return <div className="reserved-day"></div>;
    } else {
      return <div className="available-day"></div>;
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <header className="text-center my-5">
          <h1>
            <FaHome className="me-2" />
            {apartment && apartment.name} ready for Rent
          </h1>
        </header>
        <Row>

          <Col md={8} lg={6} xl={4}>
            {apartment && (
              <Card className="shadow-sm mb-4">
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
                      <FaMoneyBillWave className="me-2" />
                      Price: {apartment.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaBed className="me-2" />
                      Beds: {apartment.beds}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaBath className="me-2" />
                      Baths: {apartment.baths}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaEnvelope className="me-2" />
                      Email: {apartment.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Contact the owner at {apartment.email} for further rental
                      information
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileContent={renderTileContent}
            />
          </Col>

          <Col>
            <Card>
                <h3>Owner Information</h3>
                {landlord && (
                  <>
                    <p>Name: {landlord.username}</p>
                    <p>Email: {apartment.email}</p>
                    <p>Phone Number: {landlord.phoneNumber}</p>
                    <p>Address: {apartment.address}</p>
                  </>
                )}
            </Card>
          </Col>

        </Row>
      </div>
    </Container>
    
  );
};

export default RentPage;
