import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import "./rental-card.css";

const RentalCard = ({ rental }) => {
  const { _id, name, age, photo, pricePerDay, reviews } = rental;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="rental_card mt-4">
      <Card>
        <div className="rental_img">
          <img src={photo} alt="rental-img" className="rental" />
        </div>

        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="rental_location d-flex align-items-center gap-1">
              {age}
            </span>
            <span className="rental_rating d-flex align-items-center gap-1">
              <i className="ri-star-s-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not Rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="rental_title">
            <Link to={`/rental/${_id}`}>{name}</Link>
          </h5>

          <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${pricePerDay} <span>/per hour</span>
            </h5>
            <button className="btn booking_btn">
              <Link to={`/rental/${_id}`}>Rent Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RentalCard;
