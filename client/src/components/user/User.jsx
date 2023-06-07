import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style/User.css";
import Axios from "axios";

function User() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [image, setImage] = useState("");
  const [priceError, setPriceError] = useState("");
  const [bedsError, setBedsError] = useState("");
  const [bathsError, setBathsError] = useState("");
  const history = useNavigate();

  const [apartList, setApartList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    history("/login");
    window.location.reload();
  };

  //////////////////////////////// apartemnts registration ////////////////////////////////

  // const [error, setError] = useState(null);

  const createApart = () => {
    let valid = true;

    if (price === "") {
      setPriceError("Price is required");
      valid = false;
    } else {
      setPriceError("");
    }

    if (beds === "") {
      setBedsError("Beds is required");
      valid = false;
    } else {
      setBedsError("");
    }

    if (baths === "") {
      setBathsError("Baths is required");
      valid = false;
    } else {
      setBathsError("");
    }

    if (!valid) {
      return;
    }
    // send request to create new apartment
    Axios.post("http://localhost:3001/createApart", {
      name: name,
      address: address,
      description: description,
      price: price,
      beds: beds,
      baths: baths,
      image: image,
      email: userData.email,
      username: userData.username,
      phoneNumber: userData.phoneNumber,
    }).then(() => {
      setApartList([
        ...apartList,
        {
          name: name,
          address: address,
          description: description,
          price: price,
          beds: beds,
          baths: baths,
          image: image,
          email: userData.email,
          username: userData.username,
          phoneNumber: userData.phoneNumber,
        },
      ]);
    });
  };

  // const getAparts = () => {
  //   Axios.get("http://localhost:3001/aparts").then((response) => {
  //     setApartList(response.data);
  //   });
  // };

  const updateApartsPrice = (id) => {
    Axios.put("http://localhost:3001/updatePrice", {
      price: price,
      id: id,
    }).then((response) => {
      setApartList(
        apartList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                email: val.email,
                address: val.address,
                description: val.description,
                price: val.price,
                beds: val.beds,
                baths: val.baths,
              }
            : val;
        })
      );
    });
  };

  const deleteAparts = (id) => {
    Axios.delete(`http://localhost:3001/deleteAparts/${id}`).then(
      (response) => {
        setApartList(
          apartList.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  const loginUserAparts = async () => {
    Axios.get("http://localhost:3001/aparts").then((response) => {
      const userAparts = response.data.filter(
        (apart) => apart.email === userData.email
      );
      setApartList(userAparts);
    });
  };

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      const res = await Axios.get("http://localhost:3001/aparts");
      setApartments(res.data);
    };
    fetchApartments();
  }, []);

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
                          <FaUser className="form-icon" /> Phone Number:{" "}
                          {userData.phoneNumber}
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
                      <br></br>
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
      <div>
        {loading ? (
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="card p-4">
                  <p>Loading Rent data...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ////////////////////////////////////////////// Add Apartment Form ///////////////////////////////////////////////////////
          <div className="container py-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card p-4">
                <h2 className="mb-4">Add Apartment Form</h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />
                    {priceError && <p className="text-danger">{priceError}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Beds:</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setBeds(event.target.value);
                      }}
                    />
                    {bedsError && <p className="text-danger">{bedsError}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Baths:</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      onChange={(event) => {
                        setBaths(event.target.value);
                      }}
                    />
                    {bathsError && <p className="text-danger">{bathsError}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        setImage(event.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createApart}
                  >
                    Add Apartment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* //////////////////////////////////////////////////////////////// Show my Aparts ////////////////////////////////////////////////////////////////// */}
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
            {apartList &&
              apartList.map((val) => {
                return (
                  <div key={val.id} className="card mb-3 p-3">
                    <div>
                      <h4>Name: {val.name}</h4>
                      <p>Email: {val.email}</p>
                      <p>Address: {val.address}</p>
                      <p>Description: {val.description}</p>
                      <p>Price: {val.price}</p>
                      <p>Beds: {val.beds}</p>
                      <p>Baths: {val.baths}</p>
                      <Card.Img variant="top" src={val.image} alt={val.name} />
                    </div>

                    <div className="mt-3">
                      <input
                        type="price"
                        placeholder="new price..."
                        className="form-control"
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
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

