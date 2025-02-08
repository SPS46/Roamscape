import React from "react";

import { Col } from "reactstrap";

import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";
import GuideCard from "../../shared/GuideCard";

const FeaturedGuidesList = () => {
  const {
    data: featuredGuides,
    loading,
    error,
  } = useFetch(`${BASE_URL}/guides/search/getFeaturedGuides`);

  return (
    <>
      {loading && <h4>Loading ...........</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredGuides?.map((guide) => (
          <Col lg="2" md="4" sm="6" className="mb-4" key={guide._id}>
            <GuideCard guide={guide} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedGuidesList;
