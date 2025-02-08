import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import "./tour-card.css";

const GuideCard = ({ guide }) => {
  const { _id, name, age, photo, price, reviews } = guide;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour_card mt-4">
      <Card>
        <div className="tour_img">
          <img src={photo} alt="guide-img" className="guide" />
        </div>

        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-items-center gap-1">
              {age}
            </span>
            <span className="tour_rating d-flex align-items-center gap-1">
              <i className="ri-star-s-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not Rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour_title">
            <Link to={`/guides/${_id}`}>{name}</Link>
          </h5>

          <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per hour</span>
            </h5>
            <button className="btn booking_btn">
              <Link to={`/guides/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuideCard;
