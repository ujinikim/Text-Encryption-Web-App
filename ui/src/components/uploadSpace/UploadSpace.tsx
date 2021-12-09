import React from "react";
import "../styles/UploadSpace.css";
import NewFile from "./NewFile";

const UploadSpace = () => {
  return (
    <div className="UploadSpace">
      <NewFile />
      <div className="UploadSpace_container">
        <hr />
      </div>
    </div>
  ); 
}

export default UploadSpace;
