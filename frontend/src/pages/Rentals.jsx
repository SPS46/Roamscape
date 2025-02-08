import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";
import Newsletter from "./../shared/Newsletter";
import { Row, Container, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import RentalCard from "../shared/RentalCard";

const Rentals = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: rentals,
    loading,
    error,
  } = useFetch(`${BASE_URL}/rental?page=${page}`);
  const { data: rentalCount } = useFetch(
    `${BASE_URL}/rental/search/getRentalCount`
  );

  useEffect(() => {
    const pages = Math.ceil(rentalCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, rentalCount, rentals]);

  return (
    <>
      <CommonSection title={"All Rentals"} />
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading .....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {rentals?.map((rental) => (
                <Col lg="3" md="6" sm="6" key={rental._id}>
                  {" "}
                  <RentalCard rental={rental} />
                </Col>
              ))}

              <Col lg="12">
                <div
                  className="pagination d-flex align-items-center
                    justify-content-center mt-4 gap-3"
                >
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Rentals;
