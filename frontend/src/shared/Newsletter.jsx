import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import footballer from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe now to stay updated.</h2>

              <div className="newsletter_input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter_btn">Subscribe</button>
              </div>

              <p>Stay Ahead of the Game: Subscribe to Our Newsletter</p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter_img">
              <img src={footballer} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
