import React, { useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import Newsletter from "../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import Subtitle from "./../shared/Subtitle";

import FeaturedGuidesList from "../components/Featured-guides/FeaturedGuideList";
import RentalBooking from "../components/Booking/Rental-Booking";

const RentalDetails = () => {
  const { id } = useParams();

  //Fetch Data from database
  const { data: rental, loading, error } = useFetch(`${BASE_URL}/rental/${id}`);

  //Destructure properties from rental object
  const {
    photo,
    name,
    description,
    pricePerDay,
    category,
    reviews,
    location,
    transmission,
  } = rental;

  const { avgRating } = calculateAvgRating(reviews);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rental]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading .......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{name}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {category}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {location}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>$
                        {pricePerDay}
                        /per day
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {transmission}
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{description}</p>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <RentalBooking rental={rental} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <section className="px-5">
        <Row>
          <Col md="12">
            <Subtitle subtitle={"Explore"} />
            <h2 className="featured_tour-title">Our featured guides</h2>
          </Col>
          <FeaturedGuidesList />
        </Row>
      </section>
      <Newsletter />
    </>
  );
};

export default RentalDetails;
