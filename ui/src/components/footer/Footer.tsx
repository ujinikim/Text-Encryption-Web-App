import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <div className="Footer">
        <Card className="bg-light text-center text-lg-start">
          <Container className="Footer_container">
          </Container>
          <div className="text-center p-3">© 2021 Copyright File Share</div>
        </Card>
    </div>
  );
};

export default Footer;
