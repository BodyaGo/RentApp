import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function LoginUser() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [apartList, setApartList] = useState([]);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    window.location.reload();
  };

  // const getAparts = () => {
  //   Axios.get("http://localhost:3001/aparts").then((response) => {
  //     setApartList(response.data);
  //   });
  // };

  const updateApartsPrice = (id) => {
    // Implement the logic to update apartment price
    // using Axios or any other method you prefer
    // Example:
    // Axios.put(`http://localhost:3001/aparts/${id}`, { price })
    //   .then((response) => {
    //     // Handle the successful update
    //   })
    //   .catch((error) => {
    //     // Handle the error
    //   });
  };

  const deleteAparts = (id) => {
    // Implement the logic to delete the apartment
    // using Axios or any other method you prefer
    // Example:
    // Axios.delete(`http://localhost:3001/aparts/${id}`)
    //   .then((response) => {
    //     // Handle the successful deletion
    //   })
    //   .catch((error) => {
    //     // Handle the error
    //   });
  };

  const loginUserAparts = () => {
    Axios.get("http://localhost:3001/aparts").then((response) => {
      const userAparts = response.data.filter(
        (apart) => apart.email === userData.email
      );
      setApartList(userAparts);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="profile-card">
            <Card.Header className="text-center">
              <h1 className="profile-title">Welcome {userData.username}</h1>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  {loading ? (
                    <p>Loading user data...</p>
                  ) : (
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className="form-label">
                          <FaEnvelope className="form-icon" /> Email:{" "}
                          {userData.email}
                        </Form.Label>
                      </Form.Group>
                      <Form.Group controlId="formBasicUsername">
                        <Form.Label className="form-label">
                          <FaUser className="form-icon" /> Username:{" "}
                          {userData.username}
                        </Form.Label>
                      </Form.Group>
                      <Form.Group controlId="formBasicAge">
                        <Form.Label className="form-label">
                          <FaBirthdayCake className="form-icon" /> Age:{" "}
                          {userData.age}
                        </Form.Label>
                      </Form.Group>
                      <br />
                      <Button variant="primary" onClick={handleLogOut}>
                        Log Out
                      </Button>
                    </Form>
                  )}
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <Card.Img
                    src="https://doodleipsum.com/700/avatar?i=29d0717893ed6e5e964b32f888f29cc1"
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Show my Aparts */}
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4">
            <h2 className="mb-4">Aparts List</h2>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={loginUserAparts}
            >
              Show my Aparts
            </button>
            {apartList.map((val) => (
              <div key={val.id} className="card mb-3 p-3">
                <div>
                  <h4>Name: {val.name}</h4>
                  <p>Email: {val.email}</p>
                  <p>Address: {val.address}</p>
                  <p>Description: {val.description}</p>
                  <p>Price: {val.price}</p>
                  <p>Beds: {val.beds}</p>
                  <p>Baths: {val.baths}</p>
                  <p>Image: {val.image}</p>
                </div>

                <div className="mt-3">
                  <input
                    type="price"
                    placeholder="new price..."
                    className="form-control"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => {
                      updateApartsPrice(val.id);
                    }}
                  >
                    Update Price
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      deleteAparts(val.id);
                    }}
                  >
                    Delete Apartment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;