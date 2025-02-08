import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const RentalBooking = ({ rental, avgRating }) => {
  const { pricePerDay, reviews, name } = rental;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id || "",
    userEmail: user?.email || "",
    rentalId: rental?._id || "",
    rentalName: name,
    fullName: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    startDate: "",
    endDate: "",
    totalPrice: 0,
  });

  const calculateTotalPrice = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.max(1, (endDate - startDate) / (1000 * 60 * 60 * 24));
    return Number(pricePerDay) * duration + 20; // 20 is the service fee
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => {
      const updatedBooking = { ...prev, [id]: value };

      if (id === "startDate" || id === "endDate") {
        updatedBooking.totalPrice = calculateTotalPrice(
          updatedBooking.startDate,
          updatedBooking.endDate
        );
      }
      return updatedBooking;
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return navigate(`/login`);
    }

    try {
      const res = await fetch(`${BASE_URL}/rental-booking/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/rental-thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${pricePerDay} <span>/per day</span>
        </h3>
        <span className="rental_rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating || "No rating"} ({reviews?.length || 0})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Rental Booking Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Pickup Location"
              id="pickupLocation"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Drop-off Location"
              id="dropoffLocation"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="startDate"
              required
              onChange={handleChange}
            />
            <input type="date" id="endDate" required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>

      {/* Booking Summary */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5>Rental Cost</h5>
            <span>${booking.totalPrice - 20}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>$20</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span>${booking.totalPrice}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary_btn w-100 mt-4" onClick={handleClick}>
          Book Rental
        </Button>
      </div>
    </div>
  );
};

export default RentalBooking;
