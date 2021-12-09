import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import SideBar from "./components/uploadSpace/UploadSpace";
import FileSpace from "./components/fileSpace/FileSpace"
import Footer from "./components/footer/Footer"

const App = () => {

  return (

    <div className="App">
      {/* header */}
      {/* Add Google login as an authentication? */}
      <Header />
      <SideBar />
      <FileSpace />
      {/* Authentication needed */}
      {/* Encryption Algorithm when a file is uploaded*/}
      <Footer />
    </div>
  );
}

export default App;
