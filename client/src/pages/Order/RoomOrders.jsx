import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";

function Orders({ sessionUser }) {
  // const authContext = useContext(AuthContext);
  // const { user } = authContext;

  // const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      debugger;
      try {
        const ordersList = await axios.get(`http://localhost:8800/api/rooms`);
        if (ordersList.data) {
          const userOrder = {};
          ordersList.data.forEach((order) => {
            order.roomNumbers.forEach((no) => {
              if (userOrder[no.booked_by]) {
                userOrder[no.booked_by].push(order);
              } else {
                userOrder[no.booked_by] = [];
                userOrder[no.booked_by].push(order);
              }
            });
          });
          console.log(userOrder);
          setUserOrders(userOrder);
          // setOrders(ordersList.data);
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
      <h2 className="order-title">Room Orders</h2>
      {userOrders ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {userOrders[sessionUser.id]?.map((m) => {
            // Filter orders to include only the ones that match the user's _id
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
                    <Card.Title>{m.title}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      {m?.roomNumbers.map((room) => {
                        debugger
                        return room?.booked_by === sessionUser?.id ? (
                          <div>
                            {room?.unavailableDates.map((dates) => (
                              <div>{dates}</div>
                            ))}
                          </div>
                        ) : null;
                      })}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Price: </b>
                      Rs.{m.price}
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
