import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import "./order.css"

function Orders({sessionUser}) {
  // const authContext = useContext(AuthContext);
  // const { user } = authContext;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      debugger
      try {
        const ordersList = await axios.get(
          `http://localhost:8800/api/gettaxi-booking`
        );
        if (ordersList.data) {
          setOrders(ordersList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleDeleteOrder = async (bookingId) => {
    try {
      const response = await axios
        .delete(`http://localhost:8800/api/deletetaxi-booking/${bookingId}`)
        .then(() => window.location.reload());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders">
      <h2 className="order-title">Texi Orders</h2>
      {orders ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {orders.map((m) => {
            // Filter orders to include only the ones that match the user's _id
            if ((m.userId === sessionUser.id) || sessionUser.role === "admin") {
              return (
                <div
                  key={m._id}
                  style={{
                    flexBasis: "calc(30% - 2.4rem)",
                    margin: "2.4rem",
                  }}
                >
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{m.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <b>Car Model: </b>
                        {m.taxiName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked From </b>
                        {new Date(m.bookedFrom).toISOString().split("T")[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked Till </b>
                        {new Date(m.bookedTill).toISOString().split("T")[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked At </b>
                        {new Date(m.createdAt).toISOString().split("T")[0]}{" "}
                        <span>(</span>
                        {
                          new Date(m.createdAt)
                            .toISOString()
                            .split("T")[1]
                            .split(".")[0]
                        }
                        <span>)</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Price: </b>
                        Rs.{m.totalPrice}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteOrder(m._id)}
                      >
                        Delete Booking
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            } else {
              return null; // Skip rendering for orders that don't match the user
            }
          })}
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default Orders;
