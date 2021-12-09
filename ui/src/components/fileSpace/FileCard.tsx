import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { gcpFile } from "./FileSpace";
import DownloadIcon from "@mui/icons-material/Download";
import "../styles/FileCard.css";

const FileCard = (props: gcpFile): JSX.Element => {
  console.log(props);

  return (
    <Col>
        <Card>
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{"stuff"}</Card.Text>
            <div className="FileCardButton">
              <Button href={props.link} size="sm" variant="outline-dark">
                <DownloadIcon></DownloadIcon>
              </Button>
            </div>
          </Card.Body>
          <div></div>
        </Card>
    </Col>
  );
};

export default FileCard;
