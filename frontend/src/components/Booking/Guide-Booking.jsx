import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const GuideBooking = ({ guide, avgRating }) => {
  const { price, reviews, name } = guide;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id || "",
    userEmail: user?.email || "",
    guideId: guide?._id || "",
    guideName: name,
    fullName: "",
    phone: "",
    languages: guide?.languages || [],
    guestSize: 1,
    bookingDate: "",
    price: price,
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return navigate(`/login`);
    }

    try {
      const res = await fetch(`${BASE_URL}/guide-booking/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/guide-thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per day</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating || "No rating"} ({reviews?.length || 0})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Guide Booking Information</h5>
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
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookingDate"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Number of Guests"
              id="guestSize"
              min="1"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Booking Summary */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5>
              ${price} <i className="ri-close-line"></i> {booking.guestSize}{" "}
              guest(s)
            </h5>
            <span>${Number(price) * Number(booking.guestSize)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary_btn w-100 mt-4" onClick={handleClick}>
          Book Guide
        </Button>
      </div>
    </div>
  );
};

export default GuideBooking;
