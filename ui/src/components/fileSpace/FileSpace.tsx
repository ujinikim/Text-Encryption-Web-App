import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FileCard from "./FileCard";
import "../styles/FileSpace.css";
import firebase from "../../config/firebase-config";
import { Filter2Sharp, RefreshRounded } from "@mui/icons-material";
import { isTemplateSpan } from "typescript";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface gcpFile {
  name: string;
  link: string;
}

export type File = {
  fileName: string;
};

export interface Files {
  File: Files;
}

const FileSpace = () => {
  const [uid, setUID] = useState("Not Signed In");
  const [files, setFiles] = useState<gcpFile[]>([]);
  const [loading, setLoading] = useState(false);

  const [statusLoggedIn, setStatusLoggedIn] = useState(false);
  const handleStatusLoggedIn = () => setStatusLoggedIn(true);
  const handleStatusLoggedOut = () => setStatusLoggedIn(false);

  const signInOut = () => {
    if (statusLoggedIn === false) {
      return (<></>);
    } else {
      return (
        <>
          <Row xs={1} md={4} className="g-2">
            {files.map((file) => (
              <FileCard name={file.name} link={file.link} />
            ))}
          </Row>
        </>
      );
    }
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      setUID(uid);
      handleStatusLoggedIn();

    } else {
      // User is signed out
      setUID("Not Signed In");
      handleStatusLoggedOut();
    }
  });

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const checkFiles = async () => {
    setLoading(true);
    const ref = storageRef.child(uid);
    // console.log(ref);
    ref
      .listAll()
      .then((res) => {
        const newArr: gcpFile[] = [];
        res.items.forEach(async (itemRef) => {
          newArr.push({
            name: itemRef.name,
            link: await itemRef.getDownloadURL(),
          });
        });
        return newArr;
      })
      .then(async (res) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFiles(res);
        console.log(files);
        setLoading(false);
      });
  };

  return (
    <div className="FileSpace">
      <Button
        onClick={async () => {
          await checkFiles();
        }}
      >
        <RefreshRounded></RefreshRounded>Refresh
      </Button>
      <p>Signed in as: {uid}</p>
      <p>{loading ? "loading" : ""}</p>
      {signInOut()}
    </div>
  );
};

export default FileSpace;

// tsrcc
