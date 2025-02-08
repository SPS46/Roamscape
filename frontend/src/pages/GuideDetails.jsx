import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/guide-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import GuideBooking from "../components/Booking/Guide-Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";

import { AuthContext } from "./../context/AuthContext";

const GuideDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [guideRating, setGuideRating] = useState(null);
  const { user } = useContext(AuthContext);

  //Fetch Data from database
  const { data: guide, loading, error } = useFetch(`${BASE_URL}/guides/${id}`);

  //Destructure properties from guide object
  const {
    photo,
    name,
    bio,
    phone,
    email,
    reviews,
    experience,
    languages,
    tours,
    price,
  } = guide;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //Format Date
  const options = { day: "numeric", month: "long", year: "numeric" };

  //Submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: guideRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guide]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading .......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="guide__content">
                  <img src={photo} alt="" />

                  <div className="guide__info">
                    <h2>{name}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="guide_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {email}
                      </span>
                    </div>

                    <div className="guide__extra-details">
                      <span>
                        <i className="ri-phone-line"></i>
                        {phone}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>${price}
                        /per day
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{bio}</p>
                  </div>

                  {/*============guide Reviews Section===============*/}
                  <div className="guide__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setGuideRating(1)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setGuideRating(2)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setGuideRating(3)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setGuideRating(4)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setGuideRating(5)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary_btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div
                              className="d-flex align-items-center
                                justify-content-between"
                            >
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*============Guide Reviews Section End===============*/}
                </div>
              </Col>

              <Col lg="4">
                <GuideBooking guide={guide} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default GuideDetails;
